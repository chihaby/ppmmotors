import React from "react";
import { Grid, List, Header, Segment, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const Footer = () => (
  <Segment inverted vertical style={{ padding: "5em 0em" }}>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <List link inverted>
              <Link to={`/`}>
                <Header inverted as="h6" content="Home" />
              </Link>
            </List>
            <List link inverted>
              <Link to={`/services`}>
                <Header inverted as="h6" content="Services" />
              </Link>
            </List>
            <List>
              <Link to={`/contact`}>
                <Header inverted as="h6" content="Contact Us" />
              </Link>
            </List>
          </Grid.Column>
          {/* <Grid.Column width={3}> */}
          {/* <Header inverted as="h4" content="Web Master" /> */}
          {/* <List link inverted> */}
          {/* <List.Item as="a">Radouane Chihaby</List.Item> */}
          {/* <List.Item as="a">chihaby@gmail.com</List.Item> */}
          {/* <List.Item as='a'>DNA FAQ</List.Item>
                <List.Item as='a'>How To Access</List.Item>
                <List.Item as='a'>Favorite X-Men</List.Item> */}
          {/* </List> */}
          {/* </Grid.Column> */}
          <Grid.Column width={6}>
            <Header as="h4" inverted content="Contact" />
            {/* 
            <p>
              Comming soon
              Phone: (316) 364-4692 <br />
              Email: parkplaza19@gmail.com <br />
              Radouane Chihaby 
              Address: 6159 N Broadway, Park City, KS 67219.
            </p> */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);
