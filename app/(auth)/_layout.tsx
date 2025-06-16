import { Stack, usePathname, useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function AuthLayout() {
  const router = useRouter();
  const pathname = usePathname();

  const hideBackArrowOn = ["/quizify"];
  const showBackArrow = !hideBackArrowOn.includes(pathname);

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        animation: "fade",
        headerTitleAlign: "center",
        headerLeft: () =>
          showBackArrow ? (
            <TouchableOpacity
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.replace("/quizify");
                }
              }}
              style={{ paddingHorizontal: 10 }}
            >
              <Text style={{ fontSize: 18 }}>←</Text>
            </TouchableOpacity>
          ) : undefined,
      }}
    />
  );
}
