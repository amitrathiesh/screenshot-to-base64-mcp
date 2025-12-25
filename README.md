# Screenshot to Base64 MCP Server

Convert image files to base64 data URIs for seamless integration with LMStudio vision models.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

## 🎯 Purpose

This MCP (Model Context Protocol) server solves the common error when sending screenshots to LMStudio vision models:

```
[ERROR] [Server Error] 'url' field must be a base64 encoded image
```

Instead of manually converting images, this server provides a simple tool that converts any image file to a properly formatted base64 data URI that LMStudio expects.

> [!IMPORTANT]
> **Universal MCP Compatibility** - This server works with **ALL MCP-compatible tools**, including KILO CODE, Cline, Roo-Code, Claude Desktop, Continue.dev, and any other application that supports the Model Context Protocol standard.

## ✨ Features

- 🖼️ **Format Support**: PNG, JPEG, GIF, WebP, BMP, SVG
- 🔄 **Automatic MIME Detection**: Detects and applies correct MIME type
- ✅ **Error Handling**: Clear error messages for missing/invalid files
- 🚀 **Easy Integration**: Works seamlessly with KILO CODE and other MCP clients
- 📦 **Lightweight**: Zero external dependencies except MCP SDK

## 📥 Installation

### Option 1: From GitHub (Recommended)

```bash
# Clone the repository
git clone https://github.com/amitrathiesh/screenshot-to-base64-mcp.git
cd screenshot-to-base64-mcp

# Install dependencies
npm install
```

### Option 2: From npm (Coming Soon)

```bash
npm install -g screenshot-to-base64-mcp
```

## ⚙️ Configuration

### Works with ALL MCP-Compatible Tools!

This server uses the standard Model Context Protocol, so it works with any MCP-compatible application. The configuration is nearly identical across all tools.

### KILO CODE / VSCode Extensions

1. Open your MCP settings configuration file
2. Add the server configuration:

```json
{
  "mcpServers": {
    "screenshot-to-base64": {
      "command": "node",
      "args": ["/absolute/path/to/screenshot-to-base64-mcp/index.js"]
    }
  }
}
```

3. Restart your editor/extension

### Cline (Claude Dev)

1. Open Cline MCP settings
2. Add the same configuration:

```json
{
  "mcpServers": {
    "screenshot-to-base64": {
      "command": "node",
      "args": ["/absolute/path/to/screenshot-to-base64-mcp/index.js"]
    }
  }
}
```

### Claude Desktop

1. Open `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS)
2. Add the server configuration:

```json
{
  "mcpServers": {
    "screenshot-to-base64": {
      "command": "node",
      "args": ["/absolute/path/to/screenshot-to-base64-mcp/index.js"]
    }
  }
}
```

### Roo-Code / Continue.dev / Other MCP Tools

Use the same JSON configuration format in your tool's MCP settings. The Model Context Protocol is a universal standard!

### Alternative: Global Installation Setup

If you installed via npm globally:

```json
{
  "mcpServers": {
    "screenshot-to-base64": {
      "command": "screenshot-to-base64-mcp"
    }
  }
}
```

## 🎮 Usage

### General Workflow (Any MCP-Compatible Tool + LMStudio)

1. **Take a screenshot** using your MCP client's browser/screenshot tools (KILO CODE, Cline, etc.)
2. **Use the MCP tool** to convert the screenshot:
   ```
   Use the convert_image_to_base64 tool with the screenshot path
   ```
3. **Send to LMStudio** - The tool returns a base64 data URI that you can directly use in the `url` field
4. **Success!** LMStudio's vision model processes the image without errors

### Example Tool Call

**Input:**
```json
{
  "image_path": "/path/to/screenshot.png"
}
```

**Output:**
```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA...
```

### Supported Image Formats

| Format | Extension | MIME Type |
|--------|-----------|-----------|
| PNG | `.png` | `image/png` |
| JPEG | `.jpg`, `.jpeg` | `image/jpeg` |
| GIF | `.gif` | `image/gif` |
| WebP | `.webp` | `image/webp` |
| BMP | `.bmp` | `image/bmp` |
| SVG | `.svg` | `image/svg+xml` |

## 🔧 Development

### Testing Locally

```bash
# Start the MCP server
npm start

# The server runs on stdio and waits for MCP protocol messages
```

### Project Structure

```
screenshot-to-base64-mcp/
├── index.js          # Main MCP server implementation
├── package.json      # Project metadata and dependencies
├── LICENSE           # MIT License
├── README.md         # This file
└── .gitignore        # Git ignore rules
```

## 🐛 Troubleshooting

### Error: "Image file not found"
- Ensure the path is correct (absolute paths recommended)
- Check file permissions

### Error: "Unsupported image format"
- Verify the file extension is one of: `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.bmp`, `.svg`
- Check the file isn't corrupted

### MCP Server Not Loading
- Verify the path in your KILO CODE config is absolute
- Ensure Node.js ≥18.0.0 is installed: `node --version`
- Check that dependencies are installed: `npm install`

## 📝 License

MIT License - Copyright (c) 2025 Amit Rathiesh

See [LICENSE](LICENSE) file for details.

## 👤 Author

**Amit Rathiesh**
- Email: amitrathiesh@webzler.com
- Website: [www.webzler.com](https://www.webzler.com)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🌟 Show Your Support

If this MCP server helped solve your LMStudio screenshot issues, give it a ⭐️!

---

**Built with ❤️ for the MCP and LMStudio community**
