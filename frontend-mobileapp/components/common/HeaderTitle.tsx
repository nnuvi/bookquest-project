import React from "react";
import { Text, StyleSheet, TextStyle, View} from 'react-native';
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
//import { SafeAreaView } from "react-native";

type HeaderTextProps = {
     text: string;
     backgroundColor?: string;
     color?: string;
     fontSize?: number;
}

export const HeaderText = ({ text, color = Colors.background, fontSize = 26} : HeaderTextProps) => {
     const style: TextStyle = {color, fontSize}

     return(
          <SafeAreaView style={styles.container}>
               <Text style={[styles.headerText, style]}>{text}</Text>
          </SafeAreaView>
     );
}

const styles = StyleSheet.create({
     container: {
          backgroundColor: Colors.choco,
          padding: 20,
          paddingTop: 10,
          paddingBottom: 0,
          paddingHorizontal: null,
        },
        headerText: {
          fontWeight: 'bold',
          textAlign: 'left',
          marginBottom: 10,
        },    
});
 
//export default HeaderText;