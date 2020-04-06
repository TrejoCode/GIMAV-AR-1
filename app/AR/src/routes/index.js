/**
 *  router.js
 *  @version: 1.0.0
 *  @author: Sergio
 *  @description: Gestión de todas las screens de la aplicación
 * 	@process: 3
*/

import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

// Screens
import ScreenHome       from '../screens/home';
import ScreenQR         from '../screens/qr';
import ScreenAR         from '../screens/ar';
import ScreenSettings   from '../screens/settings';

// Iconset
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const MainNavigator = createBottomTabNavigator({
    Inicio: {
        screen: ScreenHome,
        navigationOptions: () => ({
            tabBarIcon: () => (
              <Feather name = 'home' size = { 20 } color = "#6c757d" />
            )
        })
    },
    QR: {
        screen: ScreenQR,
        navigationOptions: () => ({
            tabBarIcon: () => (
                <AntDesign name = 'qrcode' size = { 20 } color = "#6c757d" />
            )
        })
    },
    AR: {
        screen: ScreenAR,
        navigationOptions: () => ({
            tabBarIcon: () => (
                <Feather name = 'codepen' size = { 20 } color = "#6c757d" />
            )
        })
    },
    Ajustes: {
        screen: ScreenSettings,
        navigationOptions: () => ({
            tabBarIcon: () => (
                <Feather name = 'settings' size = { 20 } color = "#6c757d" />
            )
        })
    }
}, {
    initialRouteName: 'Inicio'
});

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;