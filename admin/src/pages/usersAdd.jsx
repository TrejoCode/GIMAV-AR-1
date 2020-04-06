/**
 *  @name: usersAdd.jsx
 *  @version: 1.0.0
 *  @author: Sergio
 *  @description: Página de agregar QR: /usuarios/nuevo
*/

import React from 'react';
import Layout from '../pages/layout';
import cogoToast from 'cogo-toast';
import { withRouter } from 'react-router-dom';

// Material
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

// HTTP Client
import Request from '../utils/http';

// Estilos de Material
const useStyles = makeStyles({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    form: {
        display: "flex",
        alignContent: "center",
        justifyContent: "left",
        textAlign: "left",
        paddingLeft: "1rem",
        paddingBottom: "1rem",
        paddingTop: "1rem"
    },
    inputs: {
        minWidth: "250px",
        marginLeft: "0.5rem",
        marginRight: "0.5rem"
    },
    button: {
        marginLeft: "1rem"
    }
});


const PageUsersAdd = (props) => {

    /**
     * @name: handleSubmit
     * @description: Función para registrar un nuevo parque
    */
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const request = new Request();
        const data = {
            email: form.email.value,
            password: form.password.value,
            name: form.name.value
        };
        const { result, error } = await request.post('/users/add', data);
        if (result && !result.error) {
            if (result.created) {
                cogoToast.success("Usuario añadido exitosamente");
                setTimeout(() => {
                    props.history.push('/usuarios');
                }, 2000);
            } else {
                cogoToast.error(error.message);
            }
        } else {
            cogoToast.error(error.message);
        }
    };

    const classes = useStyles();

    return(
        <Layout title = "Nuevo usuario">
            <CssBaseline />
            <Paper className = { classes.root }>
                <form className = { classes.form } noValidate onSubmit = { handleSubmit }>
                    <TextField className = { classes.inputs } name="email" required label="Correo electrónico" />
                    <TextField className = { classes.inputs } name="password" type = "password" required label="Contraseña" />
                    <TextField className = { classes.inputs } name="name" required label="Nombre completo" />
                    <Button type = "submit" variant="contained" color="primary" className = { classes.button } 
                    endIcon = { <Icon>addCircle</Icon> }>
                        AGREGAR USUARIO
                    </Button>
                </form>
            </Paper>
        </Layout>
    );
}

export default withRouter(PageUsersAdd);