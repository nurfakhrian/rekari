import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, withRouter } from 'react-router-dom';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/auth';

class Navbar extends Component {
    logout = (e) => {
        e.preventDefault();
        this.props.dispatch(logout());
    }

    render() {
        return (
            <nav className="navbar fixed-top navbar-toggleable-md navbar-expand-lg scrolling-navbar double-nav"
            aria-label="breadcrumb">
                <div className="float-left">
                    <a href="/#" data-activates="slide-out" className="button-collapse black-text">
                        <FontAwesomeIcon icon={faBars} />
                    </a>
                </div>
                <div className="pl-lg-3">
                    <ol className="breadcrumb clearfix d-none align-items-center d-md-inline-flex pt-0">
                        <li className="breadcrumb-item black-text">
                            <a className="disable-anchor" href="/#"><FontAwesomeIcon icon={faUser} />&nbsp;Pengguna</a>
                        </li>
                        <li className="breadcrumb-item black-text"><Link to="/operator">Operator</Link></li>
                        <li className="breadcrumb-item black-text active">Data</li>
                    </ol>
                </div>
                <ul className="nav navbar-nav nav-flex-icons ml-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdownMenuLink" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <FontAwesomeIcon icon={faUser} />&nbsp;{this.props.auth.name} ({this.props.auth.code})
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                            <a href="/#" className="dropdown-item" onClick={this.logout}>Logout</a>
                        </div>
                    </li>
                </ul>
            </nav>
        )
    }
}

const mapState = (state) => ({
    auth: state.auth
});

export default connect(mapState)(Navbar);
