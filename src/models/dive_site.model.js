import * as countries from '../data/countries.json';

export class DiveSite {
    id
    name
    description
    location
    country_code
    country
    owner_id
    owner

    constructor(id, name, description, location, country_code, owner_id) {
        this.id = id
        this.name = name
        this.description = description
        this.location = location
        this.country_code = country_code
        this.owner_id = owner_id
        this.refreshCountry()
    }

    static fromFormState(id, ownerId, state) {
        return new DiveSite(id, state.name, state.description, state.location, state.country_code, ownerId)
    }

    updateFromFormState(state) {
        this.name = state.name
        this.description = state.description
        this.location = state.location
        this.country_code = state.country_code
        this.refreshCountry()
    }

    refreshCountry() {
        this.country = countries.default.find((country) => country.alpha2 == this.country_code)?.en ?? null
    }

    canEdit(uid) {
        return uid == this.owner_id 
    }

    canDelete(uid) {
        return this.canEdit(uid)
    }
}
