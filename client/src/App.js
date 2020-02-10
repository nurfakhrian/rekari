import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';
import Container from './components/common/Container';
import Footer from './components/common/Footer';

import Operator from './components/dashboard/Operator';
import OperatorEdit from './components/dashboard/OperatorEdit';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import SubAssy from './components/SubAssy';

import "./App.scss";

const App = (props) => {

    // console.log('aku', props.store.auth)

    return (
        <Router>
            <header>
                <Sidebar />
                <Navbar />
            </header>
            <main>
                <Container>
                    <Route 
                        exact path="/" 
                        render={(props) => <Redirect to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }} />}
                    />
                    <AnonRoute exact path="/login" auth={props.store.auth} component={Login} />
                    <AnonRoute exact path="/sub-assy" auth={props.store.auth} component={SubAssy} />
                    <PrivateRoute exact path="/dashboard/operator" auth={props.store.auth} component={Operator} />
                    <PrivateRoute exact path="/dashboard/operator/edit/:operatorId" auth={props.store.auth} component={OperatorEdit}/>
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
