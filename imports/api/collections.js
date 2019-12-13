import { Mongo } from 'meteor/mongo'

// Collection personal - user

export const Personal = new Mongo.Collection('personal')

// Collection Devices
export const Devices = new Mongo.Collection('devices')

// Collection Actions
export const Actions = new Mongo.Collection('actions')