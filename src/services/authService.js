import auth from '@react-native-firebase/auth';
import { createUser } from './userService';

export const signUp = async (email, password, username) => {
  try {

  const authResult = await auth().createUserWithEmailAndPassword(email, password);

  if (authResult && authResult.user) {
    const userId = authResult.user.uid;

    await createUser(userId, username);
  
    console.log(`Benutzer mit ID: ${userId} erfolgreich erstellt.`);
  } else {
    console.warn('Benutzererstellung in Auth fehlgeschlagen oder kein Benutzerobjekt erhalten.');
    return null;
  }
  } catch (error) {
    console.error('Fehler beim Erstellen des Benutzers:', error);
    throw error; // Wirf den Fehler weiter, damit der Aufrufer ihn behandeln kann
  }
};

export const signIn = async (email, password) => {
  auth().signInWithEmailAndPassword(email, password).then(() => {
    console.log('User signed In');
  })
  .catch(error => {
    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
}

export const signOut = () => {
  auth().signOut().then(() => console.log('User signed out!'));
}