#!/usr/bin/env node

/**
 * ============================================================================
 * Solico TMR PWA - Client-Side Cryptographic Data Packager
 * ============================================================================
 * 
 * Encrypts products.json using authenticated AES-256-GCM with key derivation
 * via PBKDF2 (HMAC-SHA256, 100,000 iterations).
 * 
 * Binary Output Structure (.enc):
 * [0..15]   - 16 bytes: Cryptographically random PBKDF2 Salt
 * [16..27]  - 12 bytes: Cryptographically random AES-GCM IV (96-bit nonce)
 * [28..end] - Variable: AES-256-GCM Ciphertext + 16-byte Authentication Tag
 * 
 * Usage:
 *   node encrypt-products.js [inputJsonPath] [outputEncPath] [passcode]
 *   
 * Default:
 *   Input:    data/products.json
 *   Output:   data/products.enc
 *   Passcode: Solico@2026! (or process.env.SOLICO_PASSCODE)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Cryptographic configuration parameters
const DEFAULT_PASSCODE = process.env.SOLICO_PASSCODE || 'Solico@2026!';
const PBKDF2_ITERATIONS = 100000;
const PBKDF2_DIGEST = 'sha256';
const KEY_LENGTH = 32;       // 256 bits for AES-256
const SALT_LENGTH = 16;      // 128-bit salt
const IV_LENGTH = 12;        // 96-bit IV recommended for AES-GCM
const AUTH_TAG_LENGTH = 16;  // 128-bit authentication tag

async function encryptData() {
    // Parse arguments
    const args = process.argv.slice(2);
    const inputPath = args[0] || path.join(__dirname, 'data', 'products.json');
    const outputPath = args[1] || path.join(__dirname, 'data', 'products.enc');
    const passcode = args[2] || DEFAULT_PASSCODE;

    console.log('\n🔒 ==========================================');
    console.log('   Solico Client-Side Cryptographic Lock');
    console.log('==========================================');
    console.log(`📁 Input file:   ${inputPath}`);
    console.log(`📦 Output file:  ${outputPath}`);
    console.log(`🔑 Passcode:     ${passcode.replace(/./g, '*')}`);
    console.log(`🛡️  Algorithm:    AES-256-GCM (PBKDF2-SHA256, ${PBKDF2_ITERATIONS.toLocaleString()} iterations)`);

    // Verify input exists
    if (!fs.existsSync(inputPath)) {
        console.error(`\n❌ [ERROR] Input file not found: ${inputPath}`);
        process.exit(1);
    }

    const rawBuffer = fs.readFileSync(inputPath);
    console.log(`📊 Input size:   ${(rawBuffer.length / 1024 / 1024).toFixed(2)} MB (${rawBuffer.length.toLocaleString()} bytes)`);

    // Validate JSON structure
    let itemCount = 0;
    try {
        const parsed = JSON.parse(rawBuffer.toString('utf8'));
        itemCount = Array.isArray(parsed) ? parsed.length : (typeof parsed === 'object' ? Object.keys(parsed).length : 0);
        console.log(`✅ Valid JSON verified (${itemCount.toLocaleString()} items)`);
    } catch (err) {
        console.error(`\n❌ [ERROR] Input file is not valid JSON: ${err.message}`);
        process.exit(1);
    }

    const startTime = Date.now();

    // 1. Generate cryptographically strong random salt and IV
    const salt = crypto.randomBytes(SALT_LENGTH);
    const iv = crypto.randomBytes(IV_LENGTH);

    // 2. Derive 256-bit AES key using PBKDF2
    const key = crypto.pbkdf2Sync(
        passcode,
        salt,
        PBKDF2_ITERATIONS,
        KEY_LENGTH,
        PBKDF2_DIGEST
    );

    // 3. Encrypt with AES-256-GCM
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([
        cipher.update(rawBuffer),
        cipher.final()
    ]);
    const authTag = cipher.getAuthTag();

    // 4. Combine into final binary payload: [Salt (16)] + [IV (12)] + [Ciphertext] + [AuthTag (16)]
    // In Web Crypto API, subtle.encrypt appends the auth tag to the end of ciphertext.
    // Concatenating encrypted + authTag matches the exact format Web Crypto expects!
    const outputBuffer = Buffer.concat([
        salt,
        iv,
        encrypted,
        authTag
    ]);

    // Ensure output directory exists
    const outDir = path.dirname(outputPath);
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    // Write binary file
    fs.writeFileSync(outputPath, outputBuffer);
    const duration = Date.now() - startTime;

    console.log(`\n💾 Encrypted binary written successfully:`);
    console.log(`   - Salt:       ${SALT_LENGTH} bytes`);
    console.log(`   - IV:         ${IV_LENGTH} bytes`);
    console.log(`   - Ciphertext: ${encrypted.length.toLocaleString()} bytes`);
    console.log(`   - Auth Tag:   ${authTag.length} bytes`);
    console.log(`   - Total Size: ${(outputBuffer.length / 1024 / 1024).toFixed(2)} MB (${outputBuffer.length.toLocaleString()} bytes)`);
    console.log(`⏱️  Elapsed time: ${duration} ms`);

    // 5. Self-test verification using Web Crypto API interoperability
    console.log('\n🔍 Running Web Crypto decryption verification test...');
    try {
        const subtle = crypto.webcrypto ? crypto.webcrypto.subtle : globalThis.crypto.subtle;
        const testSalt = new Uint8Array(outputBuffer.subarray(0, SALT_LENGTH));
        const testIv = new Uint8Array(outputBuffer.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH));
        const testCiphertext = new Uint8Array(outputBuffer.subarray(SALT_LENGTH + IV_LENGTH));

        const testKeyMaterial = await subtle.importKey(
            'raw',
            new TextEncoder().encode(passcode),
            'PBKDF2',
            false,
            ['deriveKey']
        );

        const testKey = await subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: testSalt,
                iterations: PBKDF2_ITERATIONS,
                hash: 'SHA-256'
            },
            testKeyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['decrypt']
        );

        const decryptedBuffer = await subtle.decrypt(
            { name: 'AES-GCM', iv: testIv },
            testKey,
            testCiphertext
        );

        const decryptedJson = JSON.parse(new TextDecoder().decode(decryptedBuffer));
        console.log(`🎉 VERIFICATION PASSED: Successfully decrypted and parsed ${decryptedJson.length} items using Web Crypto API!`);
        console.log('==========================================\n');
    } catch (testErr) {
        console.error(`❌ [VERIFICATION FAILED]: ${testErr.message}`);
        process.exit(1);
    }
}

encryptData().catch(err => {
    console.error('Fatal error during encryption:', err);
    process.exit(1);
});
