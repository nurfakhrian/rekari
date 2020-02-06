import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUserAlt,
    faPuzzlePiece,
    faThLarge} from '@fortawesome/free-solid-svg-icons';

class Sidebar extends Component {
    render() {
        return (
            <div id="slide-out" className="side-nav bg-admin-sidebar fixed">
                <ul className="custom-scrollbar">
                    <li>
                        <div className="logo-wrapper reset-border waves-light">
                            <Link to="/">
                                <img src="images/logo.png" className="img-fluid flex-center" alt="logo"></img>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <ul className="collapsible">
                            {/* <li>
                                <div className="collapsible-body d-block">
                                    <ul>
                                        <li>
                                            <a href="games.html" className="waves-effect pl-4"><FontAwesomeIcon icon={faLongArrowAltLeft} />&emsp;Back</a>
                                        </li>
                                    </ul>
                                </div>
                            </li> */}
                            <li className="active">
                                <a className="collapsible-header disable-anchor waves-effect arrow-r active">Pengguna</a>
                                <div className="collapsible-body d-block">
                                    <ul>
                                        <li>
                                            <Link to="/operator" className="waves-effect pl-4 active"><FontAwesomeIcon icon={faUserAlt} />&emsp;Operator</Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <a className="collapsible-header disable-anchor waves-effect arrow-r">Part</a>
                                <div className="collapsible-body d-block">
                                    <ul>
                                        <li>
                                            <a href="/#" className="waves-effect pl-4"><FontAwesomeIcon icon={faThLarge} />&emsp;Tipe</a>
                                        </li>
                                        <li>
                                            <a href="/#" className="waves-effect pl-4"><FontAwesomeIcon icon={faPuzzlePiece} />&emsp;Sub Part</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div className="sidenav-bg mask-strong"></div>
            </div>
        )
    }
}

export default Sidebar;
