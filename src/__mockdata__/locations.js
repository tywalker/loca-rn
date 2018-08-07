import React from 'react';
import * as api from '../services/normalize';

const locationsJSON = {
  "places":{
    "place_type":"county",
    "total":9,
    "pages":1,
    "page":1,
    "bbox":"44.87621424504764,44.981884057971016,45.12378575495236,45.018115942028984",
    "place":[
      {
        "place_id":"8fIn8DVTUb7r2JsG",
        "woeid":"2346877",
        "latitude":"43.192",
        "longitude":"44.179",
        "place_url":"\/Russia\/North+Ossetia-Alania+Republic",
        "place_type":"region",
        "place_type_id":"8",
        "timezone":"Europe\/Moscow",
        "_content":"North Ossetia-Alania Republic, RU, Russia",
        "woe_name":"North Ossetia-Alania Republic"
      },
    ]
  }
}

export const mockLocations = () => {
  let combinedArr = [];

  placesJSON.places.place.map( places => {
    combinedArr = combinedArr.concat(places);
  })

  let nPlaces = api.normalizePlaces(combinedArr);

  return nPlaces;
}
