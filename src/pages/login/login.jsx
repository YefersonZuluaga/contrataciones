import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase'
import { collection, getDocs } from "firebase/firestore";
import './styles.scss'

const Login = () => {

    const navigate = useNavigate()


    const [user, setUser] = useState("")

    const onFinish = () => {
        navigate("/home")
        if(user != " "){

        }
    }

    const obtenerDatos = async () => {


        const querySnapshot = await getDocs(collection(db, "usuarios"))
        querySnapshot.forEach((doc) => {
            if(user == doc.id){
                console.log("entro")
            }
            // console.log(doc.id)
            // console.log(doc.data());
        });

        // let coleccion = db.collection("usuarios")
        // await coleccion.where("Codigo", "==", codigo)
        // .onSnapshot(snapshot => {
        //   snapshot.docs.map(doc => {
        //     let result = doc.data()
        //     setPreviewImage(result.urlImagen)
        //     let fecha = result.FechaIngreso
        //     let date = (fecha && fecha.toDate()) ? new Date(fecha.toDate()) : new Date();
        //     let fechaFormat = moment(date).format("DD-MM-YYYY h:mm:ss")
        //     setConexionUser(fechaFormat)
            
        //   })
        // })

        // const getImagenUser = async (codigo) => {


        // let coleccion = db.collection("usuarios")
        // await coleccion.where("nombre", "==", "1001113982")
        // .onSnapshot(snapshot => {
        //   snapshot.docs.map(doc => {
        //     let result = doc.data()
        //     console.log(result)
        //     // setPreviewImage(result.urlImagen)
        //     // let fecha = result.FechaIngreso
        //     // let date = (fecha && fecha.toDate()) ? new Date(fecha.toDate()) : new Date();
        //     // let fechaFormat = moment(date).format("DD-MM-YYYY h:mm:ss")
        //     // setConexionUser(fechaFormat)

        //   })
        // })
        //   }
    }

    useEffect(() => {
        obtenerDatos()
    }, [])


    return (
        <div className='container-login'>
            <div className='container-logo'>
            </div>
            <div className='container-card-login'>
                <div className='card'>
                    <h1>Inicio de sesión</h1>
                    <input className='input' value={user} onChange={(e) => setUser(e.target.value)} placeholder='Identificacion' />
                    <button onClick={onFinish}>Ingresar</button>
                </div>
            </div>
        </div>
    )
}

export default Login