import React from "react";
import { Helmet } from "react-helmet";
import {
  Segment,
  Icon,
  Container,
  Menu,
  Responsive,
  Header,
  Visibility
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const Contact = () => {
  return (
    <div>
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility once={false}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 100, padding: "1em 0em" }}
            vertical
          >
            <Menu size="large">
              <Container>
                <Menu.Item as="a">
                  <Link to={`/`}>Home</Link>
                </Menu.Item>
                <Menu.Item as="a">
                  <Link to={`/services`}>Services</Link>
                </Menu.Item>
                <Menu.Item as="a">
                  <Link to={`/contact`}>Contact Us</Link>
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>
      </Responsive>

      <Segment color="teal" style={{ textAlign: "center" }}>
        <Link to={`/`}>
          <Icon name="home" size="big" color="teal" />
        </Link>
      </Segment>
      <Container>
        <Header as="h2">Contact Us</Header>
        <p>Comming soon.</p>
        <br />
      </Container>
      <Container>
        <Header as="h1">Contact Us</Header>
        {/* <Header as="h3" color="blue">
          {" "}
          {"\u2022"} Phone: (316) 364-4692
        </Header> */}
        {/* <Header as="h3" color="blue">
          {" "}
          {"\u2022"} Email: webb.ddev@gmail.com
        </Header> */}
        <Header as="h3" color="blue">
          {" "}
          {/* {"\u2022"} Address: 6159 N Broadway Park City, Kansas 67219 */}
        </Header>
      </Container>
      <Helmet>
        <meta charSet="utf-8" />
        <title>contact us</title>
        <meta
          name="description"
          content={`Contact us park plaza motors in Park City Kansas`}
        />
        <link rel="canonical" href="https://ppmmotors.com/contact" />
      </Helmet>
    </div>
  );
};

export default withRouter(Contact);
