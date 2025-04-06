import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import styles from "./style";
import { createHabit } from "../../services/habitsService";

const CreateHabitScreen = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Arbeit');
  const [duration, setDuration] = useState('');
  const categories = ["Arbeit", "Entspannung & Meditation", "Freizeit", "Sport", "Alltag"];
  

  const handleCreateHabit = async () => {
    try {
      await createHabit(name, category, parseInt(duration, 10));
      setName('');
      setCategory('');
      setDuration('')
    } catch (error) {
      Alert.alert('Fehler', error.message);
    }
  }

    return (
        <View
        style={styles.container}>
          <TextInput placeholder="Name des Habits" value={name} onChangeText={setName} />
          {categories.map((cat) => (
        <Button
          key={cat}
          title={cat}
          onPress={() => setCategory(cat)}
          disabled={category === cat}
        />
      ))}
        <TextInput
        placeholder="Dauer in Minuten"
        value={duration}
        onChangeText={setDuration}
        keyboardType="number-pad"
      />
      <Button title="Habit erstellen" onPress={handleCreateHabit}/>   
    </View>
      );

}

export default CreateHabitScreen;