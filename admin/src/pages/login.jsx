/**
 *  @name: login.jsx
 *  @version: 1.0.0
 *  @author: Sergio
 *  @description: Página de iniciar sesión /login
*/

import React, { useState, useEffect } from 'react';
import { Consumer }     from '../context';
import Button           from '@material-ui/core/Button';
import CssBaseline      from '@material-ui/core/CssBaseline';
import TextField        from '@material-ui/core/TextField';
import Typography       from '@material-ui/core/Typography';
import { makeStyles }   from '@material-ui/core/styles';
import Container        from '@material-ui/core/Container';
import cogoToast        from 'cogo-toast';

// HTTP Client
import Request from '../utils/http';

// Styles
const useStyles = makeStyles(theme => ({
    login: {
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(1, 0, 0),
    },
}));


const PageLogin = (props) => {

    const classes = useStyles();

    /**
     * @name handleSubmit
     * @description Función para enviar los datos al Web API
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        cogoToast.loading('Validando usuario', 1500);
        const request = new Request();
        const data = {
            email: event.target.email.value,
            password: event.target.password.value
        };
        const { result, error } = await request.post('/users/login', data);
        if ( result && !result.error ) {
            props.context.login({ user: result.user, auth: true });
            await props.context.loadUser();
            cogoToast.success("Acceso concedido");
            setTimeout(() => {
                props.history.push('/tablero');
            }, 3000);
        } else {
            cogoToast.error(error.message);
        }
    }

    // Si existe sesión activa enviar al tablero
    useEffect(() => {
        if (window.localStorage.getItem("GIMAV_AR_Admin")) {
            window.location = "/tablero";
        }
    });

    return(
        <div className = { classes.login }>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className = { classes.paper }>
                    <Typography component="h1" variant="h5">
                        INICIAR SESIÓN
                    </Typography>
                    <form className = { classes.form } onSubmit = { handleSubmit } noValidate>
                        <TextField
                            variant="outlined" margin="normal" required fullWidth
                            id="email" label="Correo electrónico" name="email" autoComplete="email" autoFocus
                        />
                        <TextField
                            variant="outlined" margin="normal" required fullWidth 
                            name="password" label="Contraseña" type="password" id="password" autoComplete="current-password"
                        />
                        <Button 
                            type="submit" fullWidth variant="contained" color="primary"
                            className = { classes.submit } >
                            Ingresar
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default Consumer(PageLogin);
