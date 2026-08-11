import { RootNavigator } from "../navigation/RootNavigator";

/** Expo route that mounts the full React Navigation tree (AuthStack + Drawer + MainTab). */
export default function RnNavRoute() {
  return <RootNavigator />;
}
