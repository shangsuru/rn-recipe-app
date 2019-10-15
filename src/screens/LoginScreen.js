import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View>
      <Text style={{ marginTop: 50, fontSize: 25 }}>LoginScreen</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder='Email'
        autoCorrect={false}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder='Password'
        autoCorrect={false}
        secureTextEntry={true}
      />
      <Button title='Login' onPress={() => navigation.navigate('App')} />
      <Button
        title='Create account'
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default LoginScreen
