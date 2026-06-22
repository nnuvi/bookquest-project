import { Image, View, useColorScheme } from "react-native";

type LogoProps = {
  width?: number;
  variant?: "light" | "dark" | "auto";
};

export default function Logo({
  width = 180,
  variant = "light",
}: LogoProps) {
  // const scheme = useColorScheme();

  const source =
    variant === "dark"
      ? require("../../../assets/images/logo-dark.png")
      : require("../../../assets/images/logo-light.png");

  return (
    <View className="p-2 pb-2 items-center">
      <Image
        source={source}
        style={{
          width,
          height: width * (360 / 1920), // keeps your exact ratio
          resizeMode: "contain",
        }}
      />
    </View>
  );
}