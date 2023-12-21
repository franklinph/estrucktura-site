import React from 'react';
import client from '../utils/axios';
//import axios from 'axios';

const registerSocio = (data) => {
    return client
    .post('/socio/create', {
        auspiciante: data.auspiciante,
        email: data.email,
        nombre: data.nombre,
        tipo_identificacion: "cedula",
        identificacion: data.cedula,            
        idpais: "6f4b5233-8faf-4e1e-a625-da5124720f72",
        telefono: "04141051599",            
        clave: data.password
    },
    {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            //'Authorization': 'JWT fefege...'
        }
    }
    )
    .then((response) => {
        // Success
        return { 
            success: true, data: { message: 'AQUICA' } 
        };
    })
    .catch((error) => {
        // Error
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            return { 
                success: false, data: { message: error.response.data.message } 
            };
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the 
            // browser and an instance of
            // http.ClientRequest in node.js
            return { 
                success: false, data: { message: error.request } 
            };
        } else {
            // Something happened in setting up the request that triggered an Error
            return { 
                success: false, data: { message: 'Unexpected Error' } 
            };
        }
        //console.log(error.config);
    });

   

    /*
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/socio/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.ok) {
            //localStorage.setItem("accessToken", result.accessToken);
            //localStorage.setItem("refreshToken", result.refreshToken);
            
            return { success: true, data: result };
        } else {
            return {
                success: false, data: { message: result },
            };
            //return { success: false, data: result };
        }
    } catch (err) {
        console.error(err);
        //window.alert('An unexpected error has occured');
        return { 
            success: false, data: { message: 'Unexpected Error' } 
        };
    }
    */
};
export default registerSocio;

/*
export default class PersonRemove extends React.Component {
handleSubmit = event => {
event.preventDefault();
API.delete(`users/${this.state.id}`)
.then(res => {
console.log(res);
console.log(res.data);
})
}
}
*/