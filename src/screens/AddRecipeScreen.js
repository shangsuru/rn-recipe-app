import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  AsyncStorage
} from 'react-native'
import jwt_decode from 'jwt-decode'
import { Dropdown } from 'react-native-material-dropdown'

const AddRecipeScreen = () => {
  const [token, setToken] = useState('')
  const [recipeName, setRecipeName] = useState('')
  const [instructions, setInstructions] = useState('')
  const [author, setAuthor] = useState('')
  const [prepTime, setPrepTime] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')

  const categories = [
    {
      value: 'breakfast'
    },
    {
      value: 'dinner'
    },
    {
      value: 'desserts'
    },
    {
      value: 'drinks'
    },
    {
      value: 'snacks'
    },
    {
      value: 'asian'
    }
  ]

  useEffect(() => {
    getToken()
  }, [])

  const getToken = async () => {
    let authToken = await AsyncStorage.getItem('token')
    setToken(authToken)
    const username = jwt_decode(authToken).username
    setAuthor(username)
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder='Recipe Name'
        maxLength={20}
        onBlur={Keyboard.dismiss}
        onChangeText={text => setRecipeName(text)}
        value={recipeName}
      />

      <Dropdown
        label='Category'
        data={categories}
        onChangeText={text => setCategory(text)}
      />

      <TextInput
        style={styles.textInput}
        placeholder='Instructions'
        multiline={true}
        numberOfLines={7}
        onChangeText={text => setInstructions(text)}
        value={instructions}
      />

      <TextInput
        style={styles.textInput}
        placeholder='Prep Time'
        maxLength={3}
        onBlur={Keyboard.dismiss}
        onChangeText={text => setPrepTime(text)}
        value={prepTime}
        keyboardType='numeric'
      />

      <TextInput
        style={styles.textInput}
        placeholder='Ingredients'
        maxLength={30}
        onBlur={Keyboard.dismiss}
        onChangeText={text => setIngredient(text)}
        value={ingredient}
      />

      <Text>{ingredients}</Text>

      <TextInput
        style={styles.textInput}
        placeholder='Image Link'
        maxLength={150}
        onBlur={Keyboard.dismiss}
        onChangeText={text => setImage(text)}
        value={image}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setIngredients([...ingredients, ingredient])
          setIngredient('')
        }}
      >
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await fetch('https://postgres-recipe-api.herokuapp.com/recipes', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              recipe_name: `${recipeName}`,
              instructions: `${instructions}`,
              author: `${author}`,
              prep_time: `${prepTime}`,
              ingredients: ingredients,
              category: `${category}`,
              recipe_img: `${image}`
            })
          })
          // clear text inputs
          setRecipeName("")
          setCategory("")
          setInstructions("")
          setPrepTime("")
          setIngredients([])
          setIngredient("")
        }}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  },
  button: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  }
})

export default AddRecipeScreen
