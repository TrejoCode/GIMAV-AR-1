/**
 *  App.js
 *  @version: 1.0.0
 *  @author: Sergio
 *  @description: Registro de la aplicación
 * 	@process: 1
*/

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
