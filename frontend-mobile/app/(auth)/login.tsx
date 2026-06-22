import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Colors } from "@/constants/Colors";
import { retroFont } from "@/utils/fontAdd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";
import Button from "@/components/ui/Button";
import LogoText from "@/components/common/LogoText";
import ErrorMessageModal from "@/components/common/ErrorMessageModal";
import { getUser } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

const Page = () => {
  const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isErrorVisible, setErrorVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  console.log("Current Form Data:", formData);
  const router = useRouter();
  const setUser = useAuthStore((s) => s.login);

  const login = async (username: string, password: string) => {
    try {
      console.log("fdata", { username, password });
      const res = await api.post("/auth/login", { username, password });
      console.log("res data", res.data);
      console.log("status", res.status);
      if (res.status === 200 && res.data) {
        const user = await getUser();
        setUser(user);
        router.replace("../home");
      } else {
        console.log("Invalid username or password");
      }
    } catch (error: any) {
      setErrorVisible(true);
      setErrorMessage("Invalid username or password");
      console.error("Error during login:", error);
    }
  };

  const handleLogin = () => {
    const trimmedUsername = formData.username.trim();
    const trimmedPassword = formData.password.trim();
    console.log(trimmedUsername, trimmedPassword);

    if (!trimmedUsername || !trimmedPassword) {
      alert("Username and password are required.");
      return;
    }
    console.log("Submitting Data:", {
      username: trimmedUsername,
      password: trimmedPassword,
    });

    login(trimmedUsername, trimmedPassword);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        style="auto"
        translucent={true}
        backgroundColor="transparent"
      />
      <LogoText />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          placeholderTextColor={Colors.primary}
          style={styles.input}
          onChangeText={(text) =>
            setFormData((prevState) => ({
              ...prevState,
              username: text,
            }))
          }
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={Colors.primary}
          secureTextEntry
          style={styles.input}
          onChangeText={(text) =>
            setFormData((prevState) => ({
              ...prevState,
              password: text,
            }))
          }
        />
      </View>

      <Button title="Login" onPress={handleLogin}></Button>
      {isErrorVisible && (
        <ErrorMessageModal
          visible={isErrorVisible}
          onClose={() => setErrorVisible(false)}
          message={errorMessage}
        />
      )}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  text: {
    fontSize: 50,
    color: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 55,
    color: Colors.primary,
    fontFamily: "CustomFont",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "#F1F1F1",
    textAlign: "center",
    fontSize: 18,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    width: "80%",
    backgroundColor: Colors.button,
    paddingVertical: 12,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
  },
  space: {
    height: 33,
  },
});
