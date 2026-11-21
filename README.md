# TikTok MOD

An independent short-video social app prototype built with Expo + React Native. The interface uses a neutral Liquid Glass style (no purple accents), with editable profile details and appearance settings saved locally on the device.

## Try it on a phone (development)

1. Install **Expo Go** from the App Store (iPhone) or Google Play (Android).
2. On a computer, clone this repository and run:

```bash
npm install
npx expo start
```

3. Scan the QR code with the iPhone Camera app or Expo Go on Android. The phone and computer should be on the same Wi-Fi network.

## Build installable apps with EAS

Install and sign in to EAS:

```bash
npm install
npx eas-cli@latest login
npx eas-cli@latest build:configure
```

- **Android APK for direct installation:**

```bash
npx eas-cli@latest build --platform android --profile preview
```

  When the build finishes, open the build link on the Android phone and install the APK. Android may ask to allow installation from that browser.

- **iPhone:** create an App Store/TestFlight build:

```bash
npx eas-cli@latest build --platform ios --profile production
```

  This requires an Apple Developer account. After the build, submit it to App Store Connect with:

```bash
npx eas-cli@latest submit --platform ios --profile production
```

  Then install it through TestFlight after Apple processing. iOS does not allow installing an arbitrary APK; an iOS build is required.

## Current prototype

- Full-screen vertical demo feed with local like/follow interactions
- Navigation: Home, Friends, Create, Inbox, Profile
- Profile name, username and bio editor
- Font choices and bottom navigation styles
- Liquid Glass controls: opacity, blur, corner radius, icon size and labels
- Profile and appearance preferences saved locally with AsyncStorage

The feed currently uses sample content and remote placeholder images. Authentication, real video upload/hosting, messaging, server-side social features and official TikTok integrations are not implemented yet.

## Important integration note

This is an independent app, not a modified TikTok binary. TikTok private APIs, internal recommendations and native direct messages are not assumed to be available. Any TikTok account connection must use official APIs and their permitted scopes.
