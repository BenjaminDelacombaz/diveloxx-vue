import { doc, getFirestore, updateDoc, documentId, query, collection, where, getDocs, addDoc, deleteDoc, onSnapshot, limit } from "firebase/firestore";
import { inject } from "vue";
import { Diver } from "../models/diver.model";

const getDiverRef = (id) => doc(getFirestore(), "divers", id)
const getDiversRef = () => collection(getFirestore(), "divers")

const getDiver = async (uid) => {
    const q = query(getDiversRef(), where('uid', '==', uid), limit(1))
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


const subscribeDiver = (id = null, uid = null, onEnd = () => {}) => {
    const q = query(getDiversRef(), where('uid', '==', uid), limit(1))
    return onSnapshot(q, (querySnapshot) => {
        let diver = null
        if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0]
            diver = new Diver(docSnap.id, docSnap.data().firstname, docSnap.data().lastname, docSnap.data().diver_id, docSnap.data().uid)
        }
        onEnd(diver)
    });
}

const subscribeDivers = (callback, divers) => {
    const auth = inject('auth')
    return onSnapshot(getDiversRef(), (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => { 
            const doc = change.doc
            if (change.type == 'added') {
                divers.push(new Diver(doc.id, doc.data().firstname, doc.data().lastname, doc.data().diver_id, doc.data().uid))
            }
            if (change.type == 'modified') {
                const diver = divers.find(d => d.id == doc.id)
                diver.firstname = doc.data().firstname
                diver.lastname = doc.data().lastname
                diver.diver_id = doc.data().diver_id
                diver.uid = doc.data().uid
            }
            if (change.type == 'removed') {
                const i = divers.findIndex(d => d.id == doc.id)
                divers.splice(i, 1)
            }
        })
        // Set diver without recall data
        for (const diver of divers) {
            let diverToAdd = null
            if (diver.diver_id == auth.value.diver.id) {
                diverToAdd = auth.value.diver
            } else if (diver.diver_id) {
                diverToAdd = divers.find(d => d.id == diver.diver_id)
            } else {
                diverToAdd = diver
            }
            // Prevent loop attribute on diver.diver
            diverToAdd = diverToAdd ? new Diver(diverToAdd.id, diverToAdd.firstname, diverToAdd.lastname, diverToAdd.diver_id, diverToAdd.uid) : null
            diver.diver = diverToAdd
        }
        callback()
    })
}

export { getDiver, updateDiver, createDiver, getDiversById, getDivers, getDiversByUid, deleteDiver, subscribeDiver, subscribeDivers }