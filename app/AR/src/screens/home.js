/**
 *  @name: home.js
 *  @version: 1.0.0
 *  @author: Sergio
 *  @description: Screen de Inicio
*/


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScreenHome = () => {

    return(
        <View style = { styles.general } >
            <Text>
                GIMAV AR - Home
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
  general: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  }  
});

export default ScreenHome;