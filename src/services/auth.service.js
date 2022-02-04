import { onAuthStateChanged, getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            unsubscribe();
            resolve(user);
        }, reject);
    })
}

const signIn = (email, password) => {
    return signInWithEmailAndPassword(getAuth(), email, password) 
}

export { getCurrentUser, signIn }