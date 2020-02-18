import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';
import Container from './components/common/Container';
import Footer from './components/common/Footer';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';

import Operator from './components/dashboard/operator/List';
import OperatorAdd from './components/dashboard/operator/Add';
import OperatorEdit from './components/dashboard/operator/Edit';
import OperatorDetail from './components/dashboard/operator/Detail';

import Typepart from './components/dashboard/typepart/List';
import TypepartAdd from './components/dashboard/typepart/Add';
import TypepartEdit from './components/dashboard/typepart/Edit';
import TypepartDetail from './components/dashboard/typepart/Detail';

import Worksubassy from './components/dashboard/worksubassy/List';
import WorksubassyAdd from './components/dashboard/worksubassy/Add';
import WorksubassyDetail from './components/dashboard/worksubassy/Detail';

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
                    {/* Operator */}
                    <PrivateRoute exact path="/dashboard/operator" auth={props.store.auth} component={Operator} />
                    <PrivateRoute exact path="/dashboard/operator/add" auth={props.store.auth} component={OperatorAdd}/>
                    <PrivateRoute exact path="/dashboard/operator/detail/:operatorId" auth={props.store.auth} component={OperatorDetail}/>
                    <PrivateRoute exact path="/dashboard/operator/edit/:operatorId" auth={props.store.auth} component={OperatorEdit}/>
                    {/* Tipe */}
                    <PrivateRoute exact path="/dashboard/tipe-part" auth={props.store.auth} component={Typepart} />
                    <PrivateRoute exact path="/dashboard/tipe-part/add" auth={props.store.auth} component={TypepartAdd}/>
                    <PrivateRoute exact path="/dashboard/tipe-part/detail/:typePartId" auth={props.store.auth} component={TypepartDetail}/>
                    <PrivateRoute exact path="/dashboard/tipe-part/edit/:typePartId" auth={props.store.auth} component={TypepartEdit}/>
                    {/* Sub Assy */}
                    <PrivateRoute exact path="/dashboard/work-subassy" auth={props.store.auth} component={Worksubassy} />
                    <PrivateRoute exact path="/dashboard/work-subassy/add" auth={props.store.auth} component={WorksubassyAdd}/>
                    <PrivateRoute exact path="/dashboard/work-subassy/detail/:logpartId" auth={props.store.auth} component={WorksubassyDetail}/>
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
