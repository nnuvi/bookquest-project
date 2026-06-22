import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { api } from "@/utils/api";
import Toast from "react-native-toast-message";
import LogoText from "@/components/common/LogoText";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import DropdownModal from "@/components/common/DropdownModal";
import StatusBar from "@/components/common/StatusBar";

type Book = {
  _id: string;
  title: string;
  image: string;
};

type User = {
  _id: string | null;
  username: string | null;
};

const HomeScreen = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const getBookCollection = async () => {
    try {
      const res = await api.get("/books/myBooks");
      const data: Book[] = res.data.bookCollection;

      if (data) setBooks(data);
      else setBooks([]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBookCollection();
  }, []);

  const handleOptionActions = (option: string) => {
    if (option === "Log out") {
      api.post("/auth/logout");
      router.replace("/");
    }
  };

  const renderBookItem = ({ item }: { item: Book }) => (
    <TouchableOpacity
      className="w-[45%] m-2 bg-white rounded-lg p-3 items-center"
      onPress={() =>
        router.push({
          pathname: "/books/bookDetails/[bookId]",
          params: { bookId: item._id },
        })
      }
    >
      <Image
        source={{ uri: item.image }}
        className="w-25 h-35 mb-2 bg-gray-200 rounded"
      />
      <Text className="text-sm font-semibold text-[#3B2719] text-center">
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const options = ["Option 1", "Option 2", "Option 3", "Log out"];

  return (
    <View className="flex-1">
      <StatusBar />

      {/* Header */}
      <View className="px-5 pt-3 pb-2" style={{ backgroundColor: Colors.primary }}>
        <View className="flex-row justify-between items-center">
          <LogoText />

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <DropdownModal
          visible={modalVisible}
          options={options}
          top={60}
          onSelect={handleOptionActions}
          onClose={() => setModalVisible(false)}
        />
      </View>

      {/* Book List */}
      <FlatList
        data={books}
        numColumns={2}
        keyExtractor={(item) => item._id}
        renderItem={renderBookItem}
        contentContainerClassName="p-4"
        ListEmptyComponent={
          <Text className="text-center mt-5 text-gray-500">
            No books available.
          </Text>
        }
      />
    </View>
  );
};

export default HomeScreen;