# VSCode Auto-Start Setup

This directory contains VSCode configuration for automatically starting the proxy server.

## What It Does

When you open this project in VSCode, the proxy server automatically starts in the background.

## Files

- `tasks.json` - VSCode task configuration that runs `npm run proxy` on folder open

## Usage

1. Open this project in VSCode
2. The proxy automatically starts in a terminal panel
3. Configure your AI assistant (KiloCode, Cline, etc.) to use `http://localhost:1235`
4. When you close VSCode, the proxy stops automatically

## Manual Control

If the task doesn't auto-start, you can run it manually:
- `Cmd+Shift+P` → "Tasks: Run Task" → "Start LMStudio Proxy"

## Disabling Auto-Start

If you want to disable auto-start:
1. Open `.vscode/tasks.json`
2. Remove the `"runOptions"` section
3. The task will still be available but won't auto-run
