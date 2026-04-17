import CryptoJS from 'crypto-js';

// These keys are taken directly from your NSDL Staging documentation
const S_KEY = "a6T8tOCYiSzDTrcqPvCbJfy0wSQOVcfaevH0gtwCtoU=";

/**
 * Encrypts a plain JSON object into the NSDL required format:
 * { "RequestData": "encrypted_string" }
 */
export const encryptPayload = (payload) => {
    try {
        const jsonString = JSON.stringify(payload);
        const encrypted = CryptoJS.AES.encrypt(
            jsonString,
            CryptoJS.enc.Utf8.parse(S_KEY),
            {
                mode: CryptoJS.mode.ECB, // Standard for many banking API implementations
                padding: CryptoJS.pad.Pkcs7
            }
        ).toString();

        return { RequestData: encrypted };
    } catch (error) {
        console.error("Encryption Error:", error);
        return null;
    }
};

/**
 * Decrypts the ResponseData string back into a JSON object
 */
export const decryptResponse = (encryptedData) => {
    try {
        const bytes = CryptoJS.AES.decrypt(
            encryptedData,
            CryptoJS.enc.Utf8.parse(S_KEY),
            {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            }
        );
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedText);
    } catch (error) {
        console.error("Decryption Error:", error);
        return null;
    }
};