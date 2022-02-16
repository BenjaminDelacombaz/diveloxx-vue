import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Profile } from "../models/profile.model";

const getProfile = async (uid) => {
    const docRef = doc(getFirestore(), "profiles", uid)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return new Profile(docSnap.data().firstname, docSnap.data().lastname)
    }
    return null
}

export { getProfile }