import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  // NavbarText
} from 'reactstrap';
import { Icon } from 'semantic-ui-react';

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar light expand="md">
        <NavbarBrand className='nav-link' href="/" >
          <Icon name='home' size='large' color='blue'/>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar style={{margin: "auto", float: 'right'}}>
            {/* <NavItem >
              <NavLink className='nav-link' href="/components/" >Family Support</NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink className='nav-link' href="/about" >About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='nav-link' href="/services" >Services</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='nav-link' href="/contact" >Contact</NavLink>
            </NavItem>
          </Nav>
          {/* <NavbarText className="button-hope">Donate</NavbarText> */}
          {/* <Button color='orange'>Donate</Button> */}
        </Collapse>
      </Navbar>

    </div>
  );
}

export default Example;