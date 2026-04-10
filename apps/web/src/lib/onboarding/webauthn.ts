export type WebAuthnMode = "securityKey" | "passkey" | "deviceBind" | "recoveryKey";

function randomChallenge(): ArrayBuffer {
  const buf = new Uint8Array(32);
  crypto.getRandomValues(buf);
  return buf.buffer as ArrayBuffer;
}

function randomUserId(): ArrayBuffer {
  const buf = new Uint8Array(16);
  crypto.getRandomValues(buf);
  return buf.buffer as ArrayBuffer;
}

export async function registerCredential(mode: WebAuthnMode): Promise<PublicKeyCredential | null> {
  if (typeof window === "undefined" || !window.PublicKeyCredential) {
    return null;
  }

  const rpId = window.location.hostname || "localhost";

  const pubKeyCredParams: PublicKeyCredentialParameters[] = [
    { type: "public-key", alg: -7 },
    { type: "public-key", alg: -257 },
  ];

  let authenticatorSelection: AuthenticatorSelectionCriteria;

  switch (mode) {
    case "passkey":
      authenticatorSelection = {
        residentKey: "preferred",
        userVerification: "preferred",
      };
      break;
    case "securityKey":
      authenticatorSelection = {
        authenticatorAttachment: "cross-platform",
        userVerification: "preferred",
      };
      break;
    case "deviceBind":
      authenticatorSelection = {
        residentKey: "preferred",
        userVerification: "required",
      };
      break;
    case "recoveryKey":
      authenticatorSelection = {
        authenticatorAttachment: "cross-platform",
        userVerification: "preferred",
      };
      break;
    default:
      authenticatorSelection = { userVerification: "preferred" };
  }

  try {
    const cred = (await navigator.credentials.create({
      publicKey: {
        challenge: randomChallenge(),
        rp: { name: "LightRain", id: rpId === "localhost" ? "localhost" : rpId },
        user: {
          id: randomUserId(),
          name: `lr-${mode}-${Date.now()}`,
          displayName: `LightRain ${mode}`,
        },
        pubKeyCredParams,
        authenticatorSelection,
        timeout: 120_000,
        attestation: "none",
      },
    })) as PublicKeyCredential | null;

    return cred;
  } catch {
    return null;
  }
}

export function credentialSummary(cred: PublicKeyCredential | null): string | null {
  if (!cred?.rawId) return null;
  const id = new Uint8Array(cred.rawId);
  return Array.from(id)
    .slice(0, 8)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
