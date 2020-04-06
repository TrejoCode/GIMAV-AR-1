import React, { Component } from 'react';
// HTTP CLient
import Request from '../utils/http';
const request = new Request();

class PageUSER extends Component {

    state = {
        users: []
    }

    render() {
        const { users } = this.state;
        return(
            <div>
                {
                    users.map((item, key) => (
                        <p key = { key }>
                            { item.email }
                        </p>
                    ))
                }    
            </div>
        );
    }

    componentDidMount() {
        this.getUSER();
    } 

    async getUSER() {
        const { result, error } = await request.get('/users/');
        if (result && !result.error) {
            this.setState({ users: result.users });
        } else {
            console.log(error);
        }
    }    
}

export default PageUSER;