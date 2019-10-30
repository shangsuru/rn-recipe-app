import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

const RecipePreview = ({
  recipe_name,
  recipe_img,
  rating,
  prep_time,
  navigation,
  token
}) => {
  return (
    <View style={styles.container}>
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
        <TouchableOpacity>
          <Text style={styles.feature}>
            <Feather name='thumbs-up' size={30} />
            {rating}
          </Text>
        </TouchableOpacity>
        <Text style={styles.feature}>
          <Feather name='clock' size={30} />
          {prep_time} min
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d6d7da'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15
  },
  feature: {
    fontSize: 25,
    margin: 10
  },
  image: {
    width: 200,
    height: 150,
    marginRight: 15
  }
})

export default RecipePreview
