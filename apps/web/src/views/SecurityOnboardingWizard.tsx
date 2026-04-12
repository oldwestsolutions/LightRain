"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { resolveMarketingBackHref } from "../lib/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { generateMnemonic } from "bip39";
import { Loader2, Lock, Mail, Shield, Smartphone, KeyRound, Fingerprint, FileKey, Download } from "lucide-react";
import { Secret, TOTP } from "otpauth";
import { useAuthStore } from "../store/useAuthStore";
import { LoginFooter } from "../components/LoginFooter";
import { RainBackground } from "../components/RainBackground";
import { InfoTooltip } from "../components/onboarding/InfoTooltip";
import { analyzePassword, passwordMeetsPolicy } from "../lib/onboarding/passwordPolicy";
import { registerCredential, credentialSummary } from "../lib/onboarding/webauthn";
import { computeDeviceFingerprintHex } from "../lib/onboarding/deviceFingerprint";
import { generateBackupCodes } from "../lib/onboarding/backupCodes";
import { encryptRecoveryPayload, downloadUint8Array } from "../lib/onboarding/recoveryFile";

const STEPS = [
  "Login email",
  "Master password",
  "Two-factor authentication",
  "Trusted device",
  "Recovery method",
  "Review & create",
] as const;

export function SecurityOnboardingWizard() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [homeHref, setHomeHref] = useState("/");

  useEffect(() => {
    setHomeHref(resolveMarketingBackHref("/"));
  }, []);

  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryEmailTouched, setRecoveryEmailTouched] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [wantTotp, setWantTotp] = useState(false);
  const [wantSecurityKey, setWantSecurityKey] = useState(false);
  const [wantPasskey, setWantPasskey] = useState(false);
  const [totpSecret, setTotpSecret] = useState<Secret | null>(null);
  const [totpUri, setTotpUri] = useState("");
  const [totpCodeInput, setTotpCodeInput] = useState("");
  const [totpVerified, setTotpVerified] = useState(false);
  const [securityKeyCred, setSecurityKeyCred] = useState<PublicKeyCredential | null>(null);
  const [passkeyCred, setPasskeyCred] = useState<PublicKeyCredential | null>(null);

  const [deviceName, setDeviceName] = useState("");
  const [deviceFingerprint, setDeviceFingerprint] = useState("");
  const [deviceBoundCred, setDeviceBoundCred] = useState<PublicKeyCredential | null>(null);

  const [wantBackup, setWantBackup] = useState(false);
  const [wantPassphrase, setWantPassphrase] = useState(false);
  const [wantHwRecovery, setWantHwRecovery] = useState(false);
  const [wantEncryptedFile, setWantEncryptedFile] = useState(false);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [backupConfirmIdx, setBackupConfirmIdx] = useState(0);
  const [backupConfirmInput, setBackupConfirmInput] = useState("");
  const [backupSaved, setBackupSaved] = useState(false);
  const [passphraseWords, setPassphraseWords] = useState<string[]>([]);
  const [passphraseConfirmIdx, setPassphraseConfirmIdx] = useState(0);
  const [passphraseConfirmInput, setPassphraseConfirmInput] = useState("");
  const [passphraseSaved, setPassphraseSaved] = useState(false);
  const [recoveryKeyCred, setRecoveryKeyCred] = useState<PublicKeyCredential | null>(null);
  const [encryptedFileDone, setEncryptedFileDone] = useState(false);

  const [lockoutAck, setLockoutAck] = useState(false);

  const pwdAnalysis = useMemo(() => analyzePassword(password), [password]);
  const passwordOk = passwordMeetsPolicy(pwdAnalysis);
  const passwordsMatch = password.length > 0 && password === passwordConfirm;

  useEffect(() => {
    void computeDeviceFingerprintHex().then(setDeviceFingerprint);
  }, []);

  useEffect(() => {
    if (password.length === 0) setPasswordConfirm("");
  }, [password]);

  const initTotp = useCallback(() => {
    const secret = new Secret({ size: 20 });
    const totp = new TOTP({
      issuer: "LightRain",
      label: "Private server",
      secret,
      algorithm: "SHA1",
      digits: 6,
      period: 30,
    });
    setTotpSecret(secret);
    setTotpUri(totp.toString());
    setTotpVerified(false);
    setTotpCodeInput("");
  }, []);

  useEffect(() => {
    if (wantTotp && !totpSecret) initTotp();
  }, [wantTotp, totpSecret, initTotp]);

  const verifyTotp = () => {
    if (!totpSecret) return;
    const ok =
      TOTP.validate({
        token: totpCodeInput.replace(/\s/g, ""),
        secret: totpSecret,
        window: 1,
      }) !== null;
    setTotpVerified(ok);
  };

  const emailValid = useMemo(() => {
    const t = recoveryEmail.trim();
    if (!t) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
  }, [recoveryEmail]);

  const twoFAComplete =
    (!wantTotp || totpVerified) &&
    (!wantSecurityKey || securityKeyCred !== null) &&
    (!wantPasskey || passkeyCred !== null);

  const atLeastOne2FA = wantTotp || wantSecurityKey || wantPasskey;

  const recoveryComplete = useCallback(() => {
    let ok = true;
    if (wantBackup) ok = ok && backupSaved && backupConfirmInput.trim().toUpperCase() === backupCodes[backupConfirmIdx];
    if (wantPassphrase) {
      const w = passphraseWords[passphraseConfirmIdx]?.toLowerCase() ?? "";
      ok = ok && passphraseSaved && passphraseConfirmInput.trim().toLowerCase() === w;
    }
    if (wantHwRecovery) ok = ok && recoveryKeyCred !== null;
    if (wantEncryptedFile) ok = ok && encryptedFileDone;
    return ok;
  }, [
    wantBackup,
    backupSaved,
    backupConfirmInput,
    backupCodes,
    backupConfirmIdx,
    wantPassphrase,
    passphraseSaved,
    passphraseConfirmInput,
    passphraseWords,
    passphraseConfirmIdx,
    wantHwRecovery,
    recoveryKeyCred,
    wantEncryptedFile,
    encryptedFileDone,
  ]);

  const atLeastOneRecovery = wantBackup || wantPassphrase || wantHwRecovery || wantEncryptedFile;

  const generateBackup = () => {
    const codes = generateBackupCodes(10);
    setBackupCodes(codes);
    setBackupConfirmIdx(Math.floor(Math.random() * codes.length));
    setBackupSaved(false);
    setBackupConfirmInput("");
  };

  const generatePassphrase = () => {
    const phrase = generateMnemonic(128);
    const words = phrase.split(" ");
    setPassphraseWords(words);
    setPassphraseConfirmIdx(Math.floor(Math.random() * words.length));
    setPassphraseSaved(false);
    setPassphraseConfirmInput("");
  };

  useEffect(() => {
    if (wantBackup && backupCodes.length === 0) generateBackup();
  }, [wantBackup, backupCodes.length]);

  useEffect(() => {
    if (wantPassphrase && passphraseWords.length === 0) generatePassphrase();
  }, [wantPassphrase, passphraseWords.length]);

  const downloadEncryptedRecovery = async () => {
    if (!password) return;
    const payload = {
      v: 1,
      created: new Date().toISOString(),
      recoveryEmail: recoveryEmail.trim(),
      twoFactor: {
        totp: wantTotp && totpVerified,
        securityKey: !!securityKeyCred,
        passkey: !!passkeyCred,
      },
      device: { name: deviceName.trim(), fingerprint: deviceFingerprint },
      backupCodes: wantBackup ? backupCodes : undefined,
      passphrase: wantPassphrase ? passphraseWords.join(" ") : undefined,
    };
    const { blob, filename } = await encryptRecoveryPayload(payload, password);
    downloadUint8Array(blob, filename);
    setEncryptedFileDone(true);
  };

  const canContinue = () => {
    switch (step) {
      case 0:
        return emailValid;
      case 1:
        return passwordOk && passwordsMatch;
      case 2:
        return atLeastOne2FA && twoFAComplete;
      case 3:
        return deviceName.trim().length >= 2 && deviceBoundCred !== null;
      case 4:
        return atLeastOneRecovery && recoveryComplete();
      case 5:
        return lockoutAck;
      default:
        return false;
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      await login(recoveryEmail.trim(), password);
      router.push("/wallet");
    } finally {
      setLoading(false);
    }
  };

  const entropyColor =
    pwdAnalysis.entropyScore < 34 ? "bg-red-500" : pwdAnalysis.entropyScore < 56 ? "bg-amber-500" : "bg-emerald-600";

  const cardBase =
    "rounded-xl border p-4 text-left transition-all focus-within:ring-2 focus-within:ring-accent/25";
  const cardOff = "border-neutral-200/90 bg-white/80 hover:border-neutral-300";
  const cardOn = "border-accent bg-white shadow-md ring-2 ring-accent/15";

  return (
    <>
      <div className="relative flex min-h-screen min-h-[100dvh] flex-col bg-canvas safe-pt">
        <RainBackground />
        <div
          className="pointer-events-none fixed inset-0 z-[2] bg-gradient-to-b from-canvas/88 via-canvas/45 to-canvas/82"
          aria-hidden
        />

        {loading && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/75 backdrop-blur-sm"
            aria-busy="true"
            aria-label="Creating secure account"
          >
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-accent" />
              <p className="text-sm text-muted">Creating secure account…</p>
            </div>
          </div>
        )}

        <div className="relative z-10 flex flex-1 flex-col items-center px-4 pb-10 pt-[5vh] sm:px-6 sm:pt-[8vh]">
          <div className="w-full max-w-2xl">
            <p className="mb-4 text-center">
              {homeHref.startsWith("http") ? (
                <a href={homeHref} className="text-sm font-medium text-muted hover:text-accent">
                  ← Back to sign in
                </a>
              ) : (
                <Link href={homeHref} className="text-sm font-medium text-muted hover:text-accent">
                  ← Back to sign in
                </Link>
              )}
            </p>

            <header className="mb-6 text-center sm:mb-8">
              <h1 className="font-display text-[1.5rem] font-normal leading-tight tracking-[0.1em] text-neutral-900 sm:text-3xl">
                Secure vault onboarding
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
                Private Bitcoin-grade setup: minimal identity data, strong cryptography, and recovery you control.
                Nothing here is sent to a server in this demo — credentials stay in your browser session.
              </p>
            </header>

            <nav className="mb-8 flex flex-wrap justify-center gap-2" aria-label="Onboarding steps">
              {STEPS.map((label, i) => (
                <span
                  key={label}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    i === step ? "bg-neutral-800 text-white" : i < step ? "bg-neutral-200 text-neutral-700" : "bg-white/60 text-muted"
                  }`}
                >
                  {i + 1}. {label}
                </span>
              ))}
            </nav>

            <div className="relative z-[1] rounded-2xl border border-neutral-200/90 bg-white/92 p-5 shadow-card backdrop-blur-md sm:rounded-3xl sm:p-8">
              {step === 0 && (
                <section className="space-y-4" aria-labelledby="step-email">
                  <h2 id="step-email" className="text-lg font-semibold text-neutral-900">
                    Login email
                  </h2>
                  <p className="text-sm text-muted">
                    You sign in with this address. It is also used for security notifications and recovery — never sold
                    or shared.
                  </p>
                  <div>
                    <label htmlFor="recovery-email" className="mb-1.5 flex items-center text-xs font-medium uppercase tracking-wide text-muted">
                      Email
                      <InfoTooltip
                        label="About your email"
                        text="Required for sign-in, security notifications, and recovery. Never shared."
                      />
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted" />
                      <input
                        id="recovery-email"
                        type="email"
                        autoComplete="email"
                        value={recoveryEmail}
                        onChange={(e) => setRecoveryEmail(e.target.value)}
                        onBlur={() => setRecoveryEmailTouched(true)}
                        placeholder="notifications@your-domain.com"
                        className="min-h-[48px] w-full rounded-xl border border-neutral-200/90 bg-white py-3 pl-10 pr-3 text-base text-neutral-900 outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 sm:text-sm"
                      />
                    </div>
                    {recoveryEmailTouched && !emailValid && (
                      <p className="mt-1 text-xs text-red-600">Enter a valid email address.</p>
                    )}
                  </div>
                </section>
              )}

              {step === 1 && (
                <section className="space-y-4" aria-labelledby="step-pass">
                  <h2 id="step-pass" className="text-lg font-semibold text-neutral-900">
                    Master password
                  </h2>
                  <div>
                    <label htmlFor="master-pass" className="mb-1.5 flex items-center text-xs font-medium uppercase tracking-wide text-muted">
                      Password
                      <InfoTooltip
                        label="About master password"
                        text="Your password protects your private Bitcoin vault. Choose a strong one."
                      />
                    </label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted" />
                      <input
                        id="master-pass"
                        type="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="min-h-[48px] w-full rounded-xl border border-neutral-200/90 bg-white py-3 pl-10 pr-3 text-base text-neutral-900 outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 sm:text-sm"
                      />
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted">
                        <span>Entropy estimate</span>
                        <span>{Math.round(pwdAnalysis.entropyBits)} bits (score {pwdAnalysis.entropyScore}/100)</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
                        <div
                          className={`h-full transition-all duration-300 ${entropyColor}`}
                          style={{ width: `${pwdAnalysis.entropyScore}%` }}
                        />
                      </div>
                      <ul className="space-y-1 text-xs text-muted">
                        <li className={pwdAnalysis.lengthOk ? "text-emerald-700" : "text-amber-700"}>
                          {pwdAnalysis.lengthOk ? "✓" : "○"} At least 12 characters
                        </li>
                        <li className={pwdAnalysis.notCommon ? "text-emerald-700" : "text-amber-700"}>
                          {pwdAnalysis.notCommon ? "✓" : "○"} Not a common password
                        </li>
                        <li className={pwdAnalysis.entropyScore >= 40 ? "text-emerald-700" : "text-amber-700"}>
                          {pwdAnalysis.entropyScore >= 40 ? "✓" : "○"} Sufficient entropy (40+ score)
                        </li>
                      </ul>
                      {pwdAnalysis.messages.length > 0 && (
                        <ul className="list-disc pl-4 text-xs text-amber-800">
                          {pwdAnalysis.messages.map((m) => (
                            <li key={m}>{m}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {password.length > 0 && (
                    <div
                      className="rounded-xl border border-neutral-200/90 bg-neutral-50/90 p-4 shadow-sm"
                      role="region"
                      aria-labelledby="confirm-pass-heading"
                    >
                      <p id="confirm-pass-heading" className="text-sm font-medium text-neutral-900">
                        Confirm your password
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-muted">
                        Re-enter the same password to catch typos. This must match exactly before you can continue.
                      </p>
                      <label htmlFor="master-pass-confirm" className="sr-only">
                        Re-type password to confirm
                      </label>
                      <div className="relative mt-3">
                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted" />
                        <input
                          id="master-pass-confirm"
                          type="password"
                          autoComplete="new-password"
                          value={passwordConfirm}
                          onChange={(e) => setPasswordConfirm(e.target.value)}
                          className="min-h-[48px] w-full rounded-xl border border-neutral-200/90 bg-white py-3 pl-10 pr-3 text-base text-neutral-900 outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 sm:text-sm"
                          placeholder="Re-type your password"
                        />
                      </div>
                      {passwordConfirm.length > 0 && !passwordsMatch && (
                        <p className="mt-2 text-xs text-red-600">Passwords do not match.</p>
                      )}
                      {passwordOk && passwordsMatch && (
                        <p className="mt-2 text-xs text-emerald-700">Passwords match.</p>
                      )}
                    </div>
                  )}
                </section>
              )}

              {step === 2 && (
                <section className="space-y-6" aria-labelledby="step-2fa">
                  <h2 id="step-2fa" className="text-lg font-semibold text-neutral-900">
                    Two-factor authentication
                  </h2>
                  <p className="text-sm text-muted">Select at least one method and complete registration for each.</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <button
                      type="button"
                      onClick={() => setWantTotp((v) => !v)}
                      className={`${cardBase} ${wantTotp ? cardOn : cardOff}`}
                    >
                      <Smartphone className="mb-2 h-8 w-8 text-accent" aria-hidden />
                      <div className="font-semibold text-neutral-900">TOTP</div>
                      <p className="mt-1 text-xs text-muted">Google Authenticator, Authy, Aegis, etc.</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWantSecurityKey((v) => !v)}
                      className={`${cardBase} ${wantSecurityKey ? cardOn : cardOff}`}
                    >
                      <KeyRound className="mb-2 h-8 w-8 text-accent" aria-hidden />
                      <div className="font-semibold text-neutral-900">Hardware key</div>
                      <p className="mt-1 text-xs text-muted">YubiKey, SoloKey, Nitrokey via WebAuthn.</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWantPasskey((v) => !v)}
                      className={`${cardBase} ${wantPasskey ? cardOn : cardOff}`}
                    >
                      <Fingerprint className="mb-2 h-8 w-8 text-accent" aria-hidden />
                      <div className="font-semibold text-neutral-900">Passkey</div>
                      <p className="mt-1 text-xs text-muted">Platform passkey (WebAuthn, synced or device-bound).</p>
                    </button>
                  </div>

                  {wantTotp && totpSecret && (
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm">
                      <p className="font-medium text-neutral-900">Authenticator setup</p>
                      <p className="mt-2 break-all font-mono text-xs text-neutral-700">{totpUri}</p>
                      <p className="mt-2 text-xs text-muted">
                        Add this otpauth URI to your app, or enter the secret:{" "}
                        <span className="font-mono text-neutral-800">{totpSecret.base32}</span>
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={6}
                          placeholder="6-digit code"
                          value={totpCodeInput}
                          onChange={(e) => setTotpCodeInput(e.target.value.replace(/\D/g, ""))}
                          className="w-36 rounded-lg border border-neutral-300 px-3 py-2 text-sm"
                        />
                        <button
                          type="button"
                          onClick={verifyTotp}
                          className="rounded-lg bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-900"
                        >
                          Verify code
                        </button>
                        {totpVerified && <span className="self-center text-sm font-medium text-emerald-700">Verified</span>}
                      </div>
                    </div>
                  )}

                  {wantSecurityKey && (
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                      <p className="text-sm font-medium text-neutral-900">Register security key</p>
                      <button
                        type="button"
                        onClick={async () => {
                          const c = await registerCredential("securityKey");
                          setSecurityKeyCred(c);
                        }}
                        className="mt-2 rounded-lg border border-neutral-400 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
                      >
                        {securityKeyCred ? "Registered ✓" : "Use hardware key"}
                      </button>
                      {securityKeyCred && (
                        <p className="mt-2 font-mono text-xs text-muted">Credential: {credentialSummary(securityKeyCred)}…</p>
                      )}
                    </div>
                  )}

                  {wantPasskey && (
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                      <p className="text-sm font-medium text-neutral-900">Create passkey</p>
                      <button
                        type="button"
                        onClick={async () => {
                          const c = await registerCredential("passkey");
                          setPasskeyCred(c);
                        }}
                        className="mt-2 rounded-lg border border-neutral-400 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
                      >
                        {passkeyCred ? "Passkey created ✓" : "Create passkey"}
                      </button>
                      {passkeyCred && (
                        <p className="mt-2 font-mono text-xs text-muted">Credential: {credentialSummary(passkeyCred)}…</p>
                      )}
                    </div>
                  )}

                  {!atLeastOne2FA && <p className="text-sm text-amber-800">Choose at least one 2FA method.</p>}
                  {atLeastOne2FA && !twoFAComplete && (
                    <p className="text-sm text-amber-800">Complete setup for each selected method.</p>
                  )}
                </section>
              )}

              {step === 3 && (
                <section className="space-y-4" aria-labelledby="step-device">
                  <h2 id="step-device" className="text-lg font-semibold text-neutral-900">
                    Trusted device registration
                  </h2>
                  <p className="text-sm text-muted">
                    Bind this browser to your vault. This device will be required for sensitive actions.
                  </p>
                  <div>
                    <label htmlFor="device-name" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">
                      Device name
                    </label>
                    <input
                      id="device-name"
                      value={deviceName}
                      onChange={(e) => setDeviceName(e.target.value)}
                      placeholder="e.g. MacBook Pro — Safari"
                      className="min-h-[48px] w-full rounded-xl border border-neutral-200/90 bg-white px-3 py-3 text-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10"
                    />
                  </div>
                  <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">Device fingerprint (SHA-256)</p>
                    <p className="mt-2 break-all font-mono text-xs text-neutral-800">{deviceFingerprint || "…"}</p>
                    <button
                      type="button"
                      onClick={async () => {
                        const c = await registerCredential("deviceBind");
                        setDeviceBoundCred(c);
                      }}
                      className="mt-4 w-full rounded-xl border border-neutral-700 bg-neutral-800 py-3 text-sm font-semibold text-white hover:bg-neutral-900 sm:w-auto sm:px-6"
                    >
                      {deviceBoundCred ? "Device confirmed ✓" : "Confirm this device"}
                    </button>
                    <p className="mt-3 text-xs text-muted">
                      Stores a WebAuthn keypair for this origin. Approve the browser prompt to continue.
                    </p>
                  </div>
                </section>
              )}

              {step === 4 && (
                <section className="space-y-6" aria-labelledby="step-recovery">
                  <h2 id="step-recovery" className="text-lg font-semibold text-neutral-900">
                    Recovery method
                  </h2>
                  <p className="text-sm text-muted">Choose at least one. You must prove you saved it.</p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setWantBackup((v) => !v)}
                      className={`${cardBase} ${wantBackup ? cardOn : cardOff}`}
                    >
                      <Shield className="mb-2 h-7 w-7 text-accent" aria-hidden />
                      <div className="font-semibold text-neutral-900">Backup codes</div>
                      <p className="mt-1 text-xs text-muted">8–12 one-time emergency codes</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWantPassphrase((v) => !v)}
                      className={`${cardBase} ${wantPassphrase ? cardOn : cardOff}`}
                    >
                      <FileKey className="mb-2 h-7 w-7 text-accent" aria-hidden />
                      <div className="font-semibold text-neutral-900">Recovery passphrase</div>
                      <p className="mt-1 text-xs text-muted">12-word BIP39 mnemonic</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWantHwRecovery((v) => !v)}
                      className={`${cardBase} ${wantHwRecovery ? cardOn : cardOff}`}
                    >
                      <KeyRound className="mb-2 h-7 w-7 text-accent" aria-hidden />
                      <div className="font-semibold text-neutral-900">Hardware key recovery</div>
                      <p className="mt-1 text-xs text-muted">Dedicated WebAuthn credential</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWantEncryptedFile((v) => !v)}
                      className={`${cardBase} ${wantEncryptedFile ? cardOn : cardOff}`}
                    >
                      <Download className="mb-2 h-7 w-7 text-accent" aria-hidden />
                      <div className="font-semibold text-neutral-900">Encrypted recovery file</div>
                      <p className="mt-1 text-xs text-muted">JSON encrypted with your password</p>
                    </button>
                  </div>

                  {wantBackup && backupCodes.length > 0 && (
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                      <p className="text-sm font-medium text-neutral-900">Save these codes offline</p>
                      <ol className="mt-2 grid list-decimal gap-1 pl-5 font-mono text-xs sm:grid-cols-2">
                        {backupCodes.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ol>
                      <label className="mt-3 flex items-start gap-2 text-sm">
                        <input type="checkbox" checked={backupSaved} onChange={(e) => setBackupSaved(e.target.checked)} />
                        I have written these codes down and stored them securely.
                      </label>
                      <p className="mt-3 text-xs text-muted">
                        Enter code #{backupConfirmIdx + 1} exactly to confirm:
                      </p>
                      <input
                        value={backupConfirmInput}
                        onChange={(e) => setBackupConfirmInput(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 font-mono text-sm uppercase sm:max-w-xs"
                        placeholder="XXXX-XXXXXXXX"
                      />
                    </div>
                  )}

                  {wantPassphrase && passphraseWords.length > 0 && (
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                      <p className="text-sm font-medium text-neutral-900">Recovery passphrase (12 words)</p>
                      <p className="mt-2 font-mono text-sm leading-relaxed text-neutral-800">{passphraseWords.join(" ")}</p>
                      <label className="mt-3 flex items-start gap-2 text-sm">
                        <input type="checkbox" checked={passphraseSaved} onChange={(e) => setPassphraseSaved(e.target.checked)} />
                        I have recorded this phrase in order, offline only.
                      </label>
                      <p className="mt-3 text-xs text-muted">
                        Enter word #{passphraseConfirmIdx + 1} from your phrase (same order as above) to confirm you
                        saved it:
                      </p>
                      <input
                        value={passphraseConfirmInput}
                        onChange={(e) => setPassphraseConfirmInput(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm sm:max-w-xs"
                        placeholder="word"
                        autoComplete="off"
                      />
                    </div>
                  )}

                  {wantHwRecovery && (
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                      <p className="text-sm font-medium text-neutral-900">Register recovery hardware key</p>
                      <button
                        type="button"
                        onClick={async () => {
                          const c = await registerCredential("recoveryKey");
                          setRecoveryKeyCred(c);
                        }}
                        className="mt-2 rounded-lg border border-neutral-400 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
                      >
                        {recoveryKeyCred ? "Recovery key registered ✓" : "Use recovery key"}
                      </button>
                    </div>
                  )}

                  {wantEncryptedFile && (
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                      <p className="text-sm font-medium text-neutral-900">Encrypted recovery file</p>
                      <p className="mt-1 text-xs text-muted">
                        Downloads a file encrypted with your master password (PBKDF2 + AES-GCM). Store it offline.
                      </p>
                      <button
                        type="button"
                        onClick={() => void downloadEncryptedRecovery()}
                        className="mt-3 rounded-lg bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-900"
                      >
                        {encryptedFileDone ? "Downloaded — generate again" : "Download encrypted file"}
                      </button>
                    </div>
                  )}

                  {!atLeastOneRecovery && <p className="text-sm text-amber-800">Select at least one recovery method.</p>}
                </section>
              )}

              {step === 5 && (
                <section className="space-y-4" aria-labelledby="step-review">
                  <h2 id="step-review" className="text-lg font-semibold text-neutral-900">
                    Review
                  </h2>
                  <ul className="space-y-2 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm">
                    <li>
                      <span className="font-medium text-neutral-700">Login email: </span>
                      {recoveryEmail.trim()}
                    </li>
                    <li>
                      <span className="font-medium text-neutral-700">2FA: </span>
                      {[
                        wantTotp && totpVerified && "TOTP",
                        wantSecurityKey && securityKeyCred && "Hardware key",
                        wantPasskey && passkeyCred && "Passkey",
                      ]
                        .filter(Boolean)
                        .join(", ") || "—"}
                    </li>
                    <li>
                      <span className="font-medium text-neutral-700">Trusted device: </span>
                      {deviceName.trim()} ({deviceFingerprint.slice(0, 16)}…)
                    </li>
                    <li>
                      <span className="font-medium text-neutral-700">Recovery: </span>
                      {[
                        wantBackup && backupSaved && "Backup codes",
                        wantPassphrase && passphraseSaved && "Passphrase",
                        wantHwRecovery && recoveryKeyCred && "Hardware recovery",
                        wantEncryptedFile && encryptedFileDone && "Encrypted file",
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </li>
                  </ul>
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm text-neutral-900">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={lockoutAck}
                      onChange={(e) => setLockoutAck(e.target.checked)}
                    />
                    <span>
                      I understand that losing my password <strong>and</strong> my recovery method will permanently lock me
                      out of this vault.
                    </span>
                  </label>
                  <button
                    type="button"
                    disabled={!lockoutAck || loading}
                    onClick={() => void handleCreate()}
                    className="flex min-h-[52px] w-full items-center justify-center rounded-xl bg-neutral-800 py-3.5 text-base font-semibold text-white hover:bg-neutral-900 disabled:opacity-40"
                  >
                    Create Secure Account
                  </button>
                </section>
              )}

              {step < 5 && (
                <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-neutral-200/80 pt-6">
                  <button
                    type="button"
                    disabled={step === 0}
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    className="rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-800 disabled:opacity-40"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!canContinue()}
                    onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                    className="rounded-xl bg-neutral-800 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>

            <div className="safe-pb mt-8 flex w-full justify-center">
              <LoginFooter variant="copyrightOnly" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
