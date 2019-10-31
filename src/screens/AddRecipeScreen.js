import React, { useState, useEffect } from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  AsyncStorage,
  Dimensions 
} from 'react-native'
import jwt_decode from 'jwt-decode'
import RadioForm from 'react-native-simple-radio-button'
import { Feather } from '@expo/vector-icons'

let { width, height } = Dimensions.get('window')

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
      label: 'Breakfast',
      value: 'breakfast'
    },
    {
      label: 'Dinner',
      value: 'dinner'
    },
    {
      label: 'Desserts',
      value: 'desserts'
    },
    {
      label: 'Drinks',
      value: 'drinks'
    },
    {
      label: 'Snacks',
      value: 'snacks'
    },
    {
      label: 'Asian',
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
    <ScrollView style={styles.background}>
      <View style={styles.container} elevation={5}>
        <Text style={styles.steps}>
          1. How do you want to call your recipe?
        </Text>
        <TextInput
          style={styles.input}
          placeholder='Recipe Name'
          maxLength={20}
          onBlur={Keyboard.dismiss}
          onChangeText={text => setRecipeName(text)}
          value={recipeName}
        />

        <Text style={styles.steps}>2. What type of food is it?</Text>
        <RadioForm
          style={styles.radioButton}
          radio_props={categories}
          initial={0}
          onPress={value => setCategory(value)}
        />

        <Text style={styles.steps}>
          3. How many minutes does it take to prepare?
        </Text>
        <TextInput
          style={styles.input}
          placeholder='Prep Time'
          maxLength={3}
          onBlur={Keyboard.dismiss}
          onChangeText={text => setPrepTime(text)}
          value={prepTime}
          keyboardType='numeric'
        />

        <Text style={styles.steps}>
          4. What are the ingredients and how much?
        </Text>
        <View style={styles.ingredients}>
          <TextInput
            style={styles.ingredientInput}
            placeholder='Ingredients'
            maxLength={30}
            onBlur={Keyboard.dismiss}
            onChangeText={text => setIngredient(text)}
            value={ingredient}
          />
          <TouchableOpacity
            onPress={() => {
              if (ingredient.trim() !== '') {
                setIngredients([...ingredients, ingredient])
                setIngredient('')
              }
            }}
          >
            <Feather name='plus-square' size={65} style={styles.plus} />
          </TouchableOpacity>
        </View>

        <Text>{ingredients}</Text>

        <Text style={styles.steps}>
          5. What exactly are the steps one needs to follow?
        </Text>
        <TextInput
          style={styles.instructionsInput}
          placeholder='Instructions'
          multiline={true}
          numberOfLines={7}
          onChangeText={text => setInstructions(text)}
          value={instructions}
        />

        <Text style={styles.steps}>
          6. Can you provide an image of your dish?
        </Text>
        <TextInput
          style={styles.input}
          placeholder='Image Link'
          maxLength={150}
          onBlur={Keyboard.dismiss}
          onChangeText={text => setImage(text)}
          value={image}
        />

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
            setRecipeName('')
            setCategory('')
            setInstructions('')
            setPrepTime('')
            setIngredients([])
            setIngredient('')
          }}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#F7CA18',
    flex: 1
  },
  container: {
    margin: 40,
    backgroundColor: '#FFFFFF',
    padding: 30,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    shadowRadius: 8
  },
  steps: {
    fontSize: 20
  },
  radioButton: {
    margin: 20
  },
  ingredients: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  plus: {
    marginTop: 10,
    marginLeft: 10
  },
  input: {
    height: 60,
    width: width * 0.6,
    fontSize: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#AAAAAA',
    margin: 15,
    padding: 10,
    alignSelf: 'center'
  },
  instructionsInput: {
    height: 170,
    width: width * 0.6,
    fontSize: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#AAAAAA',
    margin: 15,
    padding: 10,
    alignSelf: 'center'
  },
  ingredientInput: {
    height: 60,
    width: width * 0.4,
    fontSize: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#AAAAAA',
    marginTop: 15,
    marginBottom: 15,
    padding: 10,
    alignSelf: 'center'
  },
  button: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 30,
    alignSelf: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  }
})

export default AddRecipeScreen
