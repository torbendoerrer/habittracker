import firestore from '@react-native-firebase/firestore';

export const createUser = async (userId, username) => {
    await firestore().collection('users').doc(userId).set({
        username: username || ''
    })
}
