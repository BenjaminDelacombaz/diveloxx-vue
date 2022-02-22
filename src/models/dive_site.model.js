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
        this.country = countries.default.find((country) => country.alpha2 == country_code)?.en ?? null
    }
}
