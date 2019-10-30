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
    <View>
      <Text style={{ marginTop: 50, fontSize: 25 }}>LoginScreen</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setUsername(text)}
        value={username}
        placeholder='Username'
        autoCorrect={false}
        autoCapitalize='none'
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder='Password'
        autoCorrect={false}
        secureTextEntry={true}
      />
      <Text>{message}</Text>

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
  )
}

const styles = StyleSheet.create({
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

export default LoginScreen
