import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';

import Court from './models/Court.js';

dotenv.config({ path: './backend/config/config.env' });

connectDB();

const app = express();

// enable CORS
app.use(cors());

app.use(express.json());

// // @desc      Get tennis courts within a radius
// // @route     GET /api/v1/tenniscourts/radius/:zipcode/:distance
// // @access    Public
app.get(
  '/tenniscourts/radius/:latitude/:longitude/:distance',
  async (req, res) => {
    const { latitude, longitude, distance } = req.params;

    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth Radius = 3,963 miles / 6,378 kilometers
    const radius = distance / 3963;

    const courts = await Court.find({
      location: {
        $geoWithin: { $centerSphere: [[longitude, latitude], radius] },
      },
    });

    res.status(200).json({
      success: true,
      count: courts.length,
      data: courts,
    });
  }
);

app.post('/tenniscourts', async (req, res) => {
  try {
    const court = await Court.create(req.body);

    res.json({
      message: 'New court added',
      court: court,
    });
  } catch (error) {
    console.log('error:' + error);
  }
});

app.listen(5000, () => {
  console.log('Server is running...');
});
