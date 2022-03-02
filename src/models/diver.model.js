export class Diver {
    id
    firstname
    lastname
    uid
    diver_id
    diver

    constructor(id, firstname, lastname, diver_id, uid) {
        this.id = id
        this.firstname = firstname
        this.lastname = lastname
        this.uid = uid
        this.diver_id = diver_id
    }

    static fromFormState(id, diverId, uid, state) {
        return new Diver(id, state.firstname, state.lastname, diverId, uid)
    }

    get fullname() {
        return `${this.firstname} ${this.lastname}`
    }

    get anonymizedName() {
        return `${this.firstname} ${this.lastname.charAt(0)}.`
    }

    updateFromFormState(state) {
        this.firstname = state.firstname
        this.lastname = state.lastname
    }

    canEdit(diverId, uid) {
        return diverId == this.diver_id || uid == this.uid
    }

    canDelete(diverId) {
        return diverId == this.diver_id
    }
}
