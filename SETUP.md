# Setup Guide for All MCP-Compatible Tools

This guide shows you how to install and configure the Screenshot-to-Base64 MCP server with **any MCP-compatible tool**.

## Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/amitrathiesh/screenshot-to-base64-mcp.git

# Navigate into the directory
cd screenshot-to-base64-mcp

# Install dependencies
npm install
```

**📝 Note the installation path** - you'll need it for configuration. Example: `/Users/yourname/screenshot-to-base64-mcp`

---

## Step 2: Configure Your MCP Client

The Model Context Protocol (MCP) is a universal standard. Configuration is similar across all tools - you just need to find where to add it!

### 🔧 For VSCode Extensions (KiloCode, Cline, Roo-Code, etc.)

**Configuration File Location:**
Check your extension's documentation for the exact location. Common paths:
- `~/.vscode/mcp_settings.json`
- `~/Library/Application Support/Code/User/mcp_settings.json`
- Extension-specific settings folder

**Configuration:**
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

**Example:**
```json
{
  "mcpServers": {
    "screenshot-to-base64": {
      "command": "node",
      "args": ["/Users/amit/screenshot-to-base64-mcp/index.js"]
    }
  }
}
```

**Then:**
- Reload VSCode: `Cmd+Shift+P` → "Developer: Reload Window"

---

### 🤖 For Claude Desktop

**Configuration File:** `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS)

**Add this:**
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

**Then:**
- Restart Claude Desktop

---

### 🌐 For Other MCP-Compatible Tools

The configuration format is the same! Just locate your tool's MCP settings file and add:

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

---

## Step 3: Verify Installation

Once configured and restarted, the `convert_image_to_base64` tool should be available in your MCP client.

**Quick Test:**
1. Get any image file (screenshot, photo, etc.)
2. Ask your AI assistant: *"Use the convert_image_to_base64 tool on /path/to/image.png"*
3. You should receive a base64 data URI starting with `data:image/...`

---

## 🎯 How It Works

**No Manual Server Management Needed!**

When you configure the MCP server:
1. Your MCP client (KiloCode, Cline, Claude Desktop, etc.) **automatically starts** the server when it launches
2. The server **runs in the background**, managed by your client
3. When you **use the tool**, your client communicates with the server
4. When you **close the client**, the server stops automatically

You never need to manually run `node index.js` - your MCP client handles everything!

---

## 🌍 Works Everywhere

✅ **Global Configuration** - Once set up, available in ALL projects and folders  
✅ **Any MCP Client** - Works with KiloCode, Cline, Roo-Code, Claude Desktop, Continue.dev, etc.  
✅ **Universal Standard** - MCP is an open protocol supported across tools

---

## 🔍 Troubleshooting

### Tool Not Available?

1. ✅ Verify the path to `index.js` is **absolute** and correct
2. ✅ Check JSON syntax is valid (use a JSON validator)
3. ✅ Ensure `npm install` completed successfully
4. ✅ Restart/reload your MCP client
5. ✅ Check your client's output/logs for errors

### Can't Find MCP Settings?

- **VSCode Extensions**: Check extension documentation or settings UI (`Cmd+,` → search "MCP")
- **Claude Desktop**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Other Tools**: Consult your tool's MCP configuration documentation

---

## 📚 Need More Help?

- Check the main [README.md](README.md) for detailed usage examples
- Open an issue on [GitHub](https://github.com/amitrathiesh/screenshot-to-base64-mcp)
- Consult your MCP client's documentation for tool-specific setup

---

**Once configured, you're all set! The tool will work across all your projects, in any folder, globally.** 🚀
