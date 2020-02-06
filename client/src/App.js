import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';
import Container from './components/common/Container';
import Card from './components/common/Card';
import Footer from './components/common/Footer';

import "./App.scss";

import Login from './components/Login';


function App(props) {
    const loged = (
        <Router>
            <header>
                <Sidebar />
                <Navbar />
            </header>
            <main>
                <Container>
                    <Route 
                        exact path="/" 
                        render={(props) => <Card {...props} title={"Operator"} />}
                    />
                    <Route 
                        exact path="/operator" 
                        render={(props) => <Card {...props} title={"Operator"} />}
                    />
                </Container>
            </main>
            <Footer />
        </Router>
    );
    const unloged = (
        <Container>
            <Login />
        </Container>
    )

    return props.store.auth ? loged : unloged;

    // return (
    //     <Provider store={store}>
    //         <Router>
    //             {unloged}
    //             {this.props.auth ? loged : unloged}
    //             {/* <div className="App">
    //                 <Navbar />
    //                 <Route exact path="/" component={Landing} />
    //                 <div className="container">
    //                     <Route exact path="/operator/register" component={Register} />
    //                     <Route exact path="/operator/login" component={Login} />
    //                     <Route exact path="/detail" component={Detail} />
    //                 </div>
    //             </div> */}
    //         </Router>
    //     </Provider>
    // );
}

const mapState = (state) => ({
    store: state
});

export default connect(mapState)(App);
