import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import SearchScreen from './src/screens/SearchScreen'
import ResultsShowScreen from './src/screens/ResultsShowScreen'
import AddRecipeScreen from './src/screens/AddRecipeScreen'
import RecipeDetailScreen from './src/screens/RecipeDetailScreen'

const navigator = createStackNavigator(
  {
    Search: SearchScreen,
    Results: ResultsShowScreen,
    Add: AddRecipeScreen,
    Detail: RecipeDetailScreen
  },
  {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
      title: 'Recipe Search'
    }
  }
)

export default createAppContainer(navigator)
