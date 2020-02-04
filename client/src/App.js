import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';
import Container from './components/common/Container';
import Card from './components/common/Card';
import Footer from './components/common/Footer';

// import Navbar from './components/Navbar';
// import Landing from './components/Landing';
// import Login from './components/Login';
// import Register from './components/Register';
// import Detail from './components/Detail';

function App() {
  return (
    <Router>
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
  );
}

export default App;
