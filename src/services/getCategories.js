import api from './api'

export default function getCategories(signal) {
  return api('/browse/categories', signal).then((data) => data.categories.items)
} 
