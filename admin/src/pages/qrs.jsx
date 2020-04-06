/**
 *  @name: qrs.jsx
 *  @version: 1.0.0
 *  @author: Sergio
 *  @description: Página del tablero general /QR
*/

import React, { useState, useEffect } from 'react';
import Layout from '../pages/layout';
import { withRouter } from 'react-router-dom';
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
    qr: {
        maxHeight: 80
    },
    button: {
        backgroundColor: "#cf000f"
    }
});

const PageQR = () => {

    const classes = useStyles();
    const [QRs, setQRs] = useState({
        data: [],
        loading: true
    });

    /**
     * @name: loadQRs
     * @description: Función para obtener todos los QRs
    */
    const loadQRs = async () => {
        const request = new Request();
        const { result, error } = await request.get('/qrs');
        if (result && !result.error) {
            setQRs({ data: result.qrs, loading: false });
        } else {
            setQRs({ data: [0], loading: false });
            cogoToast.error(error.message);
        }
    };

    /**
     * @name: handleDelete
     * @description: Función para eliminar un QR por el ID
    */
    const handleDelete = async (id) => {
        const request = new Request();
        const { result, error } = await request.delete(`/qrs/${id}`);
        if (result && !result.error) {
            if (result.deleted) {
                cogoToast.success("QR Eliminado");
                loadQRs();
            } else {
                cogoToast.error(error.message);
            }
        } else {
            cogoToast.error(error.message);
        }
    };

    // Cuando el componente se monte invoca la función 'loadQRs'
    useEffect(() => {
        loadQRs();
    }, []);

    return(
        <Layout title = "QR's">
            <CssBaseline />
            <Paper className = { classes.root }>
                <Table className = { classes.table } aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="center">QR</TableCell>
                        <TableCell align="center">URL</TableCell>
                        <TableCell align="center">Mensaje</TableCell>
                        <TableCell align="center">Parque</TableCell>
                        <TableCell align="right">Opciones</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    { QRs.data.map((qr, key) => (
                        <TableRow key = { key }>
                        <TableCell component="th" scope="row">
                            { qr.id }
                        </TableCell>
                        <TableCell align="center">
                            <img className={classes.qr} src = { qr.url_qr } alt="QR" />
                        </TableCell>
                        <TableCell align="center">{ qr.url_target }</TableCell>
                        <TableCell align="center">{ qr.target_message }</TableCell>
                        <TableCell align="center">{ qr.name }</TableCell>
                        <TableCell align="right">
                            { <Button onClick = { () => { handleDelete(qr.id) } } variant="contained" color="primary" className = { classes.button }>
                                Eliminar
                                </Button> }
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Paper>
        </Layout>
    );
}

export default withRouter(PageQR);