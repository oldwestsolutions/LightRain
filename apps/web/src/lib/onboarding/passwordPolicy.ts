const COMMON_PASSWORDS = new Set(
  [
    "password",
    "password1",
    "123456",
    "12345678",
    "123456789",
    "qwerty",
    "abc123",
    "monkey",
    "letmein",
    "trustno1",
    "dragon",
    "baseball",
    "iloveyou",
    "master",
    "sunshine",
    "ashley",
    "bailey",
    "shadow",
    "superman",
    "qazwsx",
    "michael",
    "football",
    "welcome",
    "jesus",
    "ninja",
    "mustang",
    "password123",
    "admin",
    "root",
    "toor",
    "passw0rd",
    "p@ssw0rd",
    "bitcoin",
    "satoshi",
    "wallet",
    "lightrain",
    "lightra",
  ].map((s) => s.toLowerCase()),
);

export type PasswordAnalysis = {
  lengthOk: boolean;
  notCommon: boolean;
  entropyBits: number;
  entropyScore: number;
  messages: string[];
};

function shannonEntropyBits(password: string): number {
  if (password.length === 0) return 0;
  const freq = new Map<string, number>();
  for (const ch of password) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }
  let h = 0;
  const len = password.length;
  for (const c of freq.values()) {
    const p = c / len;
    h -= p * Math.log2(p);
  }
  return h * len;
}

export function analyzePassword(password: string): PasswordAnalysis {
  const messages: string[] = [];
  const lengthOk = password.length >= 12;
  if (!lengthOk) messages.push("Use at least 12 characters.");

  const lower = password.toLowerCase();
  const notCommon = !COMMON_PASSWORDS.has(lower) && !COMMON_PASSWORDS.has(lower.replace(/\d+$/, ""));
  if (!notCommon) messages.push("This password is too common. Choose a unique phrase.");

  const rawBits = shannonEntropyBits(password);
  const lengthBonus = Math.min(40, password.length * 2);
  const entropyBits = rawBits + lengthBonus * 0.15;
  const entropyScore = Math.min(100, Math.round((entropyBits / 80) * 100));

  if (entropyScore < 35) messages.push("Low entropy — mix character types and length.");
  else if (entropyScore < 55) messages.push("Moderate strength — consider a longer random phrase.");

  return { lengthOk, notCommon, entropyBits, entropyScore, messages };
}

export function passwordMeetsPolicy(p: PasswordAnalysis): boolean {
  return p.lengthOk && p.notCommon && p.entropyScore >= 40;
}
