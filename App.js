import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import SearchScreen from './src/screens/SearchScreen'
import ResultsShowScreen from './src/screens/ResultsShowScreen'
import AddRecipeScreen from './src/screens/AddRecipeScreen'
import RecipeDetailScreen from './src/screens/RecipeDetailScreen'
import FavoriteScreen from './src/screens/FavoriteScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import { Feather } from '@expo/vector-icons'
import LoginScreen from './src/screens/LoginScreen'
import RegisterScreen from './src/screens/RegisterScreen'

const searchStackNavigator = createStackNavigator(
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

const favoriteStackNavigator = createStackNavigator(
  {
    Favorite: FavoriteScreen,
    Results: ResultsShowScreen,
    Detail: RecipeDetailScreen
  },
  {
    initialRouteName: 'Favorite',
    defaultNavigationOptions: {
      title: 'Your favorite Recipes'
    }
  }
)

const profileStackNavigator = createStackNavigator(
  {
    Profile: ProfileScreen,
    Results: ResultsShowScreen,
    Detail: RecipeDetailScreen
  },
  {
    initialRouteName: 'Profile',
    defaultNavigationOptions: {
      title: 'Profile'
    }
  }
)

const bottomTabNavigator = createBottomTabNavigator(
  {
    Start: {
      screen: searchStackNavigator,
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
      screen: favoriteStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Feather name='heart' size={25} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: profileStackNavigator,
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

const switchNavigator = createSwitchNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    App: bottomTabNavigator
  },
  {
    initialRouteName: 'Login'
  }
)

export default createAppContainer(switchNavigator)
