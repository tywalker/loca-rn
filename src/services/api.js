import axios from 'axios';

export const fetchExample = () => {
  axios('https://jsonplaceholder.typicode.com/posts/1')
    .then( res => res);
}

export const getBoundingBoxFromGeo = (lat, lon, diameter) => {
  let latInSeconds = diameter * 0.5 / 69;
  let lonInSeconds = diameter * 0.5 / (30.9 * Math.cos(51.503364051));

  let lonUpper = lon + lonInSeconds * 0.5;
  let latUpper = lat + latInSeconds * 0.5;
  let lonLower = lon - lonInSeconds * 0.5;
  let latLower = lat - latInSeconds * 0.5;

  let bndBox = `${lonLower},${latLower},${lonUpper},${latUpper}`;

  return bndBox;
}

export const getPlaceParams = (bbox, distance) => {
  let place_type_id = 0

  switch (true) {

  case (distance <= 1.81):
     place_type_id = 22
     break;

  case (distance <= 4.3):
     place_type_id = 7
     break;

  case (distance <= 31):
     place_type_id = 9
     break;

  case (distance <= 124):
     place_type_id = 8
     break;

  case (distance <= 310):
      place_type_id = 12
      break;

  default:
      print("Does not conform")
      break;
  }

  let defaultParams = {
    api_key : "2b3fe0a28145f01a2ab0a1ae3ee65c1d",
    bbox: bbox,
    place_type_id: place_type_id.toString(),
    format : "json",
    nojsoncallback : "1",
  }

  return defaultParams;
}

export const fetchPlacesFromBB = (bbox, distance) => {
  let baseUrl = "https://api.flickr.com/services/rest/?method=flickr.places.placesForBoundingBox"
  let params = getPlaceParams(bbox, distance);

  axios.get(baseUrl, {
    params
  }).then( res => console.warn(res) )
}
