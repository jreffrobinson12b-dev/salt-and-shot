# Android APK — readiness notes, batch 93

Salt & Shot is a PWA (manifest, icons including maskable, service worker, fullscreen landscape). There are two ways to put it on a phone. Neither path is finished until Jeff adds a signing key — the bot does not create or hold one. Target remains a private-beta Android app at batch 100.

Version scheme: `versionName` is `0.N.0` and `versionCode` is `N`, where N is the batch (0.93.0 / 93 for this build). Keep TWA and the bundled APK in step after every publish.

## 1. Trusted Web Activity (live page)

The thin shell is built with Google's Bubblewrap from `twa-manifest.json` in the published repo (`/workspace/salt-and-shot/android/`).

1. Install: `npm i -g @bubblewrap/cli` (needs JDK 17 + Android SDK; Bubblewrap can download both).
2. `cd android && bubblewrap init --manifest https://jreffrobinson12b-dev.github.io/salt-and-shot/manifest.webmanifest`
   (or `bubblewrap build` using the `twa-manifest.json` here). It may offer to create `android.keystore` — keep that private, never commit it, never create a new key in this repo.
3. `bubblewrap fingerprint list` → copy the SHA-256 into `assetlinks.template.json`, save it as
   `/.well-known/assetlinks.json` at the ORIGIN root (https://jreffrobinson12b-dev.github.io/.well-known/assetlinks.json,
   i.e. the user-site repo, not this project repo). Without it the app shows a browser URL bar.
4. `bubblewrap build` → `app-release-signed.apk` (sideload for beta) and `.aab` (Play Store).
5. Check on a phone: opens fullscreen, landscape, no URL bar, Back opens Pause, works offline after first run.

`appVersionName` / `appVersionCode` in `twa-manifest.json` should match the batch (0.93.0 / 93 for this build).

## 2. Bundled WebView APK (`pirates3d/android`)

This project wraps a local copy of the game (`app/src/main/assets/salt-and-shot.html`) in a WebView. It does not need the live site after install.

After each game build:

    cp salt-and-shot.html android/app/src/main/assets/salt-and-shot.html

Keep `app/build.gradle` `versionName` / `versionCode` in step with the batch (0.93.0 / 93). From batch 87, the system Back button opens Pause and does not leave the voyage; onPause saves and opens Pause.

Do not create a new signing key here. If you already have a keystore, keep it private and out of git. The bot never prints keystore values and never runs `git add -A` in this folder.

## Not done yet (Jeff's steps)

- Signing key (create once, keep private).
- Publish `assetlinks.json` at the origin root.
- A Play Console internal test track, aimed around batches 95–100.

The HTML, service worker, and version numbers are kept current each batch. Signing and Play remain Jeff's.
