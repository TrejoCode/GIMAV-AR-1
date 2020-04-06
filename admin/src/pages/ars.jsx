/**
 *  @name: ars.jsx
 *  @version: 1.0.0
 *  @author: Lucero
 *  @description: Página del tablero general /AR
*/

import React, { useState, useEffect } from 'react';
import Layout from '../pages/layout';
import cogoToast from 'cogo-toast';

// Material
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

// HTTP Client
import Request from '../utils/http';

// Estilos de Material
const useStyles = makeStyles({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
    button: {
        backgroundColor: "#cf000f"
    }
});

const PageAR = () => {

    const classes = useStyles();
    const [ARs, setARs] = useState({
        data: [],
        loading: true
    });

    /**
     * @name: loadARs
     * @description: Función para obtener todos los ARs
    */
    const loadARs = async () => {
        const request = new Request();
        const { result, error } = await request.get('/ars');
        if (result && !result.erorr) {
            setARs({ data: result.ars, loading: false });
        } else {
            setARs({ data: [0], loading: false });
            cogoToast.error(error.message);
        }
    };

    /**
     * @name: handleDelete
     * @description: Función para eliminar un AR por el ID
    */
    const handleDelete = async (id) => {
        const request = new Request();
        const { result, error } = await request.delete(`/ars/${id}`);
        if (result && !result.error) {
            if (result.deleted) {
                cogoToast.success("AR Eliminado");
                loadARs();
            } else {
                cogoToast.error(error.message);
            }
        } else {
            cogoToast.error(error.message);
        }
    };

    // Cuando el componente se monte invoca la función 'loadARs'
    useEffect(() => {
        loadARs();
    }, []);

    return(
        <Layout title = "AR's">
            <CssBaseline />
            <Paper className = { classes.root }>
                <Table className = { classes.table } aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="center">URL</TableCell>
                        <TableCell align="center">Descargas</TableCell>
                        <TableCell align="right">Opciones</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    { ARs.data.map((ar, key) => (
                        <TableRow key = { key }>
                        <TableCell component="th" scope="row">
                            { ar.id }
                        </TableCell>
                        <TableCell align="center">{ ar.url_model }</TableCell>
                        <TableCell align="center">{ ar.read_count }</TableCell>
                        <TableCell align="right">
                        { 
                            <Button onClick = { () => { handleDelete(ar.id) } } variant="contained" color="primary" className = { classes.button }>
                                Eliminar
                            </Button> 
                        }
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Paper>
        </Layout>
    );
}

export default PageAR;