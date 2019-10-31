import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, FlatList, AsyncStorage } from 'react-native'
import RecipePreview from '../components/RecipePreview'
import { TouchableOpacity } from 'react-native-gesture-handler'

const FavoriteScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([])
  const [token, setToken] = useState('')

  useEffect(() => {
    getRecipes()
  }, [])

  const getRecipes = async () => {
    let authToken = await AsyncStorage.getItem('token')
    setToken(authToken)
    let results = await fetch(
      'https://postgres-recipe-api.herokuapp.com/users/favorites',
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    ).then(response => response.json())
    setRecipes(results)
  }

  return (
    <ScrollView style={styles.background}>
      <FlatList
        keyExtractor={item => item.recipe_name}
        data={recipes}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Detail', {
                  name: item.recipe_name,
                  token: token
                })
              }
            >
              <RecipePreview
                recipe_name={item.recipe_name}
                recipe_img={item.recipe_img}
                rating={item.rating}
                prep_time={item.prep_time}
              />
            </TouchableOpacity>
          )
        }}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
   
  }
})

export default FavoriteScreen
