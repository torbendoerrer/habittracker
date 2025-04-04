import auth from '@react-native-firebase/auth';

export const signUp = async (email, password) => {
    auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
}

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