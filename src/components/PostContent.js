import React, { useContext } from 'react';
import { firestore, storage } from '../firebase';
import { UserContext } from '../providers/UserProvider';
import { Link } from 'react-router-dom';
import { Header, Image, Segment, Icon, Grid, Menu, Divider } from 'semantic-ui-react';

const belongsToCurrentUser = (currentUser) => {
  if(!currentUser) return false;
  return currentUser.uid;
}

const PostContent = ({ id, year, make, model, mainUrl, user, imageName, firstImage, secondImage, thirdImage, firstUrl, secondUrl, thirdUrl, random, files, odometer, transmition, cylinders, vin, price, description }) => {

  const currentUser = useContext(UserContext);
  const postRef = firestore.doc(`posts/${id}`);
  const storageRef = storage.ref();
  const imageRef = storageRef.child(`images/${imageName}`);
  const fileRef0 = storageRef.child(`images/${random}/${firstImage}`);
  const fileRef1 = storageRef.child(`images/${random}/${secondImage}`);
  const fileRef2 = storageRef.child(`images/${random}/${thirdImage}`);

  console.log('files ', files)
  console.log('firstImage ', firstImage)
  console.log('secondImage ', secondImage)


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
  fileRef2.delete().catch((error) => {
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
            <Image src={firstUrl} alt="" size='medium'/>   
            <Image src={secondUrl} alt="" size='medium'/>
            <Image src={thirdUrl} alt="" size='medium'/>
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


