import React, {useState} from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { signUp } from '../auth/auth';

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


const handleLogin = async () => {
    await signUp(email, password);
}

return (
    <View
    style={{
      flex: 1,
      justifyContent: 'center',
    }}>
      <Text>Login</Text>
      <TextInput
        placeholder="E-Mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Passwort"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Einloggen" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;