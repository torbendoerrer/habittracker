import React, {useState} from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { signIn } from '../../services/authService';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


const handleLogin = async () => {
    await signIn(email, password);
}

return (
    <View
    style={styles.container}>
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
      <Button title="Registrieren" onPress={() => navigation.navigate('SignUp')}/>
    </View>
  );
};

export default LoginScreen;