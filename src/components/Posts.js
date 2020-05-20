import React, { useContext } from 'react'
import Post from './Post';
import Homepagelayout from './LandingPage';
import { PostsContext } from '../providers/PostsProvider';
import { ImagesContext } from '../providers/ImagesProvider';
import { Grid, Segment, Header, Container } from 'semantic-ui-react';

const Posts = () => {

  const posts = useContext(PostsContext);
  const images = useContext(ImagesContext)

  return (
    <div >
      <Homepagelayout />
      <Segment color='teal'>
        <Header basic="true" color='teal' size='huge' style={{textAlign: 'center'}}>Available Listings</Header>
      </Segment>
      <Container style={{marginTop: '20px'}}>
        <Grid container columns={3}>
          {posts.map(post => 
            <Grid.Column  mobile={16} tablet={8} computer={4} key={post.id}>
              <Post {...post} {...images} key={post.id} />
            </Grid.Column>          
          )} 
        </Grid>
      </Container>
      <Segment>
        <Header size='huge'></Header>
      </Segment>

    </div>
  )
}
export default Posts;