import React from 'react';
import axios from 'axios';
import { geolocated } from 'react-geolocated';
import { useState } from 'react';
import { Table, Row } from 'react-bootstrap';
const Locate = ({
  coords,
  isGeolocationAvailable,
  isGeolocationEnabled,
  miles,
}) => {
  const [courts, setCourts] = useState([]);
  const handleClick = async () => {
    const res = await axios.get(
      `/tenniscourts/radius/${coords.latitude}/${coords.longitude}/${miles}`
    );
    setCourts(res.data.data);
    console.log(res.data.data);
  };
  return !isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : coords ? (
    <>
      <button onClick={handleClick}>Find!</button>
      <Table>
        <Row>
          <th>Name</th>
          <th>Address</th>
          <th># of Courts</th>
          <th>Has Lights</th>
          <th>Has Practice Wall</th>
          <th>Community Center</th>
        </Row>
      </Table>
      {courts.length
        ? courts.map((court) => (
            <Row key={court._id}>
              <td>{court.name}</td>
              <td>{court.location.formattedAddress}</td>
              <td>{court.numCourts}</td>
              <td>{court.hasLights ? 'Yes' : 'No'}</td>
              <td>{court.hasPracticeWall ? 'Yes' : 'No'}</td>
              <td>{court.isCommunityCenter ? 'Yes' : 'No'}</td>
            </Row>
          ))
        : null}
    </>
  ) : (
    <div>Getting the location data&hellip; </div>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Locate);
