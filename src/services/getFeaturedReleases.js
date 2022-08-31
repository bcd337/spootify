import api from './api'

export default function getFeaturedReleases(signal) {
  return api('/browse/featured-playlists', signal).then((data) => data.playlists.items)
} 
