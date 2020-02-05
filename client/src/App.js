import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';
import Container from './components/common/Container';
import Card from './components/common/Card';
import Footer from './components/common/Footer';

import "./App.scss";

// import Navbar from './components/Navbar';
// import Landing from './components/Landing';
import Login from './components/Login';
// import Register from './components/Register';
// import Detail from './components/Detail';

// const initialState = {
//     count: 0
// };

// function reducer(state = initialState, action) {
//     console.log('reducer', state, action);
//     return state;
// }
  
// const store = createStore(reducer);
// store.dispatch({ type: "INCREMENT" });
// store.dispatch({ type: "INCREMENT" });

import store from './store';

function App() {
    const loged = (
        <>
            <header>
                <Sidebar />
                <Navbar />
            </header>
            <main>
                <Container>
                    <Card />
                </Container>
            </main>
            <Footer />
        </>
    );
    const unloged = (
        <Container>
            <Login />
        </Container>
    )
    return (
        <Provider store={store}>
            <Router>
                {localStorage.logintoken ? loged : unloged}
                {/* <div className="App">
                    <Navbar />
                    <Route exact path="/" component={Landing} />
                    <div className="container">
                        <Route exact path="/operator/register" component={Register} />
                        <Route exact path="/operator/login" component={Login} />
                        <Route exact path="/detail" component={Detail} />
                    </div>
                </div> */}
            </Router>
        </Provider>
        
    );
}

export default App;
