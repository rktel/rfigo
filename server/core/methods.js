import { Personal } from '../../imports/api/collections'
import { rstream} from '../../imports/api/streamers'

// HELPER FUNCTIONS

const createCredentials = (personal) => {
    const { firstname, lastname } = personal
    const firstLetterUsername = firstname.substr(0, 1).toLowerCase()
    const moreLetterUsername = lastname.split(' ') ? lastname.split(' ')[0].toLowerCase().replace(/[aeiouáéíóú]/ig, '') : lastname.toLowerCase().replace(/[aeiouáéíóú]/ig, '')
    const username = firstLetterUsername + moreLetterUsername
    const password = firstname.split(' ') ? firstname.split(' ')[0].toLowerCase().replace(/[aeiouáéíóú]/ig, '') + Date.now().toString().substr(11) : firstname.toLowerCase().replace(/[aeiouáéíóú]/ig, '') + Date.now().toString().substr(11)
    return {
        username,
        password
    }
}

Meteor.methods({
    getAllPersonal(){
        return Personal.find({}).fetch()
    },
    getPersonal() {
        return Personal.findOne({ userId: this.userId })
    },
    createPersonal(person) {
        const { username, password } = createCredentials(person)
        const userId = Accounts.createUser({ username, password })
        const { firstname, lastname, email, role } = person
        Personal.insert({ firstname, lastname, email, userId, username, password, role })
        rstream.emit('updateUsers')
    },
    removePersonal(personal) {
        const { _id, userId } = personal
        if (userId) {
            Meteor.users.remove({ _id: userId })
        }
        Personal.remove({ _id })
        rstream.emit('updateUsers')
    }
})