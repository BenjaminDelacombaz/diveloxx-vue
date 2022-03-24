export class Dive {
    id
    comments
    date
    depth
    dive_site_id
    dive_site
    diver_id
    diver
    divers_id
    divers = []
    duration
    
    constructor(id, comments, date, depth, dive_site_id, diver_id, divers_id, duration) {
        this.id = id
        this.comments = comments
        this.date = date
        this.depth = depth
        this.dive_site_id = dive_site_id
        this.diver_id = diver_id
        this.divers_id = divers_id
        this.duration = duration
    }

    static fromFormState(id, diverId, state) {
        return new Dive(id, state.comments, new Date(state.date), state.depth, state.dive_site_id, diverId, state.divers_id, state.duration)
    }

    updateFromFormState(state) {
        this.comments = state.comments
        this.date = state.date
        this.depth = state.depth
        this.dive_site_id = state.dive_site_id
        this.divers_id = state.divers_id
        this.duration = state.duration
    }

    get dateAsString() {
        return this.date.toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    }

    getDiversAsString(onlyFirstname = false) {
        return this.divers.map(diver => onlyFirstname ? diver.firstname : diver.fullname).join(', ')
    }

    canEdit(diverId) {
        return diverId == this.diver_id 
    }

    canDelete(diverId) {
        return this.canEdit(diverId)
    }

    fill(divers, diveSites) {
        this.dive_site = null
        this.divers = []
        this.dive_site = diveSites.find(diveSite => this.dive_site_id == diveSite.id)
        for (const diverId of this.divers_id) {
            this.divers.push(divers.find(d => diverId == d.id))
        }
    }
}
