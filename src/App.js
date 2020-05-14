import React from 'react';
import './App.css';
// import styled from 'styled-components';
import Jumbo from './components/Jumbotron';
// import ModalExampleScrollingContentForBefore from './components/BeforeModal';
// import ModalExampleScrollingContentForAfter from './components/AfterModal';
import Posts from './components/Posts';
import Authentication from './components/Authentication';
import PostPage from './components/PostPage';
// import AddPost from './components/AddPost';
// import { Footer } from './components/Footer';
import {  Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
// import Containers from './components/Containers';
import { Footer } from './components/Footer';
import  About from './pages/about';
import  Services from './pages/services';
import  Contact from './pages/contact';

class App extends React.Component {
  render () {
      return (
        <div>
          <Jumbo />
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
            {/* <Containers /> */}
          </div>
          < Footer />
        </div>
      );
  }
}

export default App;
