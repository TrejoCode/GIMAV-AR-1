/**
 *  @name: parksAdd.jsx
 *  @version: 1.0.0
 *  @author: Sergio
 *  @description: Página de agregar QR: /parques/nuevo
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
      paddingBottom: '1rem'
    },
    form: {
        display: "flex",
        alignContent: "center",
        justifyContent: "left",
        textAlign: "left",
        paddingLeft: "1rem"
    },
    input: {
        minWidth: "250px"
    },
    button: {
        marginLeft: "1rem"
    }
});

const PageParksAdd = (props) => {

    const classes = useStyles();

    /**
     * @name: handleSubmit
     * @description: Función para registrar un nuevo parque
    */
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const request = new Request();
        const data = {
            name: form.name.value
        };
        const { result, error } = await request.post('/parks/add', data);
        if (result && !result.error) {
            if (result.created) {
                cogoToast.success("Parque añadido exitosamente");
                setTimeout(() => {
                    props.history.push('/parques');
                }, 2000);
            } else {
                cogoToast.error(error.message);
            }
        } else {
            cogoToast.error(error.message);
        }
    };

    return(
        <Layout title = "Nuevo Parque">
            <CssBaseline />
            <Paper className = { classes.root }>
                <form className = { classes.form } onSubmit = { handleSubmit }>
                    <TextField required id="standard-required" name = "name" label="Nombre del parque" className = { classes.input } defaultValue="" />
                    <Button type = "submit" variant="contained" color="primary" className = { classes.button } 
                    endIcon = { <Icon>addCircle</Icon> }>
                        AGREGAR
                    </Button>
                </form>
            </Paper>
        </Layout>
    );
}

export default withRouter(PageParksAdd);