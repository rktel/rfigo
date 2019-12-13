import { Devices } from '../../imports/api/collections'
import { rstream } from '../../imports/api/streamers'



Meteor.methods({
    getAllDevicesOnline() {
        return Devices.find({ status: 1 }).fetch()
    },
    registerChatAction(devices, user) {
        console.log(devices, user)
    }
})