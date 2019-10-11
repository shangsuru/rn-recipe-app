import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'

const RecipePreview = ({ recipe_name, recipe_img, rating, prep_time }) => {
  return (
    <View style={styles.container}>
      <Text>{recipe_name}</Text>
      <Image style={styles.image} source={{ uri: recipe_img }} />
      <Text>
        <Feather name='thumbs-up' />
        {rating}
      </Text>
      <Text>
        <Feather name='clock' />
        {prep_time}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 15
  },
  image: {
    width: 100,
    height: 100
  }
})

export default RecipePreview
