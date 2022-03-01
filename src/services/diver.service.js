import { doc, getFirestore, updateDoc, documentId, query, collection, where, getDocs, limitToLast, addDoc } from "firebase/firestore";
import { Diver } from "../models/diver.model";

const getDiverRef = (id) => doc(getFirestore(), "divers", id)
const getDiversRef = () => collection(getFirestore(), "divers")

const getDiver = async (uid) => {
    const q = query(getDiversRef(), where('uid', '==', uid), limitToLast())
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0]
        return new Diver(docSnap.id, docSnap.data().firstname, docSnap.data().lastname, docSnap.data().uid, docSnap.data().owner_id)
    }
    return null
}

const updateDiver = async (diverId, diverAttr) => updateDoc(getDiverRef(diverId), diverAttr)

const createDiver = (uid, diverAttr) => {
    diverAttr.owner_id = diverAttr.uid = uid
    return addDoc(getDiversRef(), diverAttr)
}

const getDiversById = async (ids) => {
    const q = query(getDiversRef(), where(documentId(), "in", ids))
    const querySnapshot = await getDocs(q)
    let divers = []
    querySnapshot.forEach((doc) => {
        divers.push(new Diver(doc.id, doc.data().firstname, doc.data().lastname, doc.data().uid, doc.data().owner_id))
    })

    return divers
}

export { getDiver, updateDiver, createDiver, getDiversById }