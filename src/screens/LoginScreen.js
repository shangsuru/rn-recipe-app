import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from 'react-native'
import jwt_decode from 'jwt-decode'

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    ifTokenAvailableLogin()
  }, [])

  const ifTokenAvailableLogin = async () => {
    const token = await AsyncStorage.getItem('token')
    const exp = jwt_decode(token).exp
    if (exp !== null && Date.now() < exp * 1000) {
      navigation.navigate('App')
    }
  }

  const userLogin = async () => {
    try {
      const loginData = await fetch(
        'https://postgres-recipe-api.herokuapp.com/users/login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: `${username}`,
            userpassword: `${password}`
          })
        }
      ).then(response => response.json())
      const token = loginData['token']
      await AsyncStorage.setItem('token', token)
      navigation.navigate('App')
    } catch (e) {
      console.log(e)
      setMessage('Login failed')
    }
  }

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setUsername(text)}
          value={username}
          placeholder='Username'
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setPassword(text)}
          value={password}
          placeholder='Password'
          autoCorrect={false}
          secureTextEntry={true}
        />
        <Text style={styles.message}>{message}</Text>

        <TouchableOpacity style={styles.button} onPress={() => userLogin()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#F7CA18',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    shadowRadius: 8
  },
  title: {
    marginTop: 35,
    marginBottom: 35,
    fontSize: 70,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    height: 60,
    width: 350,
    fontSize: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#AAAAAA',
    margin: 15,
    padding: 10
  },
  button: {
    width: 200,
    backgroundColor: '#22A7F0',
    padding: 10,
    margin: 10,
    alignSelf: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 25,
    textAlign: 'center'
  },
  message: {
    color: 'red',
    textAlign: 'center',
    margin: 10
  }
})

export default LoginScreen
