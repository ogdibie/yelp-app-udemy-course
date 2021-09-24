require("../db/mongoose");
const mongoose = require("mongoose");
const Campground = require("../models/Campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

const getRandomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const city = cities[random1000].city;
    const state = cities[random1000].state;
    const title = `${getRandomElement(descriptors)} ${getRandomElement(
      places
    )}`;
    const newCampground = new Campground({
      location: `${city}, ${state}`,
      title,
    });

    await newCampground.save();
  }
};

seedDB().then(() => mongoose.connection.close());
