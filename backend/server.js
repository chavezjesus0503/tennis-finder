import express from 'express';

const app = express();

// // @desc      Get tennis courts within a radius
// // @route     GET /api/v1/tenniscourts/radius/:zipcode/:distance
// // @access    Public
app.get('/tenniscourts', async (req, res) => {
  // const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  // const loc = await geocoder.geocode(zipcode);
  // const lat = loc[0].latitude;
  // const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  // const radius = distance / 3963;

  // const courts = await Court.find({
  //   location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  // });

  // res.status(200).json({
  //   success: true,
  //   count: courts.length,
  //   data: courts,
  // });

  res.send('Find me a tennis court, damnit!!');
});

app.listen(5000, () => {
  console.log('Server is running...');
});

// // @desc      Get bootcamps within a radius
// // @route     GET /api/v1/bootcamps/radius/:zipcode/:distance
// // @access    Private
// exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
//   const { zipcode, distance } = req.params;

//   // Get lat/lng from geocoder
//   const loc = await geocoder.geocode(zipcode);
//   const lat = loc[0].latitude;
//   const lng = loc[0].longitude;

//   // Calc radius using radians
//   // Divide dist by radius of Earth
//   // Earth Radius = 3,963 mi / 6,378 km
//   const radius = distance / 3963;

//   const bootcamps = await Bootcamp.find({
//     location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
//   });

//   res.status(200).json({
//     success: true,
//     count: bootcamps.length,
//     data: bootcamps,
//   });
// });
