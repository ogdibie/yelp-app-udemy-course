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
      owner: "615fa2112225a2842c081017",
      location: `${city}, ${state}`,
      title,
      geometry: {
        type: "Point",
        coordinates: [-108.27, 45.94],
      },
      price,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit ullam eligendi expedita perspiciatis est tempore quibusdam laboriosam nisi hic, rem, aspernatur magni quae eum debitis enim facilis tempora assumenda! Ea.",
      images: [
        {
          url: "https://res.cloudinary.com/university-ruona/image/upload/v1634142455/YelpCamp/eas9d29h4juh17oklagg.jpg",
          filename: "YelpCamp/eas9d29h4juh17oklagg",
        },
        {
          url: "https://res.cloudinary.com/university-ruona/image/upload/v1634142457/YelpCamp/fcbdll4ja3wjrh15xjnr.jpg",
          filename: "YelpCamp/fcbdll4ja3wjrh15xjnr",
        },
        {
          url: "https://res.cloudinary.com/university-ruona/image/upload/v1634142457/YelpCamp/skgfhvoeln4ecwpy50fk.jpg",
          filename: "YelpCamp/skgfhvoeln4ecwpy50fk",
        },
      ],
    });

    await newCampground.save();
  }
};

seedDB().then(() => mongoose.connection.close());
