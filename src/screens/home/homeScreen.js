import React from "react";
import { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {View, Text, Button, FlatList, RefreshControl} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
    const navigation = useNavigation();

    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const userId = auth().currentUser?.uid;

    useEffect(() => {
      if (userId) {
        const unsubscribe = firestore()
          .collection('users')
          .doc(userId)
          .collection('habits')
          .orderBy('created', 'desc') // Optional: Nach Erstellungsdatum sortieren
          .onSnapshot(snapshot => {
            const fetchedHabits = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setHabits(fetchedHabits);
            setLoading(false);
            setRefreshing(false); // Beende den Refresh-Zustand, falls er aktiv war
          }, error => {
            console.error('Fehler beim Abrufen der Habits:', error);
            setLoading(false);
            setRefreshing(false);
          });
  
        // Unsubscribe vom Listener, wenn die Komponente unmountet wird
        return () => unsubscribe();
      } else {
        setLoading(false);
      }
    }, [userId]);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      // Der onSnapshot Listener wird automatisch erneut ausgelöst und die Daten aktualisiert.
      // Hier ist keine zusätzliche manuelle Anfrage notwendig.
    }, []);
  
    if (loading) {
      return <Text>Lade Habits...</Text>;
    }

    return (
        <View>
          <Text>Home</Text>
          <FlatList
        data={habits}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
          <Button title="Create Habit" onPress={() => navigation.navigate('CreateHabit')}/>
        </View>
      );
}

export default HomeScreen;