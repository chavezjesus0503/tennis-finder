import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import path from 'path';

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

    // Return courts in order of nearest to farthest from [long, lat]
    const courts = await Court.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: distance * 1609.34,
        },
      },
    });

    // Return in order of nearest to farthest incl distances from [long, lat]
    // const courts = await Court.aggregate([
    //   {
    //     $geoNear: {
    //       near: { type: 'Point', coordinates: [longitude, latitude] },
    //       key: 'location',
    //       distanceField: 'dist.calculated',
    //       spherical: true,
    //     },
    //   },
    // ]);

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

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname), 'frontend', 'build', 'index.html')
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running');
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server is running...');
});
