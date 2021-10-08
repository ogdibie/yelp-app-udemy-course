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
    const price = Math.floor(Math.random() * 20) + 10;
    const city = cities[random1000].city;
    const state = cities[random1000].state;
    const title = `${getRandomElement(descriptors)} ${getRandomElement(
      places
    )}`;
    const newCampground = new Campground({
      owner: "615f3a5bd2bcc554e193db11",
      location: `${city}, ${state}`,
      title,
      price,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit ullam eligendi expedita perspiciatis est tempore quibusdam laboriosam nisi hic, rem, aspernatur magni quae eum debitis enim facilis tempora assumenda! Ea.",
      image: "https://source.unsplash.com/collection/429524",
    });

    await newCampground.save();
  }
};

seedDB().then(() => mongoose.connection.close());
