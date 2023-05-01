import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

export const obtenerDatos = async () => {
  const querySnapshot = await getDocs(collection(db, 'usuarios'))
  let usuarios = []
  querySnapshot.forEach((doc) => {
    usuarios.push(doc.data())
  })
  return usuarios
}
