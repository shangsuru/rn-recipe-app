import React, { useState, useEffect } from 'react'
import { ScrollView, Text, StyleSheet, FlatList } from 'react-native'
import RecipePreview from '../components/RecipePreview'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

const ResultsShowScreen = ({ navigation }) => {
  const category = navigation.getParam('category')
  const [page, setPage] = useState(navigation.getParam('page'))
  const [recipes, setRecipes] = useState([])

  const getRecipes = async () => {
    let results = await fetch(
      `https://postgres-recipe-api.herokuapp.com/recipes/category/${category}?page=${page}`
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
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Detail', { name: item.recipe_name })
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
