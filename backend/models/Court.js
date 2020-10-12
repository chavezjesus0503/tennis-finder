const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const CourtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
  },
  numCourts: {
    type: Number,
    required: true,
  },
  hasLights: {
    type: Boolean,
    required: true,
  },
  hasPracticeWall: {
    type: Boolean,
    required: true,
  },
  isCommunityCenter: {
    type: Boolean,
    required: true,
  },
  location: {
    // GeoJSON Point
    // see mongoose docs using GeoJSON
    // Point schema
    type: {
      type: String,
      // means this the only value this can be, the only string value this can be
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Geocode & create location field
BootcampSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };

  // Do not save address in DB
  this.address = undefined;
  next();
});

module.exports = mongoose.model('Court', CourtSchema);
