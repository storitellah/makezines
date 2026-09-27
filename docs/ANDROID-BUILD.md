# Building the ZineIt Android app

## Read this first

**I could not compile the APK for you, and I am not going to hand you a file that
pretends otherwise.**

Building an Android package needs the Android SDK, the Gradle distribution, and
Google's Maven repository. The environment ZineIt was built in has Java but no Android
SDK, and its network allowlist does not include `dl.google.com`, `maven.google.com` or
`services.gradle.org` — all three return HTTP 403. I ran `./gradlew assembleDebug` to
be sure: the Gradle wrapper cannot even download Gradle itself.

So what is in this repository is the **complete Android Studio project** — a real
Capacitor 6 project, branded, configured, with the manifest locked down. Everything
except the final compile, which takes about ten minutes on your machine and which you
have to run yourself anyway to sign it.

## What you need

| Thing | Version | Notes |
|---|---|---|
| Node.js | 18+ | for the Capacitor CLI |
| JDK | 17 | Android Gradle Plugin 8 requires 17 |
| Android Studio | Hedgehog (2023.1.1) or newer | brings the SDK and command-line tools |
| Android SDK | Platform 34, Build-Tools 34 | Android Studio installs these on first run |

The project targets **SDK 34**, compiles against **34**, and runs back to **SDK 22**
(Android 5.1) — which covers essentially every phone still in use in Nairobi.

## The build

```bash
git clone https://github.com/storitellah/zineit.git
cd zineit
npm install                 # Capacitor CLI + Android platform

npm run android:debug       # → android/app/build/outputs/apk/debug/app-debug.apk
```

`android:debug` copies `index.html` and the PWA files into `www/`, runs `npx cap sync
android`, then `./gradlew assembleDebug`. First run downloads Gradle and the Android
dependencies, so give it a few minutes and a decent connection.

Install it on a phone over USB:

```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

Or open the project in Android Studio and press Run:

```bash
npm run android:open
```

### Release build

```bash
npm run android:release
# → android/app/build/outputs/apk/release/app-release-unsigned.apk
# → android/app/build/outputs/bundle/release/app-release.aab   (for Play Store)
```

Unsigned. See [`APK-SIGNING.md`](APK-SIGNING.md) — a release build needs **your**
signing key, and only you should ever hold it.

### After changing `index.html`

```bash
npm run android:sync        # re-copies the app into the project
```

The Android app is a WebView wrapper around the same `index.html` you open in a browser.
There is no second codebase and no separate mobile build. Fix a bug once, it is fixed
everywhere.

## What is configured

| Setting | Value |
|---|---|
| Package name | `com.storitellah.zineit` |
| App name | ZineIt |
| Icon | Yellow Z on Ink Black; adaptive icon (ink background, yellow foreground) at every density |
| Splash | Ink Black `#1A1A1A` |
| Scheme | `https` (`allowMixedContent: false`) |
| Web assets | `www/`, synced from the repo root |

## Permissions — and what ZineIt deliberately does not ask for

The manifest requests exactly one permission:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

That is all. It is there because Capacitor's WebView bridge needs it. **ZineIt does not
ask for photo library access**, because it does not need it: photos come in through the
system file picker, which hands the app one file at a time with the user's explicit tap.
The app never enumerates your gallery.

Not requested, per the brief and because none of it is needed:

- Contacts
- Call logs
- Microphone
- Location
- Background services
- `READ_MEDIA_IMAGES` / `READ_EXTERNAL_STORAGE`

If you add a feature that genuinely needs one of these, add it then, and say so in the
listing. Not before.

## Privacy

The Android app is the same local-first tool as the web build. Photographs are decoded
in the WebView, stored in IndexedDB inside the app's private sandbox, and never
uploaded. There is no analytics, no crash reporter, no network call at all. If the
device is in aeroplane mode, everything still works.

## Testing on real hardware — please actually do this

The whole app is verified by an automated suite (153 tests), but jsdom has no fonts, no
GPU, no touchscreen, no notch and no printer. Before you trust the APK with a real
project, on a real phone and a real tablet:

- Import a dozen photos, including a HEIC from an iPhone if you have one
- Pinch-zoom and drag a photo inside its frame
- Rotate the device mid-edit
- Check the toolbar is reachable with a thumb
- Apply a template, undo it, redo it
- Export a 300 DPI JPG and open it
- Turn off the network and confirm nothing breaks

Anything that fails there is a real bug. Anything that passes here but fails there was
never really tested — jsdom lies about layout by omission.
