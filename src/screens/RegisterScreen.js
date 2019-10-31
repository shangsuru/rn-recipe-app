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
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
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

        <TouchableOpacity style={styles.button} onPress={() => signup()}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFA400',
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

export default RegisterScreen
