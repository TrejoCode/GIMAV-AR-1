/**
 *  @name: qr.js
 *  @version: 1.0.0
 *  @author: Sergio
 *  @description: Screen de lectura de QR
*/

import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { withNavigationFocus } from "react-navigation";

class ScreenQR extends Component {

    constructor(props) {
        super(props);
        this.barcodeCodes = [];
    }

    /**
     * @name: renderCamera
     * @description: Renderiza la cámara o muestra un indicador de carga
    */
    renderCamera() {
        if(this.props.isFocused) {
            return(
                <RNCamera ref = { ref => {
                    this.camera = ref;
                }}
                androidCameraPermissionOptions = {{
                    title: 'Permiso para utilizar la cámara',
                    message: 'Necesitamos su permiso para usar su cámara',
                    buttonPositive: 'Aceptar',
                    buttonNegative: 'Cancelar',
                }}
                androidRecordAudioPermissionOptions = {{
                    title: 'Permiso para utilizar el micrófono',
                    message: 'Necesitamos su permiso para utilizar su micrpofono',
                    buttonPositive: 'Aceptar',
                    buttonNegative: 'Cancelar',
                }}
                type = { RNCamera.Constants.Type.back }
                onBarCodeRead = { this.onBarCodeRead.bind(this) }
                style = {{
                    flex: 1,
                    width: '100%',
                }}>
                </RNCamera>
            );
        } else {
            return(
                <View style = { styles.loading }>
                    <ActivityIndicator size = "large" />
                    <Text>
                        Render de Cámara
                    </Text>
                </View>
            );
        }

    }

    render() {
        return(
            <View style = { styles.container }>
                { this.renderCamera() }
            </View>
        );
    }

    /**
     * @name: onBarCodeRead
     * @description: Función invocada cuando se detecté un QR, muestra el contenido del QR
     * @param {object} scanResult
    */
    onBarCodeRead(scanResult) {
        console.warn("Data: ", scanResult.data);
        if (scanResult.data != null) {
            if (!this.barcodeCodes.includes(scanResult.data)) {
                this.barcodeCodes.push(scanResult.data);
            }
        }
        return;
    }
}

// Todos los estilos de la screen
const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    loading: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }

});

export default withNavigationFocus(ScreenQR);