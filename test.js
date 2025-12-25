// Test script for screenshot-to-base64-mcp
import { readFile } from 'fs/promises';
import { extname } from 'path';

const MIME_TYPES = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.bmp': 'image/bmp',
    '.svg': 'image/svg+xml',
};

async function convertImageToBase64(imagePath) {
    try {
        const imageBuffer = await readFile(imagePath);
        const ext = extname(imagePath).toLowerCase();
        const mimeType = MIME_TYPES[ext];

        if (!mimeType) {
            throw new Error(`Unsupported image format: ${ext}`);
        }

        const base64Image = imageBuffer.toString('base64');
        const dataUri = `data:${mimeType};base64,${base64Image}`;

        return dataUri;
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error(`Image file not found: ${imagePath}`);
        }
        throw error;
    }
}

// Test with the generated test image
const testImagePath = process.argv[2];

if (!testImagePath) {
    console.error('Usage: node test.js <path-to-image>');
    process.exit(1);
}

console.log('Testing base64 conversion...');
console.log(`Image path: ${testImagePath}`);

try {
    const dataUri = await convertImageToBase64(testImagePath);
    console.log('\n✅ SUCCESS!');
    console.log(`\nData URI length: ${dataUri.length} characters`);
    console.log(`First 100 chars: ${dataUri.substring(0, 100)}...`);
    console.log('\nThis data URI can now be used in LMStudio\'s "url" field.');
} catch (error) {
    console.error('\n❌ ERROR:', error.message);
    process.exit(1);
}
