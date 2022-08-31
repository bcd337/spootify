import api from './api'

export default function getNewReleases(signal) {
  return api('/browse/new-releases', signal).then((data) => data.albums.items)
} 
