import React from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Dimensions
} from 'react-native'
let { width, height } = Dimensions.get('window')

const SearchTile = ({ text, image, navigation, token }) => {
  return (
    <View style={{ marginHorizontal: 10 }}>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Results', {
            category: text.toLowerCase(),
            page: 1,
            token: token
          })
        }}
      >
        <Image style={styles.image} source={image}></Image>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: width * 0.45,
    height: height * 0.2
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default SearchTile
