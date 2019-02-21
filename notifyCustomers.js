"use strict"

require('mongoose').connect(process.env.MONGODB_URI || "mongodb://localhost/wmfa");

let R = require('ramda'),
    db = require("./models"),
    distance = require('@turf/distance').default,
    { Expo } = require('expo-server-sdk'),
    expo = new Expo()

let names = customers => customers.map(c => c.username)

let notifyCustomers = async _id => {
  let truck = await
    db.Trucker
      .findById(_id)
      .catch(console.error)
  
  let customersWithin100k = await
    db.Eater
      .find({
        // location: {
        //   $nearSphere: {
        //     $geometry: truck.location,
        //     $maxDistance: 100000
        //   }
        // },
        favorites: truck._id.toString(),
        receiveNotifications: true,
        pushToken: { $exists: true }
      })
      .catch(console.error)


  // let withinTheirRange = customersWithin100k.filter(c => distance(c.location, truck.location, 'kilometers') * 1000 < c.notificationDistance)

  //   , shouldNotify = withinTheirRange.filter(c => c.receiveNotifications && c.pushToken)

    // console.log('customersWithin100k: ', customersWithin100k.map(c => c.pushToken))
  //   console.log('withinTheirRange: ', withinTheirRange.map(c => c.pushToken))

  return notify(truck, customersWithin100k.filter(c => c.pushToken)) // notify(truck, shouldNotify)
}

let notify = (truck, customers) => {
  let messages = customers.map(c => Expo.isExpoPushToken(c.pushToken) && {
    to: c.pushToken,
    title: truck.title + " is now serving nearby!",
    data: { id: truck._id, location: truck.location }
  }).filter(Boolean)

  console.log('Notifying tokens: ', messages.map(m => m.to))

  return Promise.all(expo.chunkPushNotifications(messages).map(sendMessageChunk))
}

let sendMessageChunk = async messages => {
  try {
    console.log('sendMessageChunk')
    let tickets = await expo.sendPushNotificationsAsync(messages)

      , transactions = R.zipWith((message, ticket) => ({message, ticket}), messages, tickets)

      , withReceiptIds = transactions.filter(tx => tx.ticket.id)

    // TODO handle tickets with ticket.status === 'error' but no ticket.id

    expo.chunkPushNotificationReceiptIds(withReceiptIds).forEach(handleReceiptChunk)
  } catch (e) {console.error(e)}
}

let handleReceiptChunk = async transactions => {
  try {
    let receiptIds = transactions.map(tx => tx.ticket.id)

      , receipts = await expo.getPushNotificationReceiptsAsync(receiptIds)

      , transactionsWithReceipts = R.zipWith((tx, receipt) => ({...tx, receipt}), transactions, receipts)

    transactionsWithReceipts.forEach(async tx => {
      if (tx.receipt.status === 'error') {
        console.error(`There was an error sending a notification: ${tx}`)

        if (tx.receipt.details && tx.receipt.details.error ) {
          if (tx.receipt.details.error === 'DeviceNotRegistered') {
            console.log('Removing')
            console.log(await db.Eater.update({pushToken: tx.message.to}, {$unset: {pushToken: ""}}))
          }
        }
      }
    })
  } catch (e) {console.error(e)}
}

module.exports = () => {
  if (!process.env.MONGODB_URI && !(process.env.LOGNAME === 'brendan')) return

  db.Trucker.watch().on('change', async change => {
    if (change.operationType === 'update' && change.updateDescription.updatedFields.status === 'open') {
      let title = (await db.Trucker.findById(change.documentKey._id)).title

      console.log(`Notifying customers of ${title}`)

      notifyCustomers(change.documentKey._id)
    }
  });

  console.log("Waiting to notify customers...")
}

module.exports.notify = notify

module.exports.notifyCustomers = notifyCustomers