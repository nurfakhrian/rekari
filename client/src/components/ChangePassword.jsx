import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';
import Card from './common/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.auth.id,
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    logout = () => {
        this.props.dispatch(logout());
        this.props.history.push('/login');
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.newPassword === this.state.confirmNewPassword) {
            axios.post(`http://${process.env.REACT_APP_API_URL || 'localhost'}:3028/operator/change-password`, this.state)
                .then(response => {
                    alert("password berhasil diubah, anda harus login kembali")
                    this.logout();
                })
                .catch(err => alert(err.response.data.message.error));
        }
        else {
            alert("Password Baru tidak cocok")
        }
    }

    render() {
        return (
            <Card title={"Change Password"} col={4}>
                <form noValidate
                    onSubmit={this.onSubmit}
                    >
                    <div className="form-group">
                        <label htmlFor="currentPassword">Password Aktif</label>
                        <input
                            id="currentPassword"
                            type="password"
                            className="form-control"
                            name="currentPassword"
                            value={this.state.currentPassword}
                            onChange={this.onChange}
                            autoFocus />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">Password Baru</label>
                        <input
                            id="newPassword"
                            type="password"
                            className="form-control"
                            name="newPassword"
                            value={this.state.password}
                            onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmNewPassword">Konfirmasi Password</label>
                        <input
                            id="confirmNewPassword"
                            type="password"
                            className="form-control"
                            name="confirmNewPassword"
                            value={this.state.password}
                            onChange={this.onChange} />
                    </div>
                    <div className="row">
                        <button type="submit" className="ml-auto btn btn-cc btn-cc-primary btn-cc-radius-normal ml-0 py-2 px-5">
                            <FontAwesomeIcon icon={faSave} />&nbsp;Save</button>
                    </div>
                </form>
            </Card>
        )
    }
}

const mapState = (state) => ({
    auth: state.auth
});

export default connect(mapState)(ChangePassword);
