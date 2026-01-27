// Simple Encryption Utility using Web Crypto API (AES-GCM)
// NOTE: For true E2EE, keys should be exchanged securely (e.g. Signal Protocol).
// This implementation provides "Encryption at Rest" by deriving keys from a shared secret + conversation ID.

const MASTER_SECRET = "UHDMS_INTERNAL_SECURE_KEY_V1"; // In prod, this should be env var or user-specific

async function getKey(conversationId) {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        enc.encode(MASTER_SECRET),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    return window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: enc.encode(conversationId),
            iterations: 100000,
            hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

export const encryptMessage = async (text, conversationId) => {
    try {
        if (!text) return text;
        const key = await getKey(conversationId);
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const encoded = new TextEncoder().encode(text);

        const encrypted = await window.crypto.subtle.encrypt(
            { name: "AES-GCM", iv: iv },
            key,
            encoded
        );

        // Combine IV and Encrypted Data, then encode as Base64
        const combined = new Uint8Array(iv.length + encrypted.byteLength);
        combined.set(iv);
        combined.set(new Uint8Array(encrypted), iv.length);

        return btoa(String.fromCharCode(...combined));
    } catch (e) {
        console.error("Encryption failed:", e);
        return text; // Fallback (or throw)
    }
};

export const decryptMessage = async (encryptedText, conversationId) => {
    try {
        if (!encryptedText) return "";
        // Check if it looks like base64
        if (!/^[A-Za-z0-9+/=]+$/.test(encryptedText)) return encryptedText;

        const combined = new Uint8Array(
            atob(encryptedText).split("").map(c => c.charCodeAt(0))
        );

        const iv = combined.slice(0, 12);
        const data = combined.slice(12);
        const key = await getKey(conversationId);

        const decrypted = await window.crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv },
            key,
            data
        );

        return new TextDecoder().decode(decrypted);
    } catch (e) {
        // console.warn("Decryption failed (might be plain text):", e);
        return encryptedText; // Return original if decryption fails (backward compatibility)
    }
};
