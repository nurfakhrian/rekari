import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Navbar extends Component {
    logout(e) {
        e.preventDefault();
        localStorage.removeItem('logintoken');
        this.props.history.push('/');
    }

    render() {
        const anonLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        )
        const logedLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/detail" className="nav-link">Detail</Link>
                </li>
                <li className="nav-item">
                    <a href="" onClick={this.logout.bind(this)} className="nav-link">Logout</a>
                </li>
            </ul>
        )
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarCollapse"
                    aria-controls="navbarCollapse"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
      
                <div
                className="collapse navbar-collapse justify-content-md-center"
                id="navbarCollapse"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                        </li>
                    </ul>
                    {localStorage.usertoken ? logedLink : anonLink}
                </div>
            </nav>
          )
    }
}

export default withRouter(Navbar);
