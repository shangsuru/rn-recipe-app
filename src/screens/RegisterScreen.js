import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from 'react-native'

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const signup = async () => {
    const rawResponse = await fetch(
      'https://postgres-recipe-api.herokuapp.com/users/signup',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: `${username}`,
          password: `${password}`
        })
      }
    ).then(response => response)
    if (rawResponse.status === 201) {
      const response = await rawResponse.json()
      const token = response['token']
      AsyncStorage.setItem('token', token)
      navigation.navigate('App')
    } else {
      setMessage('Username already taken')
    }
  }

  return (
    <View>
      <Text style={{ marginTop: 50, fontSize: 25 }}>RegisterScreen</Text>
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

      <TouchableOpacity style={styles.button} onPress={() => signup()}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>

      <Text>{message}</Text>
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

export default RegisterScreen
