import { collection, getDocs, getFirestore, addDoc, updateDoc, doc, deleteDoc, query, where, documentId } from "firebase/firestore"
import { DiveSite } from "../models/dive_site.model";
import { getDiversById } from "./diver.service";

const colName = 'dive_sites'

const getDiveSites = async () => {
    const querySnapshot = await getDocs(collection(getFirestore(), colName))
    let diveSites = []
    let diverIds = []
    let divers = []
    querySnapshot.forEach((doc) => {
        let diveSite = new DiveSite(
            doc.id,
            doc.data().name,
            doc.data().description,
            doc.data().location,
            doc.data().country_code,
            doc.data().diver_id,
        )
        diveSites.push(diveSite)

        if (!diverIds.includes(diveSite.diver_id)) diverIds.push(diveSite.diver_id)
    })
    divers = await getDiversById(diverIds)

    for (const diveSite of diveSites) {
        diveSite.diver = divers.find((diver) => diver.id == diveSite.diver_id)
    }

    return diveSites
}

const createDiveSite = (diveSiteAttr) => addDoc(collection(getFirestore(), colName), diveSiteAttr)
const updateDiveSite = (id, diveSiteAttr) => updateDoc(doc(getFirestore(), colName, id), diveSiteAttr)
const deleteDiveSite = (id) => deleteDoc(doc(getFirestore(), colName, id))

const getDiveSitesById = async (ids) => {
    const q = query(collection(getFirestore(), colName), where(documentId(), "in", ids))
    const querySnapshot = await getDocs(q)
    let diveSites = []
    querySnapshot.forEach((doc) => {
        diveSites.push(new DiveSite(doc.id, doc.data().name, doc.data().description, doc.data().location, doc.data().country_code, doc.data().diver_id))
    })

    return diveSites
}

export { getDiveSites, createDiveSite, updateDiveSite, deleteDiveSite, getDiveSitesById }
