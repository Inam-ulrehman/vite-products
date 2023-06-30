import { getGeocode, getLatLng } from 'use-places-autocomplete'

const getPostalCodeCoordinates = async (postalCode) => {
  try {
    const results = await getGeocode({ address: postalCode })

    if (results && results.length > 0) {
      const { lat, lng } = getLatLng(results[0])
      const coordinates = { type: 'Point', coordinates: [lng, lat] }
      return coordinates
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error)
  }

  return null
}

export default getPostalCodeCoordinates
