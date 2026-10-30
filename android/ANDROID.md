# Android APK (Trusted Web Activity) — readiness notes, batch 66

The game is a PWA (manifest, icons incl. maskable, service worker, fullscreen landscape), so the APK is a thin
Trusted Web Activity shell built with Google's Bubblewrap from `twa-manifest.json`.

1. Install: `npm i -g @bubblewrap/cli` (needs JDK 17 + Android SDK; Bubblewrap can download both).
2. `cd android && bubblewrap init --manifest https://jreffrobinson12b-dev.github.io/salt-and-shot/manifest.webmanifest`
   (or `bubblewrap build` using the twa-manifest.json here). Creates/uses `android.keystore` — keep it private, never commit it.
3. `bubblewrap fingerprint list` → copy the SHA-256 into `assetlinks.template.json`, save it as
   `/.well-known/assetlinks.json` at the ORIGIN root (https://jreffrobinson12b-dev.github.io/.well-known/assetlinks.json,
   i.e. the user-site repo, not this project repo). Without it the app shows a browser URL bar.
4. `bubblewrap build` → `app-release-signed.apk` (sideload for beta) and `.aab` (Play Store).
5. Check on a phone: opens fullscreen, landscape, no URL bar, Back opens the pause menu, works offline after first run.

Not done yet (needs the user's decision/keys): signing key, publishing assetlinks.json, Play Console listing.

## Signing key (Jeff's step — not created by the bot)
The bot does not create or hold a signing key. When you are ready:
1. `bubblewrap init --manifest https://jreffrobinson12b-dev.github.io/salt-and-shot/manifest.webmanifest` (it offers to create a key; keep the keystore and passwords private).
2. `bubblewrap build` produces app-release-signed.apk and .aab.
3. `keytool -list -v -keystore <your.keystore>` gives the SHA-256 fingerprint; put it in assetlinks.template.json, save as `.well-known/assetlinks.json` on the site.
Version for this build: 0.67.0 (code 67).
