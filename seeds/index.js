if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
  5;
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 400; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const location = `${cities[random1000].city}, ${cities[random1000].state}`;
    const camp = new Campground({
      author: '61f4e1820535e213a691a793',
      location: location,
      title: `${sample(descriptors)} ${sample(places)}`,
      // image: 'http://source.unsplash.com/collection/483251',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis recusandae commodi quo a velit maxime. Nemo officia sit, harum natus ab vitae. Ullam impedit totam molestiae possimus harum similique animi!',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dgqikkjhv/image/upload/w_700,h_500,c_fill/YelpCamp/CampLake.jpg',
          filename: 'YelpCamp/CampLake',
        },
        {
          url: 'https://res.cloudinary.com/dgqikkjhv/image/upload/w_700,h_500,c_fill/YelpCamp/CampSunset.jpg',
          filename: 'YelpCamp/CampSunset',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
