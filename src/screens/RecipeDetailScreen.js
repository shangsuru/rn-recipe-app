import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons'

const RecipeDetailScreen = ({ navigation }) => {
  const [name, setName] = useState(navigation.getParam('name'))
  const [image, setImage] = useState(null)
  const [instructions, setInstructions] = useState('')
  const [rating, setRating] = useState(0)
  const [author, setAuthor] = useState('')
  const [prepTime, setPrepTime] = useState('')
  const [ingredients, setIngredients] = useState([])

  const getRecipeDetail = async () => {
    let result = await fetch(
      `https://postgres-recipe-api.herokuapp.com/recipes/${navigation.getParam(
        'name'
      )}`
    ).then(response => response.json())
    setImage(result.recipe_img)
    setInstructions(result.instructions)
    setRating(result.rating)
    setAuthor(result.author)
    setPrepTime(result.prep_time)
    setIngredients(result.ingredients)
  }

  useEffect(() => {
    getRecipeDetail()
  }, [])

  return (
    <View>
      <Text>{name}</Text>
      <Text>{image}</Text>
      <Image style={styles.image} source={{ uri: image }} />
      <Text>
        <Feather name='thumbs-up' />
        {rating}
      </Text>
      <Text>
        <Feather name='clock' />
        {prepTime}
      </Text>
      <Text>{author}</Text>
      <Text>{instructions}</Text>
      <FlatList
        keyExtractor={item => item}
        data={ingredients}
        renderItem={({ item }) => {
          return <Text>{item}</Text>
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100
  }
})

export default RecipeDetailScreen
