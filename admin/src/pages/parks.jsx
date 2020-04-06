/**
 *  @name: parks.jsx
 *  @version: 1.0.0
 *  @author: Sergio
 *  @description: Página del tablero general /parques
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
});

const PageParks = () => {

    const classes = useStyles();
    const [parks, setParks] = useState({
        data: [],
        loading: true
    });

    /**
     * @name: loadQRs
     * @description: Función para obtener todos los QRs
    */
    const loadParks = async () => {
        const request = new Request();
        const { result, error } = await request.get('/parks');
        if (result && !result.error) {
            setParks({ data: result.parks, loading: false });
        } else {
            setParks({ data: [0], loading: false });
            cogoToast.error(error.message);
        }
    };

    // Cuando el componente se monte invoca la función 'loadParks'
    useEffect(() => {
        loadParks();
    }, []);

    return(
        <Layout title = "Parques">
            <CssBaseline />
            <Paper className = { classes.root }>
                <Table className = { classes.table } aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="center">Nombre</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    { parks.data.map((park, key) => (
                        <TableRow key = { key }>
                            <TableCell component="th" scope="row">
                                { park.id }
                            </TableCell>
                            <TableCell align="center">{ park.name }</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Paper>
        </Layout>
    );
}

export default PageParks;