import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Image, Button } from 'semantic-ui-react';

const Post = ({ id, title, preview, url }) => {
  return (

      <>
        <div className="slides">
          <div >
            <div className="img-div">
              <Image src={url} alt="img" size='large'/>
            </div>
            <br />
            <div className="title-div">
              <Link to={`/posts/${id}`}>
                <Header as='h1' color='violet' textAlign='center' >{title}</Header>
              </Link>
            </div>
            <br />
            <div className="preview">
              {preview}
            </div>
            <br />
            <Link to={`/posts/${id}`}>
              <Button color="violet" className="read-more">Read more</Button>
            </Link>
          </div>
        </div>
      </>
  );
};
export default Post;

// style={{maxWidth: '400px', maxHeight: '400px'  }}