/**
 *  @name: arAdd.jsx
 *  @version: 1.0.0
 *  @author: Lucero
 *  @description: Página de agregar AR: /AR/nuevo
*/

import React, { useState, useEffect } from 'react';
import Layout from '../pages/layout';
import cogoToast from 'cogo-toast';
import { withRouter } from 'react-router-dom';

// Material
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

// HTTP Client
import Request from '../utils/http';
import { loadUser } from '../utils/users';

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
    radio: {
        marginRight: "1rem"
    },
    select: {
        marginLeft: "1rem",
        minWidth: 200
    },
    button: {
        marginLeft: "1rem"
    }
});


const PageARAdd = (props) => {

    // Usuario actual
    const [idUser, setIdUser] = useState(0);
    // Tipo de AR
    const [value, setValue] = useState('url');
    // Obtener todos los parques
    const [parks, setParks] = useState({
        data: [],
        loading: true
    });    
    // Parque seleccionado
    const [idPark, setIdPark] = useState(0);
    // Controlar la apertura del select
    const [openPark, setOpenPak] = useState(false);
    

    /**
     * @name: handleChange
     * @description: Función para designar el tipo de AR : "url", "text"
    */
    const handleChange = event => {
        setValue(event.target.value);
    };


    /**
     * @name: handleChangePark
     * @description: Función para asignar el parque seleccionado
    */
    const handleChangePark = event => {
        setIdPark(event.target.value);
    };
    

    /**
     * @name: loadParks
     * @description: Función para obtener todos los parques
    */
    const loadParks = async () => {
        const request = new Request();
        const { result, error } = await request.get('/parks');
        if (result && !result.erorr) {
            setParks({ data: result.parks, loading: false });
        } else {
            setParks({ data: [0], loading: false });
            cogoToast.error(error.message);
        }
    };


    /**
     * @name: handleSubmit
     * @description: Función para registrar un nuevo parque
    */
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const request = new Request();
        let data = null;
        if (value === 'url') {
            data = {
                url_target: form.url_target.value,
                target_message: null,
                id_user: idUser,
                id_park: idPark
            };
        } else {
            data = {
                url_target: null,
                target_message: form.target_message.value,
                id_user: idUser,
                id_park: idPark
            };
        }
        const { result, error } = await request.post('/ars/add', data);
        if (result && !result.error) {
            if (result.created) {
                cogoToast.success("AR añadido exitosamente");
                setTimeout(() => {
                    props.history.push('/AR');
                }, 2000);
            } else {
                cogoToast.error(error.message);
            }
        } else {
            cogoToast.error(error.message);
        }
    };

    
    useEffect(() => {

        /**
         * @name: getUser
         * @description: Función obtener ID de usuario logeado
        */
        const getUser = async () => {
            const { idUser } = await loadUser();
            setIdUser(idUser);
        };
        
        getUser();
        loadParks();

    }, []);

    const classes = useStyles();

    return(
        <Layout title = "Nuevo AR">
            <CssBaseline />
            <Paper className = { classes.root }>
                <form className = { classes.form } noValidate onSubmit = { handleSubmit }>
                <FormControl component="fieldset" >
                    <FormLabel component="legend">Tipo de AR</FormLabel>
                    <RadioGroup value = { value } aria-label="position" onChange = { handleChange } name="position" row>
                        <FormControlLabel
                            value="url"
                            control = { <Radio color="primary" /> }
                            label="Enlace"
                            labelPlacement="start"
                            required
                        />
                        <FormControlLabel
                            value="text"
                            control = { <Radio color="primary" /> }
                            label="Texto"
                            labelPlacement="start"
                            required
                            className = { classes.radio }
                        />
                    </RadioGroup>
                    </FormControl>
                    {   value === "url" ?
                            <TextField className = { classes.inputs } name="url_model" required label="URL de envío al AR" /> :
                        value === "text" ?
                            <TextField className = { classes.inputs } name="target_message" required label="Mensaje del AR" /> : null
                    }
                    <FormControl className = { classes.select }>
                        <InputLabel id="demo-controlled-open-select-label">Asignar al parque</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open = { openPark }
                            onClose = { () => { setOpenPak(!openPark) } }
                            onOpen = { () => { setOpenPak(!openPark) } }
                            value = { idPark }
                            onChange = { handleChangePark } >
                            <MenuItem value="0">Ninguno</MenuItem>
                            { parks.data.map((park, key) => (
                                    <MenuItem key = { key } value = { park.id }> { park.name }</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <Button type = "submit" variant="contained" color="primary" className = { classes.button } 
                    endIcon = { <Icon>addCircle</Icon> }>
                        AGREGAR AR
                    </Button>
                </form>
            </Paper>
        </Layout>
    );
}

export default withRouter(PageARAdd);