import React from "react";
import { Text, StyleSheet, TextStyle, View, TouchableOpacity} from 'react-native';
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type HeaderTextProps = {
     text: string;
     backgroundColor?: string;
     color?: string;
     fontSize?: number;
     threeDotsVisible?: boolean;
     onPress?: () => void;
}

export const HeaderTitle = ({ 
     text, 
     color = Colors.background, 
     fontSize = 26, 
     threeDotsVisible= false, 
     onPress
} : HeaderTextProps) => {
     const style: TextStyle = {color, fontSize}

     return(
          <SafeAreaView style={styles.container}>
               <View style={styles.subcontainer}>
               <Text style={[styles.headerText, style]}>{text}</Text>
               {threeDotsVisible && (
                    <TouchableOpacity onPress={onPress}>
                      <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                    </TouchableOpacity>
               )}
               </View>
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
        subcontainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }  
});
 