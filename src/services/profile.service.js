import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { Profile } from "../models/profile.model";

const getDocRef = (uid) => doc(getFirestore(), "profiles", uid)

const getProfile = async (uid) => {
    const docSnap = await getDoc(getDocRef(uid));
    if (docSnap.exists()) {
        return new Profile(docSnap.data().firstname, docSnap.data().lastname)
    }
    return null
}

const updateProfile = async (uid, profileAttr) => {
    return updateDoc(getDocRef(uid), profileAttr)
}

export { getProfile, updateProfile }