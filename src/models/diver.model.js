export class Diver {
    id
    firstname
    lastname
    uid
    diver_id
    constructor(id, firstname, lastname, diver_id, uid) {
        this.id = id
        this.firstname = firstname
        this.lastname = lastname
        this.uid = uid
        this.diver_id = diver_id
    }
    get fullname() {
        return `${this.firstname} ${this.lastname}`
    }

    get anonymizedName() {
        return `${this.firstname} ${this.lastname.charAt(0)}.`
    }
}
