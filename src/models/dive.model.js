export class Dive {
    site
    date
    depth
    duration
    divers

    constructor(site, date, depth, duration, divers) {
        this.site = site
        this.date = date
        this.depth = depth
        this.duration = duration
        this.divers = divers
    }
}
