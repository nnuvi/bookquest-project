import React from 'react'
import { StyleSheet, View } from 'react-native'

function ListItemsSkeleton() {
  return (
    <View style={styles.container}>
     <View style={styles.item} />
     <View style={styles.item} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
  },
  item: {
     height: 50,
     width: 300,
     backgroundColor: 'rgba(0, 0, 0, 0.2)',
     flexDirection: 'row',
     alignItems: 'center',
     paddingVertical: 10,
     borderBottomWidth: 1,
     margin: 10,
  },    
})

export default ListItemsSkeleton
