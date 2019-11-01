import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList, Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons'

let { width, height } = Dimensions.get('window')

const RecipeDetailScreen = ({ navigation }) => {
  const [name, setName] = useState(navigation.getParam('name'))
  const [instructions, setInstructions] = useState('')
  const [rating, setRating] = useState(0)
  const [author, setAuthor] = useState('')
  const [prepTime, setPrepTime] = useState('')
  const [ingredients, setIngredients] = useState([])

  const getRecipeDetail = async () => {
    let result = await fetch(
      `https://postgres-recipe-api.herokuapp.com/recipes/${navigation.getParam(
        'name'
      )}`,
      {
        headers: {
          Authorization: `Bearer ${navigation.getParam('token')}`
        }
      }
    ).then(response => response.json())
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
    <ScrollView style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.info}>
          <View>
            <Text>
              <Feather name='thumbs-up' size={25} />
              {rating}
            </Text>
          </View>
          <View>
            <Text>
              <Feather name='clock' size={25} />
              {prepTime} min
            </Text>
          </View>
          <View>
            <Text style={styles.author}>by {author}</Text>
          </View>
        </View>
        <Text style={styles.instructions}>{instructions}</Text>
        <FlatList
          keyExtractor={item => item}
          data={ingredients}
          renderItem={({ item }) => {
            return <Text style={styles.ingredient}>{item}</Text>
          }}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  description: {
    margin: 20
  },
  title: {
    fontSize: width/12,
    fontWeight: 'bold',
    marginBottom: 20
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  info: {
    padding: 20,
    margin: 20,
    backgroundColor: '#4B77BE'
  },
  author: {
    marginTop: 20,
    fontSize: 20
  },
  instructions: {
    margin: 20,
    padding: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d6d7da',
    fontSize: 25
  },
  ingredient: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: 10,
    
    padding: 15,
    backgroundColor: '#22A7F0'
  }
})

export default RecipeDetailScreen
