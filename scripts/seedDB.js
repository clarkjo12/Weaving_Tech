const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/wmfa"
);

const eaterSeed = [
  {
    username: "jon",
    password: "iLoveHillaryClinton",
    location: { coordinates: [-73.856077, 40.848447] },
    isActive: true,
    favorites: ["Dusty Donuts", "Brendan's Kitchen"]
  },
  {
    username: "tim",
    password: "password",
    location: { coordinates: [-73.556077, 40.848447] },
    isActive: false
  }
];

const truckerSeed = [
  {
    username: "brendan",
    password: "iLoveDonaldTrump",
    title: "Brendan's Kitchen",
    status: "open",
    favorites: 1,
    location: [-79.06636637852995, 35.87921661138],
    image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/ff5604ba-57a5-48f8-a91f-85c1de625100/dcx57lk-7d24cb48-7fef-4059-a305-b01026e62124.jpg",
    summary: "Now serving hamberders!",
  },
  {
    username: "beth",
    password: "catsdogs",
    title: "Beth's Kitchen",
    status: "closed",
    favorites: 0,
    location: [-79.16636637852995, 35.87921661138],
    image: "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiv06j50p3gAhWwZd8KHbuyCssQjRx6BAgBEAU&url=http%3A%2F%2Fthemetapicture.com%2Fi-hate-tacos%2F&psig=AOvVaw1sMD6HB7A3PpdLH25DoR7c&ust=1549217445029750",
    summary: "Tacos, Tacos, Who wants tacos?",
  }
];

db.Eater
  .remove({})
  .then(() => db.Eater.collection.insertMany(eaterSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

db.Trucker
  .remove({})
  .then(() => db.Trucker.collection.insertMany(truckerSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });


