/**
 *  @name: aside.jsx
 *  @version: 1.0.0
 *  @author: Sergio
 *  @description: Componente Aside
*/

import React from 'react';
import { Consumer } from '../../context';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import CropFreeIcon from '@material-ui/icons/CropFree';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import GroupIcon from '@material-ui/icons/Group';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const Content = (props) => {
    
    const handleExit = () => {
        props.context.logout();
    }

    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },
    }));

    const drawerWidth = 240;
    const classes = useStyles();

    const { title, content } = props;    

    return(
        <div className = { classes.root }>
        <CssBaseline />
        <AppBar position="fixed" className = { classes.appBar }>
            <Toolbar>
                <Typography variant="h6" noWrap>
                    { title }
                </Typography>
            </Toolbar>
        </AppBar>
        <Drawer 
            className = { classes.drawer } variant="permanent" classes={{ paper: classes.drawerPaper, }} anchor="left" >
            <div className = { classes.toolbar } />
            <Divider />
            <List>
                <ListItem button key = { "Parques" } component = { NavLink } to = "/parques">
                    <ListItemIcon>
                        <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText primary = { "Parques" } />
                </ListItem>
                <ListItem button key = { "Nuevo Parque" } component = { NavLink } to = "/parques/nuevo">
                    <ListItemIcon>
                        <AddLocationIcon />
                    </ListItemIcon>
                    <ListItemText primary = { "Nuevo Parque" } />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key = { "QRs" } component = { NavLink } to = "/QR">
                    <ListItemIcon>
                        <CropFreeIcon />
                    </ListItemIcon>
                    <ListItemText primary = { "QRs" } />
                </ListItem>
                <ListItem button key = { "Nuevo QR" } component = { NavLink } to = "/QR/nuevo">
                    <ListItemIcon>
                        <QueuePlayNextIcon />
                    </ListItemIcon>
                    <ListItemText primary = { "Nuevo QR" } />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key = { "ARs" } component = { NavLink } to = "/AR">
                    <ListItemIcon>
                        <SettingsOverscanIcon />
                    </ListItemIcon>
                    <ListItemText primary = { "ARs" } />
                </ListItem>
                <ListItem button key = { "Nuevo AR" } component = { NavLink } to = "/AR/nuevo">
                    <ListItemIcon>
                        <SettingsOverscanIcon />
                    </ListItemIcon>
                    <ListItemText primary = { "Nuevo AR" } />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key = { "Usuarios" } component = { NavLink } to = "/usuarios">
                    <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary = { "Usuarios" } />
                </ListItem>
                <ListItem button key = { "Nuevo usuario" } component = { NavLink } to = "/usuarios/nuevo">
                    <ListItemIcon>
                        <GroupAddIcon />
                    </ListItemIcon>
                    <ListItemText primary = { "Nuevo usuario" } />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key = { "Salir" } onClick = { handleExit } >
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary = { "Salir" } />
                </ListItem>
            </List>
        </Drawer>
        <main className = { classes.content }>
            <div className = { classes.toolbar } />
            { content }
        </main>
      </div>
    );
};

export default Consumer(Content);