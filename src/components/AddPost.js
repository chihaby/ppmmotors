import React, { Component } from 'react';
import { firestore, storage, auth } from '../firebase';
import { Button, Form, TextArea, Icon, Image, Divider, Label } from 'semantic-ui-react';

const initialState = { year: '', make: '', model: '', description:'', price: '', url: '', progress: 0, imageName: '', titleError: '', descriptionError: '',  urlError: '' };

class AddPost extends Component {
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
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
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
          .ref("images")
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
      this.setState({ initialState });
    };
  };

  render() {
    const { year, make, model, description, url, progress, yearError, makeError, modelError, cylinders, odometer, transmition, price, urlError, priceError } = this.state;
    return (
      <div>
        <div> 
          <div>
            <progress value={progress} max="100" className="progress" />
          </div>
          <br />
          <div >
            <Icon name='image' size='large' color='blue'/>
            <input type="file" required multiple onChange={this.handleUploadChange} />
          </div> 
          <br />
          <Button color='primary' size='large'
            onClick={this.handleUpload}
          >
            Upload 
          </Button> (required)
          <br />
          <Divider/>
            <Image 
              size='large'
              src={url}
              alt=""
            />
          <div style={{fontSize: 20, color: 'red'}}>{urlError}</div>
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
              <input 
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

            <Label as='a' basic color='blue'>Description</Label>
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

            <Button className="ui primary button" type="submit" value="Create Post" size='massive'>Create Posting</Button>
          </Form>
        </div>
      </div>
    );
  }

  }

export default AddPost;