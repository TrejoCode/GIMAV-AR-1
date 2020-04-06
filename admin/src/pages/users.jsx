/**
 *  @name: users.jsx
 *  @version: 1.0.0
 *  @author: Lucero
 *  @description: Página del tablero general /USER
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

const PageUSER = () => {

    const classes = useStyles();
    const [USERs, setUSERs] = useState({
        data: [],
        loading: true
    });

    /**
     * @name: loadUSERs
     * @description: Función para obtener todos los USERs
    */
    const loadUSERs = async () => {
        const request = new Request();
        const { result, error } = await request.get('/users');
        if (result && !result.erorr) {
            setUSERs({ data: result.users, loading: false });
        } else {
            setUSERs({ data: [0], loading: false });
            cogoToast.error(error.message);
        }
    };

    // Cuando el componente se monte invoca la función 'loadUSERs'
    useEffect(() => {
        loadUSERs();
    }, []);

    return(
        <Layout title = "Usuarios">
            <CssBaseline />
            <Paper className = { classes.root }>
                <Table className = { classes.table } aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="center">E-mail</TableCell>
                        <TableCell align="center">Nombre</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    { USERs.data.map((user, key) => (
                        <TableRow key = { key }>
                        <TableCell component="th" scope="row">
                            { user.id }
                        </TableCell>
                        <TableCell align="center">{ user.email }</TableCell>
                        <TableCell align="center">{ user.name }</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Paper>
        </Layout>
    );
}

export default PageUSER;