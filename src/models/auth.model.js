import { getCurrentUser } from "../services/auth.service"
import { subscribeDiver } from "../services/diver.service"

export class Auth {
    user
    diver
    isAuth
    hasDiver

    async init() {
        return new Promise(async (resolve, reject) => {
            this.user = await getCurrentUser()
            if (this.user) {
                this.unsubscribeDiver = subscribeDiver(null, this.user.uid, (d) => { 
                    this.diver = d
                    this.hasDiver = !!d
                    resolve()
                })
            } else {
                resolve()
            }
            this.isAuth = !!this.user
        })
    }

    refreshDiver() {
        this.unsubscribeDiver()
        this.unsubscribeDiver = subscribeDiver(null, this.user.uid, (d) => { 
            this.diver = d
            this.hasDiver = !!d
        })
    }

    unsubscribeDiver = () => {}

    destroy() {
        this.unsubscribeDiver()
        delete this.user
        delete this.diver
        delete this.isAuth
        delete this.hasDiver
    }
}