import { Devices } from '../../imports/api/collections'
import { rstream } from '../../imports/api/streamers'



Meteor.methods({
    getAllDevices() {
        return Devices.find({ status: 1 }).fetch()
    },
})