import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import LogoText from "@/components/common/LogoText";
import StatusBar from "@/components/common/StatusBar";

export default function Landing() {

  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-background px-6">
      <Text className="text-3xl font-bold text-primary mb-4">BookQuest</Text>

      <Text className="text-center text-gray-600 mb-10">
        Manage, borrow, and track your books easily.
      </Text>

      <StatusBar />

      <LogoText />

      <TouchableOpacity
        className="bg-button px-6 py-3 rounded-full w-full mb-3"
        onPress={() => router.push("/auth/login")}
      >
        <Text className="text-white text-center">Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="border border-primary px-6 py-3 rounded-full w-full"
        onPress={() => router.push("/auth/signup")}
      >
        <Text className="text-primary text-center">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
} 

// import React from "react";
// import { Text, TouchableOpacity, View } from "react-native";
// import { useRouter } from "expo-router";
// import { useFonts } from "expo-font";

// import LogoText from "@/src/components/common/LogoText";
// import StatusBar from "@/src/components/common/StatusBar";

// const Page = () => {
//   const router = useRouter();

//   const [fontsLoaded] = useFonts({
//     CustomFont: require("../assets/fonts/Retrograde.ttf"),
//   });

//   if (!fontsLoaded) return null;

//   return (
//     <View className="flex-1 justify-center items-center bg-background-light dark:bg-background-dark">
//       <StatusBar />

//       <LogoText />

//       <View className="w-4/5">
//         <TouchableOpacity
//           className="bg-button py-4 rounded-full my-2.5 items-center"
//           onPress={() => router.push("/auth/login")}
//         >
//           <Text className="text-black text-lg">Log In</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           className="bg-button py-4 rounded-full my-2.5 items-center"
//           onPress={() => router.push("/auth/signup")}
//         >
//           <Text className="text-black text-lg">Sign Up</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Page;
