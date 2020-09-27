import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Container, Image, Button, Card, Label } from "semantic-ui-react";

const Post = ({ id, make, year, model, price, mainUrl }) => {
  return (
    <Container>
      <Label as="a" color="teal" style={{ float: "right" }} tag>
        $ {price}
      </Label>
      <br />
      <Card>
        <Image src={mainUrl} wrapped ui={false} />
        <Card.Content>
          <Card.Header>
            {year} {make} {model}
          </Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/posts/${id}`}>
            <Button color="teal">Info</Button>
          </Link>
        </Card.Content>
      </Card>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Used cars park city kansas</title>
        <meta
          name="description"
          content={`Pre owned vehicles ${year} ${make} ${model}`}
        />
        <link rel="canonical" href="https://ppmmotors.com/" />
      </Helmet>
    </Container>
  );
};
export default Post;
