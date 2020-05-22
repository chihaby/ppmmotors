import React, { useContext } from 'react';
import { firestore, storage } from '../firebase';
import { UserContext } from '../providers/UserProvider';
import { Link } from 'react-router-dom';
import { Header, Image, Segment, Icon, Grid, Menu, Divider } from 'semantic-ui-react';

const belongsToCurrentUser = (currentUser) => {
  if(!currentUser) return false;
  return currentUser.uid;
}

const PostContent = ({ id, year, make, model, urls, mainUrl, user, imageName, random, files, odometer, transmition, cylinders, vin, price, description }) => {

  const currentUser = useContext(UserContext);
  const postRef = firestore.doc(`posts/${id}`);
  const storageRef = storage.ref();
  const imageRef = storageRef.child(`images/${imageName}`);
  const fileRef0 = storageRef.child(`images/${random}/${files[0]}`);
  const fileRef1 = storageRef.child(`images/${random}/${files[1]}`);

  console.log('files ', files)


const remove = () => {
  postRef.delete();
  imageRef.delete().catch((error) => {
    console.error(error)
  });
  fileRef0.delete().catch((error) => {
    console.error(error)
  });
  fileRef1.delete().catch((error) => {
    console.error(error)
  });
}

  return (
      <>
        <Segment color='teal' style={{textAlign: 'center'}}>
          <Link to={`/`}>
            <Icon name='home' size='big' color='teal'/>
          </Link>
        </Segment>

        <Header as='h1' style={{textAlign: 'center', color: 'teal'}}>{year}{' '}{make}{' '}{model}</Header>

        <div>
          <Image.Group>
          <Image src={mainUrl} alt="" size='medium'/> 
            <Image src={urls[0]} alt="img" size='medium'/>   
            <Image src={urls[1]} alt="img" size='medium'/>
            <Image src={urls[2]} alt="img" size='medium'/>
            <Image src={urls[3]} alt="" size='medium'/>
            <Image src={urls[4]} alt="" size='medium'/>
            <Image src={urls[5]} alt="" size='medium'/>      
            <Image src={urls[6]} alt="" size='medium'/>   
            <Image src={urls[7]} alt="" size='medium'/>
          </Image.Group>
        </div>
        <br />

        <Grid textAlign='center' columns={2} >
          <Grid.Row>
            <Grid.Column>
              <Menu fluid vertical>
                <Menu.Item className='header'>Transmition : &nbsp; {transmition}</Menu.Item>
                <Menu.Item className='header'>Mileage : &nbsp; {odometer}</Menu.Item>
                <Menu.Item className='header'>Price : &nbsp; ${price}</Menu.Item>
              </Menu>
            </Grid.Column>

            <Grid.Column>
              <Menu fluid vertical>
              <Menu.Item className='header'>Cylinders: &nbsp; {cylinders}</Menu.Item>
              <Menu.Item className='header'>Vin number: &nbsp; {vin}</Menu.Item>
                <Menu.Item className='header'>Description : &nbsp; {description}</Menu.Item>
              </Menu>
            </Grid.Column>
          </Grid.Row>
        </Grid>   
        <br />

        <Divider />
          <div style={{textAlign: 'center'}}>
            <Segment color='grey'>Private notes :</Segment>
            <div>
              {belongsToCurrentUser(currentUser, user) && (
                <div>
                  <button className="ui negative button" onClick={remove}>Delete Listing</button>
                </div>
              )}
            </div>
          </div>
        <Divider />
      </>
  );
};
export default PostContent;


