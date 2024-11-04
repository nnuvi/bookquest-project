import { StyleSheet, Text, View, BackHandler } from 'react-native'
import React, { useEffect } from 'react'

const Page = () => {
     const handleBackPress = () => {
          BackHandler.exitApp();
          return true;
     }
     useEffect(() => {
          const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress);
          return () => backHandler.remove();
     }, []);


  return (
    <View>
      <Text>Page</Text>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})