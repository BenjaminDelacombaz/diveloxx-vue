import { doc, getFirestore, updateDoc, documentId, query, collection, where, getDocs, limitToLast, addDoc, deleteDoc } from "firebase/firestore";
import { Diver } from "../models/diver.model";

const getDiverRef = (id) => doc(getFirestore(), "divers", id)
const getDiversRef = () => collection(getFirestore(), "divers")

const getDiver = async (uid) => {
    const q = query(getDiversRef(), where('uid', '==', uid), limitToLast())
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0]
        return new Diver(docSnap.id, docSnap.data().firstname, docSnap.data().lastname, docSnap.data().diver_id, docSnap.data().uid)
    }
    return null
}

const updateDiver = async (diverId, diverAttr) => updateDoc(getDiverRef(diverId), diverAttr)

const createDiver = (diverAttr, diverId, uid) => {
    diverAttr.diver_id = diverId
    diverAttr.uid = uid
    return addDoc(getDiversRef(), diverAttr)
}

const getDiversById = async (ids) => {
    const q = query(getDiversRef(), where(documentId(), "in", ids))
    const querySnapshot = await getDocs(q)
    let divers = []
    querySnapshot.forEach((doc) => {
        divers.push(new Diver(doc.id, doc.data().firstname, doc.data().lastname, doc.data().diver_id, doc.data().uid))
    })

    return divers
}

const getDiversByUid = async (uids) => {
    const q = query(getDiversRef(), where('uid', "in", uids))
    const querySnapshot = await getDocs(q)
    let divers = []
    querySnapshot.forEach((doc) => {
        divers.push(new Diver(doc.id, doc.data().firstname, doc.data().lastname, doc.data().diver_id, doc.data().uid))
    })

    return divers
}

const getDivers = async () => {
    const querySnapshot = await getDocs(getDiversRef())
    let divers = []
    let diverIds = []
    let diverUids = []
    let diversToAdd = []
    querySnapshot.forEach((doc) => {
        let diver = new Diver(
            doc.id,
            doc.data().firstname,
            doc.data().lastname,
            doc.data().diver_id,
            doc.data().uid,
        )
        divers.push(diver)

        if (diver.diver_id && !diverIds.includes(diver.diver_id)) diverIds.push(diver.diver_id)
        if (diver.uid && !diverUids.includes(diver.uid)) diverUids.push(diver.uid)
    })
    let promiseResults = await Promise.all([getDiversById(diverIds), getDiversByUid(diverUids)])
    diversToAdd = promiseResults[0].concat(promiseResults[1])

    for (const diver of divers) {
        diver.diver = diversToAdd.find((diverToAdd) => 
            (diver.diver_id && diverToAdd.id == diver.diver_id) || (diver.uid && diverToAdd.uid == diver.uid)
        )
    }

    return divers
}

const deleteDiver = (id) => deleteDoc(getDiverRef(id))

export { getDiver, updateDiver, createDiver, getDiversById, getDivers, getDiversByUid, deleteDiver }