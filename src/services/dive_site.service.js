import { collection, getDocs, getFirestore, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { DiveSite } from "../models/dive_site.model";
import { getProfilesById } from "./profile.service";

const colName = 'dive_sites'

const getDiveSites = async () => {
    const querySnapshot = await getDocs(collection(getFirestore(), colName))
    let diveSites = []
    let ownerIds = []
    let profiles = []
    querySnapshot.forEach((doc) => {
        let diveSite = new DiveSite(
            doc.id,
            doc.data().name,
            doc.data().description,
            doc.data().location,
            doc.data().country_code,
            doc.data().owner_id,
        )
        diveSites.push(diveSite)

        if (!ownerIds.includes(diveSite.owner_id)) ownerIds.push(diveSite.owner_id)
    })
    profiles = await getProfilesById(ownerIds)

    for (const diveSite of diveSites) {
        diveSite.owner = profiles.find((profile) => profile.id == diveSite.owner_id)
    }

    return diveSites
}

const createDiveSite = (diveSiteAttr) => addDoc(collection(getFirestore(), colName), diveSiteAttr)
const updateDiveSite = (id, diveSiteAttr) => updateDoc(doc(getFirestore(), colName, id), diveSiteAttr)
const deleteDiveSite = (id) => deleteDoc(doc(getFirestore(), colName, id))

export { getDiveSites, createDiveSite, updateDiveSite, deleteDiveSite }
