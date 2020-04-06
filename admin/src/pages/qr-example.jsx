import React, { Component } from 'react';
// HTTP CLient
import Request from '../utils/http';
const request = new Request();

class PageQR extends Component {

    state = {
        qrs: []
    }

    render() {
        const { qrs } = this.state;
        return(
            <div>
                {
                    qrs.map((item, key) => (
                        <p key = { key }>
                            { item.url_qr }
                        </p>
                    ))
                }    
            </div>
        );
    }

    componentDidMount() {
        this.getQR();
    } 

    async getQR() {
        const { result, error } = await request.get('/qrs/');
        if (result && !result.error) {
            this.setState({ qrs: result.qrs });
        } else {
            console.log(error);
        }
    }
}

export default PageQR;