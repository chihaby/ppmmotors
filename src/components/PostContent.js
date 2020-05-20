import React, { useContext } from 'react';
import { firestore, storage } from '../firebase';
import { UserContext } from '../providers/UserProvider';
import { Link } from 'react-router-dom';
import { Header, Image, Segment, Icon, Grid, Menu } from 'semantic-ui-react';
// import InnerNavbar from './InnerNavbar';

const belongsToCurrentUser = (currentUser) => {
  if(!currentUser) return false;
  return currentUser.uid;
}

const PostContent = ({ id, year, make, model, urls, url, user, imageName, odometer, transmition, cylinders, vin, price, description }) => {

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

        <Header as='h1' style={{textAlign: 'center', color: 'teal'}}>{year}{' '}{make}{' '}{model}</Header>

        <div>
          <Image.Group>
            <Image src={url} alt="" size='medium' /> 
            <Image src={urls[0]} alt="" size='medium'/>   
            <Image src={urls[1]} alt="" size='medium'/>         
          </Image.Group>
        </div>
        <br />

        <Grid textAlign='center' columns={2} >
          <Grid.Row>
            <Grid.Column>
              <Menu fluid vertical>
                <Menu.Item className='header'>Price : &nbsp; ${price}</Menu.Item>
                <Menu.Item className='header'>Transmition : &nbsp; {transmition}</Menu.Item>
                <Menu.Item className='header'>Mileage : &nbsp; {odometer}</Menu.Item>
              </Menu>
            </Grid.Column>

            <Grid.Column>
              <Menu fluid vertical>
              <Menu.Item className='header'>Cylinders: &nbsp; {cylinders}</Menu.Item>
              <Menu.Item className='header'>Vin : &nbsp; {vin}</Menu.Item>
                <Menu.Item className='header'>Desctiption : &nbsp; {description}</Menu.Item>
              </Menu>
            </Grid.Column>
          </Grid.Row>
        </Grid>   



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


