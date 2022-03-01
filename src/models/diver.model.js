export class Diver {
    id
    firstname
    lastname
    uid
    owner_id
    constructor(id, firstname, lastname, uid, owner_id) {
        this.id = id
        this.firstname = firstname
        this.lastname = lastname
        this.uid = uid
        this.owner_id = owner_id
    }
    get fullname() {
        return `${this.firstname} ${this.lastname}`
    }

    get anonymizedName() {
        return `${this.firstname} ${this.lastname.charAt(0)}.`
    }
}
