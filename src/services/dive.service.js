import { doc, getFirestore, collection, getDocs, query, where, addDoc, Timestamp, updateDoc, deleteDoc } from "firebase/firestore";
import { Dive } from "../models/dive.model";
import { getDiversById } from "./diver.service";
import { getDiveSitesById } from "./dive_site.service";

const getDiveRef = (id) => doc(getFirestore(), "dives", id)
const getDivesRef = () => collection(getFirestore(), "dives")

const getDivesGroupedPerYear = (dives) => {
    return dives.reduce((previous, current) => {
        if (!previous[current.date.getFullYear()]) {
            previous[current.date.getFullYear()] = []
        }
        previous[current.date.getFullYear()].push(current)
        return previous
    }, {})
}

const getDivesByDiver = async (diverId) => {
    const q = query(getDivesRef(), where('diver_id', '==', diverId))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) return []
    let dives = []
    let diverIds = []
    let divers = []
    let diveSiteIds = []
    let diveSites = []
    querySnapshot.forEach((doc) => {
        let dive = new Dive(
            doc.id,
            doc.data().comments,
            doc.data().date.toDate(),
            doc.data().depth,
            doc.data().dive_site_id,
            doc.data().diver_id,
            doc.data().divers_id,
            doc.data().duration,
        )
        dives.push(dive)

        if (!diveSiteIds.includes(dive.dive_site_id)) diveSiteIds.push(dive.dive_site_id)
        if (!diverIds.includes(dive.diver_id)) diverIds.push(dive.diver_id)
        for (const diver_id of dive.divers_id) {
            if (!diverIds.includes(diver_id)) diverIds.push(diver_id)
        }
    })
    divers = await getDiversById(diverIds)
    diveSites = await getDiveSitesById(diveSiteIds)

    for (const dive of dives) {
        dive.dive_site = diveSites.find((diveSite) => diveSite.id == dive.dive_site_id)
        dive.diver = divers.find((diver) => diver.id == dive.diver_id)
        for (const diver_id of dive.divers_id) {
            dive.divers.push(divers.find((diver) => diver.id == diver_id))
        }
    }

    return dives
}

const createDive = (diveAttr) => {
    diveAttr.date = Timestamp.fromDate(new Date(diveAttr.date))
    return addDoc(getDivesRef(), diveAttr)
}
const updateDive = (id, diveAttr) => {
    diveAttr.date = Timestamp.fromDate(new Date(diveAttr.date))
    updateDoc(getDiveRef(id), diveAttr)
}
const deleteDive = (id) => deleteDoc(getDiveRef(id))

export { getDivesGroupedPerYear, getDivesByDiver, createDive, updateDive, deleteDive }