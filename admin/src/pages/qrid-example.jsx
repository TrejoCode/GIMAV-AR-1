import React, { Component } from 'react';

// Acceder a las props del Router
import { withRouter } from 'react-router-dom';

// HTTP CLient
import Request from '../utils/http';
const request = new Request();

class PageQRID extends Component {

    state = {
        qr: {}
    }

    render() {
        const { qr } = this.state;
        return(
            <div>
                <p>
                    { qr.url_target }
                </p>
            </div>
        );
    }

    componentDidMount() {
        // Match: Objeto que devuelve la información del <Route>
        const { match } = this.props;
        // params: Devuelve todos los parametros de la URL
        this.getQRById(match.params.id);
    } 

    async getQRById(id) {
        const { result, error } = await request.get(`/qrs/${id}`);
        if (result && !result.error) {
            this.setState({ qr: result.qr });
        } else {
            console.log(error);
        }
    }

    

}

export default withRouter(PageQRID);