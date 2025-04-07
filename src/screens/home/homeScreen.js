import React from "react";
import { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {NestableDraggableFlatList, NestableScrollContainer} from "react-native-draggable-flatlist";
import {View, Text, Button, FlatList} from "react-native";
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
          .orderBy('order') 
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

    const updateHabitOrder = async (data) => {
      const newOrder = data.map(habit => habit.id);
      setHabits(data); 
      // data ist ein Array mit den Habit-Objekten in der neuen Reihenfolge
      const batch = firestore().batch();
  
      data.forEach((habit, index) => {
        const habitRef = firestore()
          .collection('users')
          .doc(userId)
          .collection('habits')
          .doc(habit.id);
        batch.update(habitRef, { order: index });
      });
  
      await batch.commit();
    };

    const renderItem = ({ item, drag, isActive }) => (
      <View style={{ backgroundColor: isActive ? 'lightgray' : 'white', padding: 16 }}>
        <Text onLongPress={drag}>{item.name}</Text>
      </View>
    );
  
    if (loading) {
      return <Text>Lade Habits...</Text>;
    }

    return (
      <NestableScrollContainer>
        
          <NestableDraggableFlatList
          data={habits}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onDragEnd={({ data }) => { // Aktualisiere den lokalen State
          updateHabitOrder(data); // Aktualisiere die Reihenfolge in Firestore
        }}
      />
          <Button title="Create Habit" onPress={() => navigation.navigate('CreateHabit')}/>
        
        </NestableScrollContainer>
      );
}

export default HomeScreen;