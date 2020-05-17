import React, { Component } from 'react';
import { firestore, storage, auth } from '../firebase';
import { Progress, Header, Button, Form, TextArea, Image, Divider, Label, Input, Message, Advertisement } from 'semantic-ui-react';

const initialState = { year: '', make: '', model: '', description:'', price: '', url: '', progress: 0, imageName: '', titleError: '', descriptionError: '',  urlError: '' };

class AddPostTwo extends Component {
  state = initialState;
  
  handleUploadChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const imageName = image.name;
      this.setState(() => ({ image, imageName }));
    }
  };

  handleUpload = e => {
    e.preventDefault(); 
    const { image } = this.state;
    const uploadTask = storage.ref(`images/file/${image.name}`).put(image);
    uploadTask.on(
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
          .ref("images/file")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
          });
      }
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
    let descriptionError = "";
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
      descriptionError = ' Price can not be blank'
    }
    if (!this.state.url) {
      urlError = 'Image not saved Click Upload button '
    }

    if (yearError || makeError ||modelError ||descriptionError || urlError || priceError) {
      this.setState({ yearError, makeError, modelError, descriptionError, urlError });
      return false;
    }
    return true;
  };

  handleSubmit = event => {
    event.preventDefault(); 
    const isValid = this.validate();
    if (isValid) {
      const { year, make, model, description, url, imageName, progress } = this.state;
      const { uid, displayName, email, photoURL } = auth.currentUser || {};
      const post = {
        year,
        make,
        model,
        description,
        url,
        imageName,
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
    const { year, make, model, cylinders, odometer, vin, transmition, description, price, color, note, url, progress, yearError, makeError, modelError, urlError, priceError } = this.state;
    return (
      <div>
        <div> 
          <Message warning>
            <Advertisement unit='banner' centered test='Salam ô Alikom!' /><br />
            <Message.Header>For consistency </Message.Header>
              <p>{'\u2022'} Upload all images in landscape view.</p>
              <p>{'\u2022'} Enter all fields for data your records.</p>
          </Message>        
          <Divider/>
          <div>
            <Progress percent={progress} indicating />
          </div>
          <Header as='h4'>Select images</Header>
          <div >
            <input type="file" required multiple onChange={this.handleUploadChange} />
          </div> 
          <br />
          <Button color='blue' size='large'
            onClick={this.handleUpload}
          >
            Save 
          </Button> (required)
          <br />
            <Image 
              size='large'
              src={url}
              alt=""
            />
          <div style={{fontSize: 20, color: 'red'}}>{urlError}</div>
          <Divider/>
        </div>
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Label as='a' basic color='blue'>Make</Label> (required)
            <br />
            <Form.Field>
              <input 
                className='form'
                type="text"
                name="make"
                placeholder="Make"
                value={make}
                onChange={this.handleChange}
              />
            </Form.Field>
            <div style={{fontSize: 20, color: 'red'}}>{makeError}</div>

            <Label as='a' basic color='blue'>Model</Label>(required)
            <br />
            <Form.Field>
              <input
                className='form'
                type="text"
                name="model"
                placeholder="Model"
                value={model}
                onChange={this.handleChange}
              />
            </Form.Field>
            <div style={{fontSize: 20, color: 'red'}}>{modelError}</div>

            <Label as='a' basic color='blue'>Year</Label>(required)
            <br />
            <Form.Field>
              <Input 
                className='form'
                type="text"
                pattern='[0-9]*'
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
                className='form'
                type="text"
                name="color"
                placeholder="color"
                value={color}
                onChange={this.handleChange}
              />
            </Form.Field>

            <Label as='a' basic color='blue'>Price</Label>(required)
            <br />
            <Form.Field>
              <input 
                className='form'
                type="text"
                pattern='[0-9]*'
                name="price"
                placeholder="price"
                value={price}
                onChange={this.handleChange}
              />
            </Form.Field>
            <div style={{fontSize: 20, color: 'red'}}>{priceError}</div>

            <Label as='a' basic color='blue'>Vin Number</Label>
            <br />
            <Form.Field>
              <input 
                className='form'
                type="text"
                pattern='[0-9]*'
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
                className='form'
                type="text"
                pattern='[0-9]*'
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
                className='form'
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
                className='form'
                type="text"
                name="transmition"
                placeholder="transmition"
                value={transmition}
                onChange={this.handleChange}
              />
            </Form.Field>

            <Label as='a' basic color='blue'>Description</Label> (Optional)
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

            <Label as='a' basic color='blue'>Additional Notes</Label> (Optional)
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