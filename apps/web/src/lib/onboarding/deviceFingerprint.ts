export async function computeDeviceFingerprintHex(): Promise<string> {
  const saltKey = "lr_device_fp_salt";
  let salt = "";
  if (typeof sessionStorage !== "undefined") {
    salt = sessionStorage.getItem(saltKey) ?? "";
    if (!salt) {
      salt = crypto.randomUUID();
      sessionStorage.setItem(saltKey, salt);
    }
  } else {
    salt = "ssr";
  }

  const parts = [
    typeof navigator !== "undefined" ? navigator.userAgent : "",
    typeof navigator !== "undefined" ? navigator.language : "",
    typeof screen !== "undefined" ? `${screen.width}x${screen.height}x${screen.colorDepth}` : "",
    typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "",
    salt,
  ].join("|");

  const data = new TextEncoder().encode(parts);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
