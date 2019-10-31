import React, { useState, useEffect } from 'react'
import { ScrollView, View, StyleSheet, FlatList } from 'react-native'
import RecipePreview from '../components/RecipePreview'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import jwt_decode from 'jwt-decode'

const ResultsShowScreen = ({ navigation }) => {
  const category = navigation.getParam('category')
  const [page, setPage] = useState(navigation.getParam('page'))
  const [recipes, setRecipes] = useState([])
  const [token, setToken] = useState(navigation.getParam('token'))

  const getRecipes = async () => {
    let results = await fetch(
      `https://postgres-recipe-api.herokuapp.com/recipes/category/${category}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(response => response.json())
    setRecipes(results)
  }

  useEffect(() => {
    getRecipes()
  }, [page])

  return (
    <ScrollView>
      <FlatList
        keyExtractor={item => item.recipe_name}
        data={recipes}
        renderItem={({ item }) => {
          return (
            <RecipePreview
              navigation={navigation}
              token={token}
              recipe_name={item.recipe_name}
              recipe_img={item.recipe_img}
              rating={item.rating}
              prep_time={item.prep_time}
              username={jwt_decode(token).username}
            />
          )
        }}
      />
      <TouchableOpacity onPress={() => setPage(page === 1 ? 1 : page - 1)}>
        <Feather name='chevron-left' size={60} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setPage(page + 1)}>
        <Feather name='chevron-right' size={60} />
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})

export default ResultsShowScreen
