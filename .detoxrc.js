/**
 * Detox E2E scaffold — run on native builds (not Expo Go).
 * Install: npm i -D detox jest-circus
 * Then: detox build / detox test
 */
const gradleExecutable = process.platform === "win32" ? "gradlew.bat" : "./gradlew";

module.exports = {
  testRunner: "jest",
  runnerConfig: "e2e/config.json",
  specs: ["e2e"],
  apps: {
    "android.debug": {
      type: "android.apk",
      binaryPath: "android/app/build/outputs/apk/debug/app-debug.apk",
      build: `cd android && ${gradleExecutable} assembleDebug assembleAndroidTest -DtestBuildType=debug`,
    },
  },
  devices: {
    emulator: {
      type: "android.emulator",
      device: { avdName: process.env.DETOX_AVD || "S4_API36" },
    },
  },
  configurations: {
    "android.emu.debug": {
      device: "emulator",
      app: "android.debug",
    },
  },
};
