import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

class Navbar extends Component {
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
                            <a href="games.html"><FontAwesomeIcon icon={faGamepad} />&nbsp;Games</a>
                        </li>
                        <li className="breadcrumb-item black-text"><a href="game_description.html">Kota Kita</a></li>
                        <li className="breadcrumb-item black-text active">News</li>
                    </ol>
                </div>
                <ul className="nav navbar-nav nav-flex-icons ml-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdownMenuLink" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <FontAwesomeIcon icon={faUser} />&nbsp;sa@seeddata.com
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="/#">My Account</a>
                            <a className="dropdown-item" href="/#">Log Out</a>
                        </div>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;
