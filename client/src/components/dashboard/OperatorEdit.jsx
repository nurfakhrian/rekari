import React, { Component } from 'react';
import Select from 'react-select';
import Card from '../common/Card';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class OperatorEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.operatorId,
            code: "",
            name: "",
            password: "",
            role: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.post('http://localhost:3028/operator/detail', { id: this.state.id })
            .then(response => {
                this.setState({
                    code: response.data.message.code,
                    name: response.data.message.name,
                    role: response.data.message.role
                });
            })
            .catch(err => console.log(err.response.data.message));
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleChangeSelect(obj) {
        this.setState({
            role: obj.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:3028/operator/edit', this.state)
            .then(response => {
                this.props.history.push("../detail/" + this.state.id)
            })
            .catch(err => console.log(err.response.data.message));
    }

    render() {
        const roleOptions = [
            { value: '', label: '-- Semua --' },
            { value: 'su', label: 'Super Admin' },
            { value: 'admin', label: 'Admin' },
            { value: 'operator', label: 'Operator' },
        ];
        return (
            <Card title={this.state.name} col={6}>
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
                            value={roleOptions.filter(option => option.value === this.state.role)}
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
                        <small className="form-text text-muted">
                            Kosongkan jika tidak ingin mengganti password.
                        </small>
                    </div>
                    <div className="d-flex">
                        <Link to="/dashboard/operator"
                            className="btn btn-cc btn-cc-white btn-cc-radius-normal ml-0 py-2 px-5">
                            <i><FontAwesomeIcon icon={faArrowLeft} /></i>&nbsp;Semua
                        </Link>
                        <button type="submit"
                            className="ml-auto btn btn-cc btn-cc-primary btn-cc-radius-normal ml-0 py-2 px-5">
                            <i><FontAwesomeIcon icon={faSave} /></i>&nbsp;Simpan
                        </button>
                    </div>
                </form>
            </Card>
        )
    }
}

export default OperatorEdit;
