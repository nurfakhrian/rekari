import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, withRouter } from 'react-router-dom';
import { 
    faBars, 
    faSignInAlt, 
    faUserAlt, 
    faTachometerAlt, 
    faBox, 
    faPuzzlePiece, 
    faThLarge, 
    faList, 
    faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/auth';
import { faPlusSquare, faEdit } from '@fortawesome/free-regular-svg-icons';

const breadcrumbData1 = [
    { name: 'dashboard', logo: faTachometerAlt, link: "/" },
    { name: 'login', logo: faSignInAlt, link: "/login" },
    { name: 'sub-assy', logo: faBox, link: "/sub-assy" }
]

const breadcrumbData2 = [
    { name: 'operator', logo: faUserAlt, link: "/dashboard/operator" },
    { name: 'tipe-part', logo: faThLarge, link: "/dashboard/tipe-part" },
    { name: 'sub-part', logo: faPuzzlePiece, link: "/dashboard/sub-part" }
]

const breadcrumbData3 = [
    { name: 'list', logo: faList },
    { name: 'add', logo: faPlusSquare },
    { name: 'edit', logo: faEdit },
    { name: 'detail', logo: faInfoCircle }
]

class Navbar extends Component {
    logout = (e) => {
        e.preventDefault();
        this.props.dispatch(logout());
        this.props.history.push('/login');
    }

    getLocation() {
        const l = document.createElement("a");
        l.href = window.location.href;
        return l;
    };

    render() {
        const pathsUri = this.getLocation().pathname.split('/');
        const breadcrumb1 = breadcrumbData1.find(o => o.name === pathsUri[1]);
        const breadcrumb2 = breadcrumbData2.find(o => o.name === pathsUri[2]);
        const breadcrumb3 = breadcrumb1.name === 'dashboard' ? breadcrumbData3.find(o => o.name === (pathsUri[3] || 'list')) : null;
        return breadcrumb1 ? (
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
                            <a href={breadcrumb1.link}><FontAwesomeIcon icon={breadcrumb1.logo} />
                                &nbsp;{breadcrumb1.name.charAt(0).toUpperCase() + breadcrumb1.name.slice(1)}
                            </a>
                        </li>
                        {breadcrumb2 &&
                        <li className="breadcrumb-item black-text">
                            <Link to={breadcrumb2.link}><FontAwesomeIcon icon={breadcrumb2.logo} />
                                &nbsp;{breadcrumb2.name.charAt(0).toUpperCase() + breadcrumb2.name.slice(1)}
                            </Link>
                        </li>}
                        {breadcrumb3 &&
                            <li className="breadcrumb-item black-text"><FontAwesomeIcon icon={breadcrumb3.logo} />
                                &nbsp;{breadcrumb3.name.charAt(0).toUpperCase() + breadcrumb3.name.slice(1)}
                            </li>}
                    </ol>
                </div>
                {this.props.auth &&
                    <ul className="nav navbar-nav nav-flex-icons ml-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdownMenuLink" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <FontAwesomeIcon icon={faUserAlt} />&nbsp;{this.props.auth.name} ({this.props.auth.code})
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                <a href="/#" className="dropdown-item" onClick={this.logout}>Logout</a>
                            </div>
                        </li>
                    </ul>
                }
            </nav>
        ) : (<></>)
    }
}

const mapState = (state) => ({
    auth: state.auth
});

export default connect(mapState)(withRouter(Navbar));
