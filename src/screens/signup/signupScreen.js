import React, {useState} from "react";
import styles from "./styles";
import { View, Text, TextInput, Button } from 'react-native';
import { signUp } from "../../auth/auth";

const SignupScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");


    const handleSignup = async () => {
        await signUp(email, password);
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
        <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            />
      <Button title="Registrieren" onPress={handleSignup} />
    </View>
  );
};

export default SignupScreen;