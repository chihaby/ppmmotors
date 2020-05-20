import React, { useContext } from 'react';
import { firestore, storage } from '../firebase';
import { UserContext } from '../providers/UserProvider';
import { Link } from 'react-router-dom';
import { Header, Image, Segment, Icon } from 'semantic-ui-react';
// import InnerNavbar from './InnerNavbar';

const belongsToCurrentUser = (currentUser) => {
  if(!currentUser) return false;
  return currentUser.uid;
}

const PostContent = ({ id, year, make, model, content, urls, url, user, imageName }) => {

  const currentUser = useContext(UserContext);
  const postRef = firestore.doc(`posts/${id}`);
  const storageRef = storage.ref();
  const imagesRef = storageRef.child(`images/${imageName}`);

const remove = () => {
  postRef.delete();
  imagesRef.delete().catch((error) => {
    console.error(error)
  });
  alert("Record is deleted");
}

  // const update = () => postRef.update({ title, content});

  return (
      <>
        <Segment color='teal' style={{textAlign: 'center'}}>
          <Link to={`/`}>
            <Icon name='home' size='big' color='blue'/>
          </Link>
        </Segment>
        <div>
          <Header as='h1' >{year}{' '}{make}{' '}{model}</Header>
          <div>
            <Image.Group>
              <Image src={url} alt="" size='medium' /> 
              <Image src={urls[0]} alt="" size='medium'/>   
              <Image src={urls[1]} alt="" size='medium'/>         
            </Image.Group>
          </div>
          <br />
          {content}
        </div>
        <div style={{textAlign: 'center'}}>
          <div>
            {belongsToCurrentUser(currentUser, user) && (
              <div>
                <button className="ui negative button" onClick={remove}>Delete</button>
              </div>
            )}
          </div>
        </div>
      </>
  );
};
export default PostContent;


