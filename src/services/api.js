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
      console.log("Does not conform");
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
  let baseUrl = "https://api.flickr.com/services/rest/?method=flickr.places.placesForBoundingBox";
  let params = getPlaceParams(bbox, distance);

  return axios.get(baseUrl, { params });
}

export const fetchPlaceChildren = (parentJSON) => {
  let baseUrl = "https://api.flickr.com/services/rest/?method=flickr.places.getChildrenWithPhotosPublic";

  return axios.all( parentJSON.places.place.map( place => {
      let params = {
        api_key : "2b3fe0a28145f01a2ab0a1ae3ee65c1d",
        place_id: place.place_id,
        format : "json",
        nojsoncallback : "1",
      }
      return axios.get(baseUrl, { params })
        .then( res => res.data.places.place )
        .catch( error => error );
  }));
}

export const fetchImages = (placeId) => {
  let url = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
  let params = {
    api_key : "2b3fe0a28145f01a2ab0a1ae3ee65c1d",
    sort : "interestingness-desc",
    content_type : "1",
    place_id : placeId,
    has_geo : "1",
    per_page : "10",
    format : "json",
    nojsoncallback : "1",
    extras : "geo",
  }

  return axios.get(url, { params });
}
