import React, { useContext } from 'react'
import Post from './Post';
import { PostsContext } from '../providers/PostsProvider';
import { Grid, Segment, Header } from 'semantic-ui-react';

const Posts = () => {

  const posts = useContext(PostsContext);


  return (
    <div style={{marginTop: '50px'}}>
      <Segment>
        <Header basic color='black' size='huge' style={{textAlign: 'center'}}>Listings</Header>
      </Segment>
      <Grid container columns={3}>
        {posts.map(post => 
          <Grid.Column  mobile={16} tablet={8} computer={4}>
            <Post {...post} key={post.id} />
          </Grid.Column>          
        )} 
      </Grid>
    </div>
  )
}
export default Posts;