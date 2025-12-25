# Proxy Server Setup Guide

This guide explains how to set up and use the LMStudio Proxy Server for automatic base64 image conversion.

## 🎯 What Does This Proxy Do?

The proxy server sits between your AI coding assistant (KiloCode, Cline, etc.) and LMStudio, **automatically converting** image file paths to base64 data URIs. This solves the `'url' field must be a base64 encoded image` error without any manual intervention.

```
AI Assistant → Proxy Server → LMStudio
                    ↓
            [Auto-converts images]
```

---

## 📥 Installation

### Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/amitrathiesh/screenshot-to-base64-mcp.git

# Navigate into the directory
cd screenshot-to-base64-mcp

# Install dependencies
npm install
```

---

## 🚀 Auto-Start in VSCode (Recommended)

The project includes a VSCode task that **automatically starts the proxy** when you open the folder!

### How It Works

1. **Open project in VSCode** - The proxy starts automatically in a terminal panel
2. **Configure your AI assistant** - Use `http://localhost:1235`
3. **Close VSCode** - The proxy stops automatically

### Manual Control

If needed, you can manually control the task:
- **Start**: `Cmd+Shift+P` → "Tasks: Run Task" → "Start LMStudio Proxy"
- **Stop**: Close the terminal panel or VSCode

> **Note**: This works for VSCode extensions (KiloCode, Cline, Roo-Code). Claude Desktop users need to start the proxy manually.

---

## 🚀 Running the Proxy Server (Manual)

### Option 1: Using npm script (Recommended)

```bash
npm run proxy
```

### Option 2: Using the startup script

```bash
./start-proxy.sh
```

### Option 3: With debug logging

```bash
npm run proxy:debug
```

### Option 4: Custom configuration

```bash
# Set custom ports and URLs
PROXY_PORT=8080 LMSTUDIO_URL=http://localhost:5678 npm run proxy
```

---

## ⚙️ Configuration

### Default Settings

- **Proxy Port**: `1235`
- **LMStudio URL**: `http://localhost:1234`
- **Debug Mode**: `false`

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PROXY_PORT` | `1235` | Port for the proxy server |
| `LMSTUDIO_URL` | `http://localhost:1234` | LMStudio API endpoint |
| `DEBUG` | `false` | Enable debug logging |

---

## 🔧 Configure Your AI Assistant

Once the proxy is running, configure your AI assistant to use the proxy URL instead of LMStudio directly.

### For KiloCode

1. Open KiloCode settings (gear icon in the panel)
2. Select "LM Studio" as API Provider
3. **Change Base URL from:**
   ```
   http://localhost:1234
   ```
   **To:**
   ```
   http://localhost:1235
   ```
4. Save settings

### For Cline

1. Open Cline settings
2. Find LMStudio configuration
3. Update the base URL to `http://localhost:1235`

### For Other Extensions

Update the LMStudio/OpenAI-compatible endpoint URL to use port `1235` instead of `1234`.

---

## 🎮 How It Works

### Automatic Workflow

1. **Your AI assistant** takes a screenshot automatically
   - Screenshot saved to: `/tmp/screenshot_12345.png`

2. **AI assistant** creates a request and sends to proxy:
   ```json
   {
     "messages": [{
       "role": "user",
       "content": [{
         "type": "image_url",
         "image_url": {
           "url": "/tmp/screenshot_12345.png"
         }
       }]
     }]
   }
   ```

3. **Proxy detects** the file path and converts to base64:
   ```json
   {
     "messages": [{
       "role": "user",
       "content": [{
         "type": "image_url",
         "image_url": {
           "url": "data:image/png;base64,iVBORw0KG..."
         }
       }]
     }]
   }
   ```

4. **Proxy forwards** modified request to LMStudio on `localhost:1234`

5. **LMStudio processes** the base64 image successfully ✅

6. **Response** flows back through proxy to your AI assistant

---

## ✅ Verification

### Test the Proxy

1. **Start LMStudio** on port 1234 with a vision model loaded
2. **Start the proxy** on port 1235:
   ```bash
   npm run proxy:debug
   ```
3. **Configure your AI assistant** to use port 1235
4. **Test with a screenshot** - ask your assistant to analyze a webpage
5. **Check proxy logs** - you should see conversion happening
6. **Verify success** - no base64 error from LMStudio!

---

## 🐛 Troubleshooting

### Proxy won't start

**Error**: Port already in use
```bash
# Check what's using port 1235
lsof -i :1235

# Use a different port
PROXY_PORT=1236 npm run proxy
```

### Images not converting

1. **Enable debug mode**: `npm run proxy:debug`
2. **Check logs** for conversion attempts
3. **Verify file paths** are absolute
4. **Ensure image format** is supported (PNG, JPEG, GIF, WebP, BMP, SVG)

### AI assistant still has errors

1. **Verify configuration** - ensure AI assistant uses `http://localhost:1235`
2. **Restart AI assistant** after changing configuration
3. **Check LMStudio** is running on port 1234
4. **Test proxy directly** with curl:
   ```bash
   curl http://localhost:1235/v1/models
   ```

---

## 🎯 Benefits Over MCP Approach

| Feature | MCP Server | Proxy Server |
|---------|-----------|--------------|
| **User intervention** | Required | None ✅ |
| **Works automatically** | ❌ No | ✅ Yes |
| **Setup complexity** | Medium | Low |
| **Works with all assistants** | ✅ Yes | ✅ Yes |
| **Requires code changes** | ❌ No | ❌ No |

---

## 🔒 Security Notes

- The proxy runs **locally** on your machine
- Only accessible from `localhost` by default
- No data sent to external servers
- All processing happens locally

---

## 📝 Advanced Usage

### Run as Background Service

**Using nohup:**
```bash
nohup npm run proxy > proxy.log 2>&1 &
```

**Using PM2:**
```bash
npm install -g pm2
pm2 start proxy.js --name lmstudio-proxy
pm2 save
pm2 startup
```

### Multiple LMStudio Instances

Run multiple proxies for different LMStudio instances:
```bash
# Terminal 1
PROXY_PORT=1235 LMSTUDIO_URL=http://localhost:1234 npm run proxy

# Terminal 2
PROXY_PORT=1236 LMSTUDIO_URL=http://localhost:5678 npm run proxy
```

---

## 🆘 Need Help?

- Check the main [README.md](README.md)
- Open an issue on [GitHub](https://github.com/amitrathiesh/screenshot-to-base64-mcp)
- Enable debug mode to see detailed logs

---

**Once running, the proxy works transparently - no manual intervention needed!** 🎉
