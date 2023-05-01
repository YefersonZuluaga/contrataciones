import React from 'react';
import './styles.scss';
import useLoginViewModel from './viewModel/login.ViewModel';

const Login = () => {

    const { contextHolder,onSubmit, password, setPassword, email, setEmail } = useLoginViewModel()

    return (
        <div className='container-login'>
            {contextHolder}
            
            <div className='container-logo'>
                <img src='https://firebasestorage.googleapis.com/v0/b/contrataci0nes.appspot.com/o/imagenes%2Ficon.png?alt=media&token=6d7b67ca-c4dd-4af1-9169-ba1e66e5cb9b' />

            </div>
            <div className='container-card'>
                <h1>Inicio de sesion</h1>
                <input type="text" placeholder='Usuario' onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Contraseña' onChange={(e) => setPassword(e.target.value)} />
                <button onClick={onSubmit}>Ingresar</button>
            </div>
        </div>
    )
}

export default Login