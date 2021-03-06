
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
          displayPhotos: []
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

export const normalizeImages = (images, placeId) => {
  let nImages = {};
  nImages[placeId] = [];

  images.map( image => {
    let url = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
    let urlSm = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_n.jpg`
    let urlMed = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_z.jpg`

    const nImage = {
      id: image.id,
      title: image.title,
      secret: image.secret,
      farmId: image.farm,
      coords: {
        lat: image.latitude,
        lon: image.longitude
      },
      urlSm: urlSm,
      urlMed: urlMed,
      url: url
    }

    nImages[placeId] = nImages[placeId].concat(nImage);
  });

  return nImages;
}
