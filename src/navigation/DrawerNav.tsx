import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MainTabNavigator } from "./MainTab";
import { GroceryHost, BudgetHost, LoansHost, SettingsHost, ExpenseHost } from "./screenHosts";
import { colors } from "../theme/colors";

export const DrawerNavRoutes = ["Main", "Grocery", "Budget", "Loans", "Expense", "Settings"] as const;
export type DrawerNavRoute = (typeof DrawerNavRoutes)[number];

export type DrawerParamList = {
  Main: undefined;
  Grocery: undefined;
  Budget: undefined;
  Loans: undefined;
  Expense: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

/** React Navigation drawer — MainTab + secondary screens. */
export function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: colors.primaryDark,
        drawerActiveTintColor: colors.primary,
      }}
    >
      <Drawer.Screen name="Main" component={MainTabNavigator} options={{ title: "S4 Family" }} />
      <Drawer.Screen name="Grocery" component={GroceryHost} />
      <Drawer.Screen name="Budget" component={BudgetHost} />
      <Drawer.Screen name="Loans" component={LoansHost} />
      <Drawer.Screen name="Expense" component={ExpenseHost} />
      <Drawer.Screen name="Settings" component={SettingsHost} />
    </Drawer.Navigator>
  );
}

type DrawerListProps = {
  active?: string;
  onNavigate: (route: string) => void;
  labels?: Record<string, string>;
};

/** Compact drawer list (More / control center). */
export function DrawerNav({ active, onNavigate, labels = {} }: DrawerListProps) {
  const routes = ["grocery", "planner", "life", "family", "zakat", "alerts", "audit", "settings", "sync", "backup", "currency"];
  return (
    <View style={styles.wrap}>
      {routes.map((route) => (
        <Pressable
          key={route}
          style={[styles.item, active === route ? styles.active : null]}
          onPress={() => onNavigate(route)}
        >
          <Text style={[styles.label, active === route ? styles.activeLabel : null]}>
            {labels[route] || route}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 4 },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.border,
  },
  active: { backgroundColor: "#e7f6f1", borderColor: colors.primary },
  label: { color: colors.text, fontWeight: "600", textTransform: "capitalize" },
  activeLabel: { color: colors.primaryDark },
});
