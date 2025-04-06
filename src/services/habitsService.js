import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const createHabit = async (name, category, duration) => {
    try {
        const currentUser = auth().currentUser;

        if (currentUser) {
            const userId = currentUser.uid;

            const habitsCollectionRef = firestore().collection('users').doc(userId).collection('habits');

            const newHabit = {
                name: name,
                created: firestore.FieldValue.serverTimestamp(),
                category: category,
                duration: parseInt(duration, 10)
            };

            await habitsCollectionRef.add(newHabit);

            console.log('Neues Habit erfolgreich erstellt.');
    } else {
      console.warn('Kein Benutzer aktuell authentifiziert.');
      // Hier könntest du eine Fehlermeldung anzeigen oder eine andere Aktion ausführen
      throw new Error('Kein Benutzer aktuell authentifiziert.');
    }
  } catch (error) {
    console.error('Fehler beim Erstellen des Habits:', error);
    throw error; // Wirf den Fehler weiter, damit der Aufrufer ihn behandeln kann
  }
};

