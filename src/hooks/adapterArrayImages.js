import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../firebase'

export const adaptedArrayImages = (listImages) => {
  let array = []
  listImages.map((imagen) => {
    array.push(getDownloadURL(ref(storage, imagen)))
  })
  return array
}