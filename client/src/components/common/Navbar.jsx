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
    faInfoCircle,
    faKey,
    faCogs} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/auth';
import { faPlusSquare, faEdit } from '@fortawesome/free-regular-svg-icons';

const breadcrumbData1 = [
    { name: 'dashboard', label: "Dashboard", logo: faTachometerAlt, link: "/" },
    { name: 'login', label: "Login", logo: faSignInAlt, link: "/login" },
    { name: 'sub-assy', label: "Sub Assy", logo: faBox, link: "/sub-assy" },
    { name: 'account', label: "Account", logo: faCogs, link: "/account/change-password" },
]

const breadcrumbData2 = [
    { name: 'operator', label: "Operator", logo: faUserAlt, link: "/dashboard/operator" },
    { name: 'tipe-part', label: "Tipe Part", logo: faThLarge, link: "/dashboard/tipe-part" },
    { name: 'sub-part', label: "Sub Part", logo: faPuzzlePiece, link: "/dashboard/sub-part" },
    { name: 'work-subassy', label: "Work (Sub Assy)", logo: faBox, link: "/dashboard/work-subassy" },
    { name: 'change-password', label: "Change Password", logo: faKey, link: "/account/change-password" }
]

const breadcrumbData3 = [
    { name: 'list', label: "List", logo: faList },
    { name: 'add', label: "Tambah", logo: faPlusSquare },
    { name: 'edit', label: "Edit", logo: faEdit },
    { name: 'detail', label: "Detil", logo: faInfoCircle }
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
        const pathname = this.getLocation().pathname.startsWith("/") ? this.getLocation().pathname : "/" + this.getLocation().pathname;
        const pathsUri = pathname.split('/');
        const breadcrumb1 = breadcrumbData1.find(o => o.name === pathsUri[1]);
        const breadcrumb2 = breadcrumbData2.find(o => o.name === pathsUri[2]);
        const breadcrumb3 = (breadcrumb1 && breadcrumb1.name === 'dashboard') ? breadcrumbData3.find(o => o.name === (pathsUri[3] || 'list')) : null;
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
                                &nbsp;{breadcrumb1.label}
                            </a>
                        </li>
                        {breadcrumb2 &&
                        <li className="breadcrumb-item black-text">
                            <Link to={breadcrumb2.link}><FontAwesomeIcon icon={breadcrumb2.logo} />
                                &nbsp;{breadcrumb2.label}
                            </Link>
                        </li>}
                        {breadcrumb3 &&
                            <li className="breadcrumb-item black-text"><FontAwesomeIcon icon={breadcrumb3.logo} />
                                &nbsp;{breadcrumb3.label}
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
                                <Link to="/account/change-password" className="dropdown-item">Change Password</Link>
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
