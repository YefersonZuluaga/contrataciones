import { message } from 'antd';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../../firebase';

const useLoginViewModel = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = async () => {

    let centinela = true;
    const q = query(collection(db, "empleados"), where("email", "==", email));

    const querySnapshot2 = await getDocs(q);
    querySnapshot2.forEach((doc) => {
      if (doc.data().contrasena == password) {
        let data = doc.data()
        localStorage.setItem("user", JSON.stringify({ email: data.email, rol: data.rol }))
        centinela = false
        navigate("/home")
      }
    });
    centinela && message.warning("usuario o contraseña incorrecta")
  }

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/home')
    }
  }, [])



  return {
    onSubmit,
    password,
    setPassword,
    email,
    setEmail
  }
}

export default useLoginViewModel