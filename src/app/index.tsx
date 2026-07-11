import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function HomeScreen() {
  const [isSplashDone, setIsSplashDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [email, setEmail] = useState("tamim@s4family.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          clearInterval(timer);

          setTimeout(() => {
            setIsSplashDone(true);
          }, 650);

          return 100;
        }

        return current + 4;
      });
    }, 70);

    return () => clearInterval(timer);
  }, []);

  function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Login Required", "Email and password লিখে Continue চাপো।");
      return;
    }

    Alert.alert(
      "Phase 1E Preview",
      "Login UI ready. Next phase-এ backend API connect করা হবে."
    );
  }

  function handleOfflineMode() {
    Alert.alert(
      "Offline Mode",
      "Offline-first mobile mode ready. Next phase-এ local SQLite storage connect করা হবে."
    );
  }

  if (!isSplashDone) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" backgroundColor="#06130f" />

        <View style={styles.splashPage}>
          <View style={styles.splashLogo}>
            <Text style={styles.splashLogoText}>S4</Text>
          </View>

          <Text style={styles.splashTitle}>S4 FAMILY FINANCE</Text>
          <Text style={styles.splashSubTitle}>
            Offline-first family finance system
          </Text>

          <View style={styles.splashLoadingTrack}>
            <View style={[styles.splashLoadingFill, { width: `${progress}%` }]} />
          </View>

          <Text style={styles.splashLoadingText}>Loading {progress}%</Text>

          <Text style={styles.splashFooter}>
            React Native / Expo • FastAPI • PostgreSQL • SQLite Sync
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#06130f" />

      <KeyboardAvoidingView
        style={styles.keyboardPage}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.page}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.topBar}>
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>S4</Text>
            </View>

            <View style={styles.topTextWrap}>
              <Text style={styles.statusText}>Offline Ready</Text>
              <Text style={styles.statusSubText}>Sync when internet returns</Text>
            </View>
          </View>

          <View style={styles.heroCard}>
            <Text style={styles.kicker}>WELCOME BACK</Text>
            <Text style={styles.title}>S4 FAMILY{"\n"}FINANCE</Text>
            <Text style={styles.subtitle}>
              Login to manage family accounts, wallets, transactions, reports
              and audit — even when internet is unavailable.
            </Text>

            <View style={styles.systemRow}>
              <View style={styles.systemPill}>
                <Text style={styles.systemPillText}>100% Offline First</Text>
              </View>
              <View style={styles.systemPill}>
                <Text style={styles.systemPillText}>Secure Login</Text>
              </View>
            </View>
          </View>

          <View style={styles.loginCard}>
            <Text style={styles.loginTitle}>Login</Text>
            <Text style={styles.loginSubTitle}>
              Use your family finance account to continue.
            </Text>

            <Text style={styles.label}>Email / Username</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="tamim@s4family.com"
              placeholderTextColor="#7c8f87"
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordRow}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                placeholderTextColor="#7c8f87"
                secureTextEntry={!showPassword}
                style={styles.passwordInput}
              />

              <Pressable
                onPress={() => setShowPassword((current) => !current)}
                style={styles.eyeButton}
              >
                <Text style={styles.eyeButtonText}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </Pressable>
            </View>

            <Pressable onPress={handleLogin} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Continue</Text>
            </Pressable>

            <Pressable onPress={handleOfflineMode} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Use Offline Mode</Text>
            </Pressable>

            <Pressable
              onPress={() =>
                Alert.alert(
                  "Forgot Password",
                  "Next phase-এ forgot password backend flow connect করা হবে."
                )
              }
            >
              <Text style={styles.forgotText}>Forgot password?</Text>
            </Pressable>
          </View>

          <View style={styles.featureGrid}>
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>💰</Text>
              <Text style={styles.featureTitle}>Accounts</Text>
              <Text style={styles.featureText}>Wallet and balance overview</Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>📴</Text>
              <Text style={styles.featureTitle}>Offline</Text>
              <Text style={styles.featureText}>Works without internet</Text>
            </View>
          </View>

          <Text style={styles.footerText}>
            Phase 1E Preview • API + SQLite sync coming next
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#06130f",
  },
  keyboardPage: {
    flex: 1,
    backgroundColor: "#06130f",
  },
  page: {
    flex: 1,
    backgroundColor: "#06130f",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 18 : 12,
    paddingBottom: 34,
  },

  splashPage: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: Platform.OS === "android" ? 48 : 30,
    paddingBottom: 30,
    backgroundColor: "#06130f",
    alignItems: "center",
    justifyContent: "center",
  },
  splashLogo: {
    width: 104,
    height: 104,
    borderRadius: 32,
    backgroundColor: "#f6c65b",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#f6c65b",
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 12,
    marginBottom: 24,
  },
  splashLogoText: {
    fontSize: 38,
    fontWeight: "900",
    color: "#06130f",
    letterSpacing: 1,
  },
  splashTitle: {
    color: "#ffffff",
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  splashSubTitle: {
    color: "#a8bbb2",
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  splashLoadingTrack: {
    width: "100%",
    height: 12,
    borderRadius: 99,
    backgroundColor: "#17362c",
    overflow: "hidden",
  },
  splashLoadingFill: {
    height: "100%",
    borderRadius: 99,
    backgroundColor: "#f6c65b",
  },
  splashLoadingText: {
    color: "#f6c65b",
    fontSize: 16,
    fontWeight: "900",
    marginTop: 14,
  },
  splashFooter: {
    color: "#6f867c",
    textAlign: "center",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 52,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  logoBox: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: "#f6c65b",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#f6c65b",
    shadowOpacity: 0.32,
    shadowRadius: 16,
    elevation: 8,
  },
  logoText: {
    fontSize: 25,
    fontWeight: "900",
    color: "#07140f",
    letterSpacing: 1,
  },
  topTextWrap: {
    flex: 1,
  },
  statusText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "900",
  },
  statusSubText: {
    color: "#a8bbb2",
    fontSize: 14,
    marginTop: 4,
  },

  heroCard: {
    borderRadius: 30,
    padding: 24,
    backgroundColor: "#0c211a",
    borderWidth: 1,
    borderColor: "#1d3b31",
    marginBottom: 18,
  },
  kicker: {
    color: "#f6c65b",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 2.8,
    marginBottom: 12,
  },
  title: {
    color: "#ffffff",
    fontSize: 39,
    lineHeight: 45,
    fontWeight: "900",
    letterSpacing: -1,
  },
  subtitle: {
    color: "#b8c9c1",
    fontSize: 15,
    lineHeight: 23,
    marginTop: 14,
  },
  systemRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 22,
  },
  systemPill: {
    borderRadius: 99,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#17362c",
    borderWidth: 1,
    borderColor: "#234a3d",
  },
  systemPillText: {
    color: "#f6c65b",
    fontSize: 12,
    fontWeight: "900",
  },

  loginCard: {
    borderRadius: 30,
    padding: 22,
    backgroundColor: "#ffffff",
    marginBottom: 18,
  },
  loginTitle: {
    color: "#06130f",
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 6,
  },
  loginSubTitle: {
    color: "#5c6e66",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  label: {
    color: "#06130f",
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 8,
  },
  input: {
    height: 54,
    borderRadius: 18,
    backgroundColor: "#eef4f1",
    borderWidth: 1,
    borderColor: "#d9e5df",
    paddingHorizontal: 16,
    color: "#06130f",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 14,
  },
  passwordRow: {
    height: 54,
    borderRadius: 18,
    backgroundColor: "#eef4f1",
    borderWidth: 1,
    borderColor: "#d9e5df",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 16,
    color: "#06130f",
    fontSize: 15,
    fontWeight: "700",
  },
  eyeButton: {
    height: 42,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "#06130f",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  eyeButtonText: {
    color: "#f6c65b",
    fontSize: 12,
    fontWeight: "900",
  },
  primaryButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#06130f",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  primaryButtonText: {
    color: "#f6c65b",
    fontSize: 16,
    fontWeight: "900",
  },
  secondaryButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#eef4f1",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#06130f",
    fontSize: 16,
    fontWeight: "900",
  },
  forgotText: {
    color: "#52645d",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 16,
  },

  featureGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  featureCard: {
    flex: 1,
    minHeight: 120,
    borderRadius: 24,
    padding: 16,
    backgroundColor: "#0a1a15",
    borderWidth: 1,
    borderColor: "#17362c",
  },
  featureIcon: {
    fontSize: 26,
    marginBottom: 10,
  },
  featureTitle: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 6,
  },
  featureText: {
    color: "#9fb3aa",
    fontSize: 12,
    lineHeight: 17,
  },
  footerText: {
    color: "#6f867c",
    textAlign: "center",
    fontSize: 12,
    marginTop: 16,
  },
});