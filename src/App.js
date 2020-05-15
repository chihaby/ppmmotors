import React from 'react';
import './App.css';
import Homepagelayout from './components/LandingPage';
import Posts from './components/Posts';
import Authentication from './components/Authentication';
import PostPage from './components/PostPage';
import {  Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { Footer } from './components/Footer';
import  About from './pages/about';
import  Services from './pages/services';
import  Contact from './pages/contact';

class App extends React.Component {
  render () {
      return (
        <div>
          <Homepagelayout />
          <div className="main-bg">
            <Container >
                <Authentication />
                <Switch>
                  <Route exact path="/" component={Posts} />
                  <Route exact path="/posts/:id" component={PostPage} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/services" component={Services} />
                  <Route exact path="/contact" component={Contact} />
                </Switch>
            </Container>
          </div>
          < Footer />
        </div>
      );
  }
}

export default App;
