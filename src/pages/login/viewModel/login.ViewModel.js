import { message } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../../firebase';

const useLoginViewModel = () => {

  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = () => {

    if ((email != "" && email != " ") && (password != "" && password != " ")) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user)
          navigate("/home")
        })
        .catch((e) => {
          console.log("usuario no encontrado")
          error("Usuario incorrecto.")
          const errorCode = e.code;
          const errorMessage = e.message;
        });
    } else {
      warning("Por favor diligenciar todos los campos.")
    }
  }


  const obtenerDatos = async () => {

    const querySnapshot = await getDocs(collection(db, "empleados"))
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });

    const q = query(collection(db, "empleados"), where("rol", "==", "empleado"));

    const querySnapshot2 = await getDocs(q);
    querySnapshot2.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }

  const error = (message) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };

  const warning = (message) => {
    messageApi.open({
      type: 'warning',
      content: message,
    });
  };

  useEffect(() => {
    obtenerDatos()
  }, []);

  return {
    contextHolder,
    onSubmit,
    password,
    setPassword,
    email,
    setEmail
  }
}

export default useLoginViewModel