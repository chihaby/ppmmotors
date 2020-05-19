import React, { Component } from 'react';
import { firestore, storage, auth } from '../firebase';
import { Progress, Header, Button, Form, TextArea, Image, Divider, Label, Input, Message, Advertisement } from 'semantic-ui-react';

const initialState = { image: '', year: '', make: '', model: '', description:'', price: '', url: '', url1: '', progress: 0, titleError: '', descriptionError: '',  urlError: '' };

class AddPostTwo extends Component {
  state = initialState;
  
  handleUploadChange = e => {    
    const file = Array.from(e.target.files);
    this.setState({ file }); 
  }
  handleUpload = e => {
    e.preventDefault(); 
    const random = Math.random();
    const { file } = this.state;
    const storageRef = storage.ref();
    file.forEach( file => storageRef.child(`images/${random}/${file.name}`).put(file)
    .then(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref(`images/${random}`)
          .child(file.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
          });
      })
    );
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validate = () => {
    let yearError = "";
    let makeError = "";
    let modelError = "";
    let urlError = "";
    let priceError = "";

    if (!this.state.year) {
      yearError = 'Year can not be blank'
    }
    if (!this.state.make) {
      makeError = 'Make can not be blank'
    }
    if (!this.state.model) {
      modelError = 'Model can not be blank'
    }
    if (!this.state.price) {
      priceError = ' Price can not be blank'
    }
    if (!this.state.url) {
      urlError = 'Image not saved '
    }

    if (yearError || makeError ||modelError ||priceError || urlError || priceError) {
      this.setState({ yearError, makeError, modelError, priceError, urlError });
      return false;
    }
    return true;
  };

  handleSubmit = event => {
    event.preventDefault(); 
    const isValid = this.validate();
    if (isValid) {
      const { year, make, model, image, description, url, price, progress } = this.state;
      const { uid, displayName, email, photoURL } = auth.currentUser || {};
      const post = {
        year,
        make,
        model,
        image,
        description,
        url,
        price,
        progress,
          user: {
          uid,
          displayName,
          email,
          photoURL
        },
        createdAt: new Date(),
      }
      firestore.collection('posts').add(post);
      firestore.collection('backup').add(post);
      this.setState({ initialState });
    };
  };

  render() {
    const { year, make, model, cylinders, odometer, vin, transmition, description, price, color, note, url, url1, progress, yearError, makeError, modelError, urlError, priceError } = this.state;
    return (
      <div>
        <div> 
          <Message warning>
            <Advertisement unit='banner' centered test='Salam ô Alikom!' /><br />
            <Message.Header>For consistency </Message.Header>
              <p>
                {'\u2022'} Upload a maximum of 8 images<br />
                {'\u2022'} all images must be in landscape view.<br />
                {'\u2022'} Enter all fields for data your records.
              </p>
          </Message>        
          <Divider/>
          <div>
            <Progress percent={progress} indicating />
          </div>
          <Header as='h4'>Select images</Header>
          <input type="file" required multiple onChange={this.handleUploadChange} />
          <br />

          <Image.Group size='small'>
            <Image 
              size='small'
              src={url}
              alt=""
            />
            <Image
              size='small'
              src={url1}
              alt=""
            />
        </Image.Group>

        <br />
        <Button color='blue' size='medium'
          onClick={this.handleUpload}
        >
          Upload images 
        </Button> 
          <br />

          <div style={{fontSize: 20, color: 'red'}}>{urlError}</div>
          <Divider/>
        </div>
        <div>
          <Form onSubmit={this.handleSubmit}>
            <div>
              <Label as='a' basic color='blue'>Price</Label>
              <br />
              <Input 
                labelPosition='right' 
                type='number' 
                placeholder='Amount'
                name="price"
                value={price}
                onChange={this.handleChange}>
                <Label basic>$</Label>
                <input 
                />
                <Label>.00</Label>
              </Input>
            </div>
            <div style={{fontSize: 20, color: 'red'}}>{priceError}</div>
            <br />

            <Label as='a' basic color='blue'>Make</Label> 
            <br />
            <Form.Field>
              <input 
                type="text"
                name="make"
                placeholder="Make"
                value={make}
                onChange={this.handleChange}
              />
            </Form.Field>
            <div style={{fontSize: 20, color: 'red'}}>{makeError}</div>

            <Label as='a' basic color='blue'>Model</Label>
            <br />
            <Form.Field>
              <Input
                type="text"
                name="model"
                placeholder="Model"
                value={model}
                onChange={this.handleChange}
              />
            </Form.Field>
            <div style={{fontSize: 20, color: 'red'}}>{modelError}</div>

            <Label as='a' basic color='blue'>Year</Label>
            <br />
            <Form.Field>
              <input 
                type="number"
                name="year"
                placeholder="Year"
                value={year}
                onChange={this.handleChange}
              />
            </Form.Field>
            <div style={{fontSize: 20, color: 'red'}}>{yearError}</div>

            <Label as='a' basic color='blue'>Color</Label>
            <br />
            <Form.Field>
              <input
                type="text"
                name="color"
                placeholder="color"
                value={color}
                onChange={this.handleChange}
              />
            </Form.Field>

            <Label as='a' basic color='blue'>Vin Number</Label>
            <br />
            <Form.Field>
              <input 
                type="text"
                name="vin"
                placeholder="vin"
                value={vin}
                onChange={this.handleChange}
              />
            </Form.Field>

            <Label as='a' basic color='blue'>Cylinders</Label>
            <br />
            <Form.Field>
              <input 
                type="number"
                name="Cylinders"
                placeholder="Cylinders"
                value={cylinders}
                onChange={this.handleChange}
              />
            </Form.Field>

            <Label as='a' basic color='blue'>Odometer</Label>
            <br />
            <Form.Field>
              <input 
                type="text"
                pattern='[0-9]*'
                name="odometer"
                placeholder="odometer"
                value={odometer}
                onChange={this.handleChange}
              />
            </Form.Field>

            <Label as='a' basic color='blue'>Transmition</Label>
            <br />
            <Form.Field>
              <input 
                type="text"
                name="transmition"
                placeholder="transmition"
                value={transmition}
                onChange={this.handleChange}
              />
            </Form.Field>

            <Label as='a' basic color='blue'>Description</Label> Optional
            <br />
            <Form.Field>
              <TextArea 
                type="text" 
                rows="3" 
                cols="60" 
                name="description"
                placeholder="description"
                value={description} 
                onChange={this.handleChange}
                >
              </TextArea>
            </Form.Field>

            <Label as='a' basic color='orange'>Private Notes</Label> Optional
            <br />
            <Form.Field>
              <TextArea 
                type="text" 
                rows="3" 
                cols="60" 
                name="note"
                placeholder="Additional Notes"
                value={note} 
                onChange={this.handleChange}
                >
              </TextArea>
            </Form.Field>

            <Button className="ui primary button" type="submit" value="Create Post" size='huge'>Create a listing</Button>
          </Form>
        </div>
      </div>
    );
  }

  }

export default AddPostTwo;


// const storageRef = storage.ref();
// this.state.file.forEach((file) => {
//   storageRef.child(`images/file/${file.name}`).put(file).then(

