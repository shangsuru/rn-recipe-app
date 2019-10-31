import React, { useState } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons'

let { width, height } = Dimensions.get('window')

const RecipePreview = ({
  recipe_name,
  recipe_img,
  rating,
  prep_time,
  navigation,
  token,
  username
}) => {
  const [buttonPressed, setButtonPressed] = useState(false)
  const [likes, setLikes] = useState(rating)

  return (
    <View style={styles.container} elevation={5}>
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Detail', {
              name: recipe_name,
              token: token
            })
          }
        >
          <Image style={styles.image} source={{ uri: recipe_img }} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title}>{recipe_name}</Text>
        <TouchableOpacity
          onPress={() => {
            if (!buttonPressed) {
              setLikes(likes + 1)
              setButtonPressed(true)
              fetch(
                `https://postgres-recipe-api.herokuapp.com/recipes/${recipe_name}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  method: 'patch',
                  body: JSON.stringify({
                    amount: 1
                  })
                }
              ).then(
                fetch(
                  'https://postgres-recipe-api.herokuapp.com/users/favorites',
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      Accept: 'application/json',
                      'Content-Type': 'application/json'
                    },
                    method: 'post',
                    body: JSON.stringify({
                      username: username,
                      recipe: recipe_name
                    })
                  }
                )
              )
            } else {
              setButtonPressed(false)
              fetch(
                'https://postgres-recipe-api.herokuapp.com/users/favorites',
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  method: 'delete',
                  body: JSON.stringify({
                    username: username,
                    recipe: recipe_name
                  })
                }
              )
              if (likes > 0) {
                setLikes(likes - 1)
                fetch(
                  `https://postgres-recipe-api.herokuapp.com/recipes/${recipe_name}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      Accept: 'application/json',
                      'Content-Type': 'application/json'
                    },
                    method: 'patch',
                    body: JSON.stringify({
                      amount: -1
                    })
                  }
                )
              } else {
                setLikes(0)
              }
            }
          }}
        >
          <Text style={styles.feature}>
            <Feather
              name='thumbs-up'
              size={width/30}
              color={buttonPressed ? 'orange' : 'black'}
            />
            {likes}
          </Text>
        </TouchableOpacity>
        <Text style={styles.feature}>
          <Feather name='clock' size={width/30} />
          {prep_time} min
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 20,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    shadowRadius: 4
  },
  title: {
    fontSize: width / 25,
    fontWeight: 'bold',
    marginBottom: 10
  },
  feature: {
    fontSize: width / 25,
    margin: 7
  },
  image: {
    width: width * 0.3,//200,
    height: height * 0.15,//150,
    marginRight: 15
  }
})

export default RecipePreview
