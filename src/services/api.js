import axios from 'axios';

export const fetchExample = () => {
  axios('https://jsonplaceholder.typicode.com/posts/1')
    .then( res => console.warn(res));
}

const getBoundingBoxFromGeo = () => {
  let latInSeconds = diameter * 0.5 / 69;
  let lonInSeconds = diameter * 0.5 / (30.9 * Math.cos(51.503364051));
  let lonUpper = location["lon"]! + lonInSeconds * 0.5;
  let latUpper = location["lat"]! + latInSeconds * 0.5;
  let lonLower = location["lon"]! - lonInSeconds * 0.5;
  let latLower = location["lat"]! - latInSeconds * 0.5;

  let bndBox = "\(lonLower),\(latLower),\(lonUpper),\(latUpper)";
  return bndBox;
}
