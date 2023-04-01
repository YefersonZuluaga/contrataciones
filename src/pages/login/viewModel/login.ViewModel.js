import { message } from 'antd';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDocs } from 'firebase/firestore';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const useLoginViewModel = () => {

  const auth = getAuth();
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
          warning("Complete todos los campos.")
      }
  }


  const obtenerDatos = async () => {

      const querySnapshot = await getDocs(collection(db, "usuarios"))
      querySnapshot.forEach((doc) => {
          if (user == doc.id) {
              navigate('/home')
              console.log("entro")
          }
          // console.log(doc.id)
          // console.log(doc.data());
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