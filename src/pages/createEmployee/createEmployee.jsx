import { Button, Form, Input, Select, Upload } from 'antd';
import React, { useState } from 'react'
import Header from '../components/header/Header'
import './index.scss'

import { getStorage, ref, uploadBytes } from "firebase/storage";

const CreateEmployee = () => {
    const [componentDisabled, setComponentDisabled] = useState(true);
    const storage = getStorage();

    const prueba = async (file) => {
        console.log(file[0]);

        // Create a reference to 'mountains.jpg'
        const mountainsRef = ref(storage, file[0]);

        // Create a reference to 'images/mountains.jpg'
        const mountainImagesRef = ref(storage, 'images/mountains.jpg');

        // While the file names are the same, the references point to different files
        mountainsRef.name === mountainImagesRef.name;           // true
        mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 
    }

    return (
        <div className='container-createEmployee'>
            <Header />
            <div className='prueba'>
                <h1>Crear Empleado</h1>
                <input type='file' onChange={e => prueba(e.target.files)} />
                subir

                <div>
                    <>
                        <Form
                            labelCol={{
                                span: 4,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                        // layout="vertical"
                        // disabled={componentDisabled}
                        // style={{
                        //     maxWidth: 600,
                        // }}
                        >
                            <Form.Item label="Identificacion">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Nombre">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Apellido">
                                <Input />
                            </Form.Item>
                            {/* <Form.Item label="Nombre">
                                <Select>
                                    <Select.Option value="demo">Demo</Select.Option>
                                </Select>
                            </Form.Item> */}
                            <Form.Item label="Examenes medicos" valuePropName="fileList">
                                <Upload action="/upload.do" listType="picture-card">
                                    <div>
                                        {/* <PlusOutlined /> */}
                                        <div
                                            style={{
                                                marginTop: 8,
                                            }}
                                        >
                                            Upload
                                        </div>
                                    </div>
                                </Upload>
                            </Form.Item>
                            {/* <Form.Item label="Button">
                                <Button>Button</Button>
                            </Form.Item> */}
                        </Form>
                    </>
                </div>
            </div>
        </div>
    )
}

export default CreateEmployee

