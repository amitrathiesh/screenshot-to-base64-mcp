# How to Test and Publish Your Extension

## 🧪 Phase 1: Local Testing

You have successfully packaged your extension! Now let's test it.

### 1. Install the Extension
1. Open VSCode.
2. Go to the **Extensions View** (Sidebar > Extensions icon).
3. Click the **"..."** (Views and More Actions) menu in the top right of the Extensions pane.
4. Select **"Install from VSIX..."**.
5. Navigate to your project folder: `/Users/amitrathiesh/Projects/screenshot-fix`
6. Select `lmstudio-proxy-1.0.0.vsix`.

### 2. Verify It Works
1. **Check Status Bar**: You should see `$(radio-tower) Proxy: ON` (or OFF) in the bottom right status bar.
2. **Check Output**:
   - Run Command: `LMStudio Proxy: Show Proxy Logs`
   - You should see startup logs ("Proxy server running on: http://localhost:1235").
3. **Test KiloCode**:
   - Ensure KiloCode is configured to use `http://localhost:1235`.
   - Take a screenshot.
   - Watch the "LMStudio Proxy" output channel in VSCode. You should see "Successfully converted WebP -> PNG".

---

## 🚀 Phase 2: Publishing to Marketplace

Once you're happy with the testing, here is how to share it with the world.

### 1. Create a Publisher Account
You need a Microsoft account and an Azure DevOps organization.

1. Go to [marketplace.visualstudio.com/manage](https://marketplace.visualstudio.com/manage).
2. Sign in with your Microsoft account.
3. Click **"Create Publisher"**.
   - **Name**: `amitrathiesh` (Must match the `"publisher"` in your `package.json`).
   - **ID**: `amitrathiesh`.
   - **Display Name**: Amit Rathiesh.

### 2. Get a Personal Access Token (PAT)
1. Go to your Azure DevOps organization (dev.azure.com/YOUR_ORG).
2. Click **User Settings** (icon next to avatar) > **Personal Access Tokens**.
3. Create a **New Token**:
   - **Name**: "VSCode Marketplace".
   - **Organization**: "All accessible organizations".
   - **Scopes**: Select **"Marketplace"** -> **"Acquire"** and **"Manage"**.
4. **Copy the token!** You won't see it again.

### 3. Login with vsce
In your terminal, run:
```bash
npx vsce login amitrathiesh
# Paste your PAT when asked
```

### 4. Publish!
```bash
npx vsce publish
# Or to just update the README properly:
npx vsce publish -p <YOUR_PAT>
```

🎉 **Done!** Your extension will be live in a few minutes.
