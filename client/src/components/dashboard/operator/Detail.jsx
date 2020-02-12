import React, { Component } from 'react';
import Card from '../../common/Card';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.operatorId,
            code: "",
            name: "",
            role: ""
        }
    }

    componentDidMount() {
        axios.post('http://localhost:3028/operator/detail', { id: this.state.id })
            .then(response => {
                const roleOptions = [
                    { value: 'su', label: 'Super Admin' },
                    { value: 'admin', label: 'Admin' },
                    { value: 'operator', label: 'Operator' }
                ];
                const myRole = roleOptions.find(o => o.value === response.data.message.role);
                this.setState({
                    code: response.data.message.code,
                    name: response.data.message.name,
                    role: myRole.label
                });
            })
            .catch(err => console.log(err.response.data.message));
    }
    
    render() {
        return (
            <Card title={this.state.name} col={6}>
                <div className="form-group">
                    <label htmlFor="iCode">Code</label>
                    <input
                            id="iCode"
                            type="text"
                            className="form-control"
                            name="code"
                            value={this.state.code} 
                            readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="iNama">Nama</label>
                    <input
                            id="iNama"
                            type="text"
                            className="form-control"
                            name="name"
                            value={this.state.name}
                            readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="iRole">Role</label>
                    <input
                            id="iRole"
                            type="text"
                            className="form-control"
                            name="role"
                            value={this.state.role}
                            readOnly />
                </div>
                <div className="d-flex">
                    <Link to="/dashboard/operator"
                        className="btn btn-cc btn-cc-white btn-cc-radius-normal ml-0 py-2 px-5">
                        <i><FontAwesomeIcon icon={faArrowLeft} /></i>&nbsp;Semua
                    </Link>
                    <Link to={{pathname: `/dashboard/operator/edit/${this.state.id}`}}
                        className="ml-auto btn btn-cc btn-cc-primary btn-cc-radius-normal ml-0 py-2 px-5">
                        <i><FontAwesomeIcon icon={faEdit} /></i>&nbsp;Edit
                    </Link>
                </div>
            </Card>
        )
    }
}

export default Detail;
