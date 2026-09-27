# Signing the ZineIt APK

## The short version

**A production APK needs a developer signing key, and that key has to be yours.**

I cannot generate it, should not generate it, and would be doing you real harm if I
tried. The signing key *is* the app's identity on Android. If it leaks, someone else can
ship an "update" to ZineIt that your users install without a warning. If you lose it,
you can never update your own app on the Play Store again — not with a support ticket,
not with a phone call. You would have to publish a new listing under a new package name
and abandon every install.

So: you make it, you keep it, nobody else ever touches it.

## Make the key

Once. Then never again.

```bash
keytool -genkey -v \
  -keystore zineit-release.jks \
  -keyalg RSA -keysize 4096 \
  -validity 10000 \
  -alias zineit
```

It will ask for a password and some identifying details (name, organisation —
"Storitellah" is fine, and it is not shown to users).

- **4096-bit RSA**, not the 2048 default. Costs nothing, lasts longer.
- **10000 days** validity (~27 years). Google requires the certificate to outlive
  1 October 2033; this clears that comfortably. A key that expires is a dead app.
- Use a real password from your password manager, not something you will retype.

## Look after it

- **Back it up in at least two places you control.** An encrypted archive in your
  password manager and an offline copy. Not a public repository. Not a shared Drive
  folder. Not an email to yourself.
- **Never commit it.** The repo's `.gitignore` already excludes `*.keystore`, `*.jks`
  and `keystore.properties`, but that only helps if you keep them at those names.
- If you use Play App Signing (recommended), Google holds the *app* signing key and you
  hold the *upload* key. Losing the upload key is recoverable via support; losing a
  self-managed app signing key is not. This is a good reason to opt in.

## Wire it into the build

Create `android/keystore.properties` — **untracked, never committed**:

```properties
storeFile=/absolute/path/to/zineit-release.jks
storePassword=…
keyAlias=zineit
keyPassword=…
```

Then in `android/app/build.gradle`, above `android {`:

```gradle
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

and inside `android { … }`:

```gradle
signingConfigs {
    release {
        if (keystorePropertiesFile.exists()) {
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
        }
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

I have deliberately **not** made this edit for you. It is the one place in the project
where a wrong default has consequences you cannot undo, and it should be made by the
person holding the key.

## Build it

```bash
npm run android:release
```

- `android/app/build/outputs/bundle/release/app-release.aab` — upload this to the Play
  Store. AAB is mandatory for new apps.
- `android/app/build/outputs/apk/release/app-release.apk` — for direct install and
  sideloading. This is the one to put on your own site or hand to someone directly.

## Check it really is signed

```bash
# Android build-tools
apksigner verify --print-certs android/app/build/outputs/apk/release/app-release.apk

# or
jarsigner -verify -verbose -certs android/app/build/outputs/apk/release/app-release.apk
```

You want to see your certificate and no warnings. If it says "jar is unsigned", the
signing config did not load — usually a wrong path in `keystore.properties`.

## Sideloading, since ZineIt may never go near the Play Store

ZineIt is a tool for a small number of photographers. You may well never list it. That
is fine — a signed APK on `storitellah.com` works, and people install it by enabling
"install unknown apps" for their browser. Tell them plainly that this is what they are
doing and why, and keep the SHA-256 fingerprint published next to the download so they
can check it:

```bash
apksigner verify --print-certs app-release.apk | grep SHA-256
```

## If you ever lose the key

There is no recovery. With Play App Signing you can reset an upload key through Google
support. Without it, the app is orphaned: new package name, new listing, and every
existing user has to uninstall and reinstall. Back it up today, not later.
