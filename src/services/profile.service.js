import { doc, getDoc, getFirestore, setDoc, updateDoc, documentId, query, collection, where, getDocs } from "firebase/firestore";
import { Profile } from "../models/profile.model";

const getDocRef = (uid) => doc(getFirestore(), "profiles", uid)

const getProfile = async (uid) => {
    const docSnap = await getDoc(getDocRef(uid));
    if (docSnap.exists()) {
        return new Profile(docSnap.id, docSnap.data().firstname, docSnap.data().lastname)
    }
    return null
}

const updateProfile = async (uid, profileAttr) => {
    return updateDoc(getDocRef(uid), profileAttr)
}

const createProfile = (uid, profileAttr) => setDoc(getDocRef(uid), profileAttr)

const getProfilesById = async (ids) => {
    const q = query(collection(getFirestore(), "profiles"), where(documentId(), "in", ids))
    const querySnapshot = await getDocs(q)
    let profiles = []
    querySnapshot.forEach((doc) => {
        profiles.push(new Profile(doc.id, doc.data().firstname, doc.data().lastname))
    })

    return profiles
}

export { getProfile, updateProfile, createProfile, getProfilesById }