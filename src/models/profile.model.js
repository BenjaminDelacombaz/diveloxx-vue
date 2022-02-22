export class Profile {
    id
    firstname
    lastname
    constructor(id, firstname, lastname) {
        this.id = id
        this.firstname = firstname
        this.lastname = lastname
    }
    get fullname() {
        return `${this.firstname} ${this.lastname}`
    }

    get anonymizedName() {
        return `${this.firstname} ${this.lastname.charAt(0)}.`
    }
}
