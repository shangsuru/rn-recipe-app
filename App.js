import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import SearchScreen from './src/screens/SearchScreen'
import ResultsShowScreen from './src/screens/ResultsShowScreen'
import AddRecipeScreen from './src/screens/AddRecipeScreen'
import RecipeDetailScreen from './src/screens/RecipeDetailScreen'
import FavoriteScreen from './src/screens/FavoriteScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import { Feather } from '@expo/vector-icons'

const stackNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    Results: ResultsShowScreen,
    Detail: RecipeDetailScreen
  },
  {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
      title: 'Recipe Search'
    }
  }
)

const bottomTabNavigator = createBottomTabNavigator(
  {
    Start: {
      screen: stackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Feather name='search' size={25} color={tintColor} />
        )
      }
    },
    Add: {
      screen: AddRecipeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Feather name='upload' size={25} color={tintColor} />
        )
      }
    },
    Favorite: {
      screen: FavoriteScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Feather name='heart' size={25} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Feather name='user' size={25} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: 'Start',
    tabBarOptions: {
      activeTintColor: '#eb6e3d'
    }
  }
)

export default createAppContainer(bottomTabNavigator)
