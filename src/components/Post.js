import React from 'react';
import { Link } from 'react-router-dom';
import {Container, Image, Button, Card } from 'semantic-ui-react';

const Post = ({ id, make, year, model,  url }) => {
  return (
      <Container>
        <Card>
          <Image src={url} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{year}{' '}{make}{' '}{model}</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/posts/${id}`}>
              <Button color="blue" className="read-more">More info</Button>
            </Link>
          </Card.Content>
        </Card>
      </Container>
  );
};
export default Post;
