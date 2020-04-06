/**
 *  @name: layout.jsx
 *  @version: 1.0.0
 *  @author: Sergio
 *  @description: Template de las páginas
*/

import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

// Componentes
import Content from '../components/content';

/**
 *  @param: {String} title: "Título"
 *  @param: {String} description: "Descripción de la página"
 *  @param: {String} keywords: "Etiquetas, para, seo"
*/

const Layout = (props) => {
    
    const { title, description, children } = props;

    return (
        <Fragment>
            <Helmet>
                <title> { title || "GIMAV AR" } </title>
                <meta name="description" content = { description || "Descripción de la página" } />
            </Helmet>

            <Content title = { title || "GIMAV AR" } content = { children } />            

        </Fragment>
    );

}

export default Layout;