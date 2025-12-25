# KiloCode MCP Server Configuration Guide

## Installation & Setup

### Step 1: Clone the Repository

```bash
# Clone the repository to your desired location
git clone https://github.com/amitrathiesh/screenshot-to-base64-mcp.git

# Navigate into the directory
cd screenshot-to-base64-mcp

# Install dependencies
npm install
```

**Note the installation path** - you'll need it for the configuration! For example:
- `/Users/yourusername/screenshot-to-base64-mcp`

### Step 2: Locate Your KiloCode MCP Settings File

KiloCode typically stores MCP configuration in one of these locations:

**Option A**: VSCode User Settings
- Path: `~/.vscode/mcp_settings.json`
- Or: `~/Library/Application Support/Code/User/mcp_settings.json`

**Option B**: Extension-specific settings
- Check KiloCode extension documentation for exact path
- Usually in VSCode settings under "KiloCode" section

### Step 3: Add the MCP Server Configuration

Add this to your MCP settings file (use the **absolute path** where you cloned the repo):

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

**Example**:
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

**Important**: If the file already has other MCP servers, just add this entry inside the `mcpServers` object.

### Step 4: Reload VSCode

- Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
- Type: "Developer: Reload Window"
- Hit Enter

### Step 5: Verify Installation

Once reloaded, you should see the `convert_image_to_base64` tool available in KiloCode across ALL your projects.

## Testing the MCP Server

### Quick Test

1. **Get any image file** (screenshot, photo, etc.)
2. **Ask KiloCode**: "Use the convert_image_to_base64 tool on [path-to-image]"
3. **Expected result**: Base64 data URI starting with `data:image/...`

### Example Test

```
Please convert this screenshot to base64:
/Users/username/Desktop/screenshot.png
```

KiloCode will use the MCP tool and return the base64 data URI.

## Why It Works Everywhere

✅ **Global Configuration** - MCP servers are configured at the VSCode/extension level, NOT per-project

✅ **Available in All Folders** - Works in any workspace, any project, any folder

✅ **Persistent** - Once configured, it's always available

## Troubleshooting

### Tool Not Showing Up?

1. Check the MCP settings file exists and has correct JSON syntax
2. Ensure the path to `index.js` is absolute and correct
3. Reload VSCode window
4. Check KiloCode extension output for errors

### Need to Find MCP Settings Location?

Ask in VSCode:
- Open Command Palette: `Cmd+Shift+P`
- Search for "KiloCode Settings" or "MCP Settings"
- Or check extension documentation

## Alternative: If You Can't Find Settings File

You can also configure via VSCode settings UI:
1. Open Settings (`Cmd+,`)
2. Search for "MCP" or "KiloCode"
3. Add the server configuration there

---

**Once configured, the tool will be available globally across all your VSCode projects!**
