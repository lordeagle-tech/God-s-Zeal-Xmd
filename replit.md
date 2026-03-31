# Godszeal XMD - WhatsApp Bot

## Overview
A multi-device WhatsApp bot built with Node.js using the `@whiskeysockets/baileys` library. Supports group management, automation, entertainment, and utility commands.

## Architecture
- **Entry point**: `index.js` — initializes the WhatsApp connection and sets up event listeners
- **Message handler**: `main.js` — routes incoming messages to the appropriate command handlers
- **Commands**: `commands/` — individual JS files for each bot command (100+ commands)
- **Utilities**: `lib/` — helper modules (exif handling, media functions, anti-link, etc.)
- **Data**: `data/` — JSON files for persistent state (bans, warnings, message counts, etc.)
- **Session**: `session/` — WhatsApp authentication credentials (multi-file auth state)
- **Assets**: `assets/` — media files used by the bot

## Configuration
- `settings.js` — bot settings (name, owner, feature toggles), reads from environment variables
- `config.js` — external API keys and endpoints
- `.env.example` — template for required environment variables

## Key Dependencies
- `@whiskeysockets/baileys` — WhatsApp Web API (requires Node.js 20+)
- `fluent-ffmpeg` — media processing (requires system `ffmpeg`)
- `sharp`, `jimp` — image manipulation
- `ytdl-core`, `yt-search` — YouTube utilities
- `axios`, `node-fetch` — HTTP requests
- `pino` — logging

## System Dependencies
- `ffmpeg` — required for media/sticker processing

## Runtime
- Node.js 20 (required by baileys v7)
- Start command: `npm start`

## Authentication
The bot uses pairing code authentication. On first run, it prompts for a WhatsApp phone number and generates a pairing code to link the device via WhatsApp Settings > Linked Devices.

Session credentials are stored in the `session/` directory using baileys' multi-file auth state.

## Environment Variables
See `.env.example` for all supported variables:
- `OWNER_NUMBER` — bot owner's WhatsApp number
- `OWNER_NAME` — display name for owner
- `BOT_NAME` — bot display name
- `COMMAND_MODE` — `public` or `private`
- `AUTO_STATUS_REACT` — auto-react to status updates
- `AUTO_TYPING`, `AUTO_RECORDING` — presence indicators
- `GIPHY_API_KEY` — for GIF commands
