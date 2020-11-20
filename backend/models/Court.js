import mongoose from 'mongoose';
import geocoder from '../utils/geocoder.js';

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
    required: [true, 'Please add the number of courts'],
  },
  hasLights: {
    type: Boolean,
  },
  hasPracticeWall: {
    type: Boolean,
  },
  isCommunityCenter: {
    type: Boolean,
  },
  location: {
    type: {
      type: String,
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

CourtSchema.index({ location: '2dsphere' });

// Geocode & create location field
CourtSchema.pre('save', async function (next) {
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

const Court = mongoose.model('Court', CourtSchema);

export default Court;
