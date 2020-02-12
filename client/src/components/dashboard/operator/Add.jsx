import React, { Component } from 'react';
import Select from 'react-select';
import Card from '../../common/Card';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            name: "",
            password: "",
            role: "",
            selectRole: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleChangeSelect(selectRole) {
        this.setState(
            { selectRole, role: selectRole.value }
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.code && 
            this.state.name && 
            this.state.role && 
            this.state.password) {
            const { selectRole, ...newOperator } = this.state;
            axios.post('http://localhost:3028/operator/add', newOperator)
                .then(response => {
                    this.props.history.push("./detail/" + response.data.message.id)
                })
                .catch(err => console.log(err.response.data.message));
        }
        else {
            alert("Form tidak boleh kosong.");
        }
    }

    render() {
        const roleOptions = [
            { value: 'su', label: 'Super Admin' },
            { value: 'admin', label: 'Admin' },
            { value: 'operator', label: 'Operator' }
        ];
        return (
            <Card title="Tambah Data" col={6}>
                <form
                    onSubmit={this.handleSubmit}
                    noValidate>
                    <div className="form-group">
                        <label htmlFor="iCode">Code</label>
                        <input
                                id="iCode"
                                type="text"
                                className="form-control"
                                name="code"
                                value={this.state.code}
                                onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="iNama">Nama</label>
                        <input
                                id="iNama"
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="iRole">Role</label>
                        <Select
                            id="iRole"
                            placeholder="Pilih Role"
                            value={this.state.selectRole}
                            onChange={this.handleChangeSelect}
                            options={roleOptions} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="iPassword">Password</label>
                        <input
                                id="iPassword"
                                type="password"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange} />
                    </div>
                    <div className="d-flex">
                        <Link to="/dashboard/operator"
                            className="btn btn-cc btn-cc-white btn-cc-radius-normal ml-0 py-2 px-5">
                            <i><FontAwesomeIcon icon={faArrowLeft} /></i>&nbsp;Semua
                        </Link>
                        <button type="submit"
                            className="ml-auto btn btn-cc btn-cc-primary btn-cc-radius-normal ml-0 py-2 px-5">
                            <i><FontAwesomeIcon icon={faPlusSquare} /></i>&nbsp;Tambahkan
                        </button>
                    </div>
                </form>
            </Card>
        )
    }
}

export default Add;
