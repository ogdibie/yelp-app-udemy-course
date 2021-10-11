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
      images: [
        {
          url: "https://res.cloudinary.com/university-ruona/image/upload/v1633901752/YelpCamp/fgsrdo1owq3i9ytnzf6v.jpg",
          filename: "YelpCamp/fgsrdo1owq3i9ytnzf6v",
        },
        {
          url: "https://res.cloudinary.com/university-ruona/image/upload/v1633901752/YelpCamp/lyjrrrznsin3mzfsu4fv.jpg",
          filename: "YelpCamp/lyjrrrznsin3mzfsu4fv",
        },
        {
          url: "https://res.cloudinary.com/university-ruona/image/upload/v1633901752/YelpCamp/qi449scx6xcnf2kqn3ej.jpg",
          filename: "YelpCamp/qi449scx6xcnf2kqn3ej",
        },
      ],
    });

    await newCampground.save();
  }
};

seedDB().then(() => mongoose.connection.close());
