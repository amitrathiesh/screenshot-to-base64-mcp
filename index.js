#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { readFile } from 'fs/promises';
import { extname } from 'path';

/**
 * Screenshot to Base64 MCP Server
 * Converts image files to base64 data URIs for LMStudio compatibility
 * 
 * @author Amit Rathiesh <amitrathiesh@webzler.com>
 * @website https://www.webzler.com
 */

// MIME type mapping for common image formats
const MIME_TYPES = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.bmp': 'image/bmp',
    '.svg': 'image/svg+xml',
};

/**
 * Convert an image file to a base64 data URI
 * @param {string} imagePath - Absolute or relative path to the image file
 * @returns {Promise<string>} Base64 data URI (e.g., data:image/png;base64,...)
 */
async function convertImageToBase64(imagePath) {
    try {
        // Read the image file
        const imageBuffer = await readFile(imagePath);

        // Detect MIME type from file extension
        const ext = extname(imagePath).toLowerCase();
        const mimeType = MIME_TYPES[ext];

        if (!mimeType) {
            throw new Error(`Unsupported image format: ${ext}. Supported formats: ${Object.keys(MIME_TYPES).join(', ')}`);
        }

        // Convert to base64
        const base64Image = imageBuffer.toString('base64');

        // Create data URI
        const dataUri = `data:${mimeType};base64,${base64Image}`;

        return dataUri;
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error(`Image file not found: ${imagePath}`);
        }
        throw error;
    }
}

// Create MCP server instance
const server = new Server(
    {
        name: 'screenshot-to-base64-mcp',
        version: '1.0.0',
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// Register tool: convert_image_to_base64
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: 'convert_image_to_base64',
                description: 'Converts an image file to a base64-encoded data URI for use with LMStudio vision models. Supports PNG, JPEG, GIF, WebP, BMP, and SVG formats.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        image_path: {
                            type: 'string',
                            description: 'Absolute or relative path to the image file to convert',
                        },
                    },
                    required: ['image_path'],
                },
            },
        ],
    };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === 'convert_image_to_base64') {
        const imagePath = request.params.arguments.image_path;

        if (!imagePath) {
            return {
                content: [
                    {
                        type: 'text',
                        text: 'Error: image_path parameter is required',
                    },
                ],
                isError: true,
            };
        }

        try {
            const dataUri = await convertImageToBase64(imagePath);

            return {
                content: [
                    {
                        type: 'text',
                        text: `Successfully converted image to base64 data URI.\n\nYou can now use this in the LMStudio 'url' field:\n${dataUri.substring(0, 100)}... (${dataUri.length} characters total)`,
                    },
                    {
                        type: 'text',
                        text: dataUri,
                    },
                ],
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error converting image: ${error.message}`,
                    },
                ],
                isError: true,
            };
        }
    }

    return {
        content: [
            {
                type: 'text',
                text: `Unknown tool: ${request.params.name}`,
            },
        ],
        isError: true,
    };
});

// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Screenshot-to-Base64 MCP Server running on stdio');
}

main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
