# StudyMind UG — Windows Desktop App

This is a small **Electron wrapper**: a native Windows window that loads your
live site (`https://studymind.duckdns.org/`), with your icon, a proper app
name, taskbar entry, and a real Windows installer. It is *not* a copy of the
website — it always shows whatever is currently live on your server, so any
updates you push to the site show up automatically, no rebuild needed.

Important: your PHP/MySQL server still has to be running and reachable for
this app to work — it's a window pointed at your website, not the website
itself running locally.

## What's in this folder
- `main.js` — the app window and menu
- `preload.js` — empty on purpose (no extra APIs exposed to the page)
- `package.json` — app metadata + the Windows build config
- `build/icon.ico` — placeholder app icon generated from your `icon.svg`
  colors. Swap it for a sharper one anytime (see below).

## Build the .exe (one-time setup, then one command)

You'll need **Node.js** installed (get it free from nodejs.org — the LTS
version). Then, in this folder:

```bash
npm install
npm run dist
```

That downloads Electron + electron-builder (first run only, needs internet)
and produces an installer here:

```
dist/StudyMind UG Setup 1.0.0.exe
```

Double-click that file on any Windows machine to install StudyMind UG like a
normal app — Start Menu entry, desktop shortcut, uninstaller, all included.

You can build this on Windows, Mac, or Linux — electron-builder can target
Windows from any of them.

## No computer to build it on / don't want to install Node?

Two options:
1. **GitHub Actions (free, no install needed):** push this folder to a GitHub
   repo, add a workflow that runs `npm install && npm run dist` on a
   `windows-latest` runner, and download the `.exe` from the workflow's
   artifacts. I can write that workflow file for you if you want to go this
   route — just ask.
2. Ask a friend with Node.js installed to run the two commands above and send
   you the resulting `.exe`.

## Swapping in a sharper icon
Replace `build/icon.ico` with your own (must be a real multi-size `.ico`,
not just a renamed `.png`) — e.g. convert your `assets/icon.svg` at
https://icoconvert.com — then run `npm run dist` again.

## Changing the URL it points to
Edit the `APP_URL` constant at the top of `main.js`.
