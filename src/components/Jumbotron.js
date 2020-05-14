import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { signInWithGoogle } from '../firebase';
import car from '../images/car.png';
import Navbar from './Navbar';

const Jumbo = (props) => {
  return (
    <div>
      <Jumbotron className='Jumbo-background'>
        <div>
        <p className="lead">
          <Button className="login-button" onClick={signInWithGoogle} color="primary">Login</Button>
        </p>
        <img className="photo-bio" src={car} alt="avatar"/>
        <h3 className="display-3">Park Plaza Motors</h3>
        <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
        </div>
        <div >
          <Navbar />
        </div>
      </Jumbotron>
    </div>
  );
};

export default Jumbo;