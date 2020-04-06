import React, { Component } from 'react';
// HTTP CLient
import Request from '../utils/http';
const request = new Request();

class PageAR extends Component {

    state = {
        ars: []
    }

    render() {
        const { ars } = this.state;
        return(
            <div>
                {
                    ars.map((item, key) => (
                        <p key = { key }>
                            { item.url_ar }
                        </p>
                    ))
                }    
            </div>
        );
    }

    componentDidMount() {
        this.getAR();
    } 

    async getAR() {
        const { result, error } = await request.get('/ars/');
        if (result && !result.error) {
            this.setState({ ars: result.ars });
        } else {
            console.log(error);
        }
    }    
}

export default PageAR;