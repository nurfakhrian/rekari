import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';
import Container from './components/common/Container';
import Footer from './components/common/Footer';

import Operator from './components/dashboard/Operator';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';

import "./App.scss";

const App = (props) => {

    console.log('aku', props.store.auth)

    return (
        <Router>
            <header>
                <Sidebar />
                <Navbar />
            </header>
            <main>
                <Container>
                    <AnonRoute exact path="/" auth={props.store.auth} component={Login} />
                    <AnonRoute exact path="/login" auth={props.store.auth} component={Login} />
                    <PrivateRoute exact path="/dashboard/operator" auth={props.store.auth} component={Operator} />
                </Container>
            </main>
            <Footer />
        </Router>
    )
}

const mapState = (state) => ({
    store: state
});

export default connect(mapState)(App);
