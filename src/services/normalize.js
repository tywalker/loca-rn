
export const normalizePlaces = (places) => {
  let nPlacesArr = [];
  let idsArr = [];

  places.map( place => {
    let dupe = idsArr.indexOf(place.place_id);
    // is not duplicate add to nPlacesArr
    if (dupe === -1) {
      const nPlace = {
        id: place.place_id,
        woe: {
          id: place.woe_id,
          name: place.woe_name
        },
        coords: {
          lat: place.latitude,
          lon: place.longitude
        },
        photos: {
          count: place.photo_count,
          displayPhotoIds: []
        },
        info: {
          pType: place.place_type,
          pTypeId: place.place_type_id,
          pUrl: place.place_url
        }
      }

      nPlacesArr = nPlacesArr.concat(nPlace);
      idsArr = idsArr.concat(place.place_id);
    }
  });

  return nPlacesArr;
}
