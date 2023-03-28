import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase'
import { collection, getDocs } from "firebase/firestore";
import { message } from 'antd';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './styles.scss'

const Login = () => {

    //estados y variables

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
        }else{
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


    return (
        <div className='container-login'>
            {contextHolder}
            <div className='container-logo'>
            </div>
            <div className='container-card-login'>
                <div className='card'>
                    <h1>Inicio de sesión</h1>
                    <input className='input' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Correo' />
                    <input className='input' value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Contraseña' />
                    <button onClick={onSubmit}>Ingresar</button>
                </div>
            </div>
        </div>
    )
}

export default Login