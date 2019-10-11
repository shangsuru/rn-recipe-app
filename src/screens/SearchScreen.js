import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import SearchBar from '../components/SearchBar'
import SearchTile from '../components/SearchTile'

const SearchScreen = ({ navigation }) => {
  const [term, setTerm] = useState('')

  searchTileInfo = [
    {
      text: 'Breakfast',
      image: require('../images/breakfast.jpg')
    },
    {
      text: 'Dinner',
      image: require('../images/dinner.jpg')
    },
    {
      text: 'Desserts',
      image: require('../images/desserts.jpg')
    },
    {
      text: 'Drinks',
      image: require('../images/drinks.jpg')
    },
    {
      text: 'Snacks',
      image: require('../images/snacks.jpg')
    },
    {
      text: 'Add',
      image: require('../images/add.png')
    }
  ]

  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() =>
          navigation.navigate('Results', {
            category: term
          })
        }
      />
      <FlatList
        keyExtractor={item => item.text}
        data={searchTileInfo}
        renderItem={({ item }) => {
          return (
            <SearchTile
              text={item.text}
              image={item.image}
              navigation={navigation}
            />
          )
        }}
        numColumns={2}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default SearchScreen
