import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faLongArrowAltLeft, 
    faHome, 
    faNewspaper, 
    faMoneyBillWaveAlt, 
    faDice } from '@fortawesome/free-solid-svg-icons';

class Sidebar extends Component {
    render() {
        return (
            <div id="slide-out" className="side-nav bg-admin-sidebar fixed">
                <ul className="custom-scrollbar">
                    <li>
                        <div className="logo-wrapper reset-border waves-light">
                            <a href="/"><img src="images/logo.png" class="img-fluid flex-center"></img></a>
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
                                <a className="collapsible-header waves-effect arrow-r active">News</a>
                                <div className="collapsible-body d-block">
                                    <ul>
                                        <li>
                                            <a href="manage.html" className="waves-effect pl-4 active"><FontAwesomeIcon icon={faNewspaper} />&emsp;News</a>
                                        </li>
                                        <li>
                                            <a href="home_banner.html" className="waves-effect pl-4"><FontAwesomeIcon icon={faHome} />&emsp;Home Banner</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <a className="collapsible-header waves-effect arrow-r">Store</a>
                                <div className="collapsible-body d-block">
                                    <ul>
                                        <li>
                                            <a href="/#" className="waves-effect pl-4"><FontAwesomeIcon icon={faMoneyBillWaveAlt} />&emsp;Currency</a>
                                        </li>
                                        <li>
                                            <a href="/#" className="waves-effect pl-4"><FontAwesomeIcon icon={faDice} />&emsp;Game Item</a>
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
