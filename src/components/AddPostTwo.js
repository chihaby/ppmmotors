import React, { Component } from 'react';
import { firestore, storage, auth } from '../firebase';
import { Progress, Header, Button, Form, TextArea, Image, Divider, Label, Input, Message, Advertisement } from 'semantic-ui-react';
var i;
const initialState = { urls: [], url: '',  mainUrl: '', mainProgress: '', random: '', year: '', make: '', model: '', vin: '', description:'', price: '', odometer: '', progress: 0, titleError: '', odometerError: '', vinError: '', urlError: '', mainUrlError: '' };
class AddPostTwo extends Component {
  state = initialState;

  handleMainUploadChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const imageName = image.name;
      this.setState(() => ({ image, imageName }));
    }
  };



  handleMainUpload = e => {
    e.preventDefault(); 
    const { image, imageName } = this.state;
    const uploadTask = storage.ref(`images/${imageName}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const mainProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ mainProgress });
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
          .then(mainUrl => {
            this.setState({ mainUrl });
          });
      }
    );
  }
  
  handleUploadChange = e => {    
    const file = Array.from(e.target.files);
    const fileName = file.name;
    this.setState({ file, fileName }); 
  }
  handleUpload = e => {

    e.preventDefault(); 
    const random = Math.random();
    const { file, urls } = this.state;
    const storageRef = storage.ref();
    file.forEach( file => storageRef.child(`images/${random}/${file.name}`).put(file)
    .on(
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
        storageRef.child(`images/${random}/${file.name}`)
          .getDownloadURL()
          .then(url => {
            urls.push(url);
            this.setState({ url, urls, random });
          })
      })
    )
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validate = () => {
    let mainUrlError = "";
    let yearError = "";
    let makeError = "";
    let modelError = "";
    let urlError = "";
    let priceError = "";
    let vinError = "";
    let odometerError = "";
    let transmitionError = "";
    let cylindersError = "";

    if (!this.state.mainUrl) {
      mainUrlError = 'Main picture can not be blank'
    }
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
      urlError = 'Images not saved '
    }
    if (!this.state.vin) {
      vinError = 'Vin number can not be empty '
    }
    if (!this.state.odometer) {
      odometerError = 'Odometer can not be empty '
    }
    if (!this.state.transmition) {
      transmitionError = 'Transmition type can not be empty '
    }
    if (!this.state.cylinders) {
      cylindersError = 'Cylinders can not be empty '
    }

    if ( mainUrlError || yearError || makeError ||modelError ||priceError || urlError || priceError || vinError || odometerError || transmitionError || cylindersError ){
      this.setState({ yearError, makeError, modelError, priceError, mainUrlError, urlError, vinError, odometerError, transmitionError, cylindersError });
      return false;
    }
    return true;
  };

  handleSubmit = e => {
    e.preventDefault();
  
    const isValid = this.validate();
    if (isValid) {
      const { year, make, model, vin, url, urls, mainUrl, imageName, random, file, price, progress, odometer, transmition, cylinders, description } = this.state;
      const { uid, displayName, email } = auth.currentUser || {};
      console.log('file ', file)
      const files = [];
      // const fileName = file.name;
      
      for (i=0; i<file.length; i++){
        files.push(file[i].name);
      }
      this.setState( { files })
      console.log('files ', files)
  
      const post = {
        year,
        make,
        model,
        imageName,
        random,
        files,
        url,
        urls,
        mainUrl,
        price,
        odometer,
        vin,
        transmition,
        cylinders,
        description,
        progress,
          user: {
          uid,
          displayName,
          email
        },
        createdAt: new Date(),
      }
      firestore.collection('posts').add(post);
      firestore.collection('backup').add(post);
      this.setState({ initialState });
    };
  };

  render() {
    const { mainUrl, mainProgress, urls, year, make, model, cylinders, odometer, vin, transmition, description, price, note, progress, yearError, makeError, modelError, urlError, mainUrlError, odometerError, transmitionError, cylindersError, priceError, vinError } = this.state;
    return (
      <div>
        <div> 
          <Message warning>
            <Advertisement unit='banner' centered test='Salam ô Alikom!' /><br />
            <Message.Header>For consistency and better use</Message.Header>
              <p>
                {'\u2022'} Upload a total of 8 photos<br />
                {'\u2022'} all photos must be in landscape view.<br />
                {'\u2022'} Make sure all fields are checked.<br />
                {'\u2022'} Refresh the page after every submition.<br />
                {'\u2022'} Don't forget to logout<br />
              </p>
          </Message> 
          <Divider/>
            <Progress percent={mainProgress} indicating />
            <Header as='h3' >Main photo</Header>
            <input type="file" required multiple onChange={this.handleMainUploadChange} />
            <div style={{textAlign: 'center'}}>
              <Image src={mainUrl} alt='' size='medium' bordered />
            </div>
            <br />
            <Button color='blue' size='medium'
              onClick={this.handleMainUpload}
            >
            Save 
          </Button> IF MAIN PICTURE IS NOT SHOWING. CLICK SAVE.
          <br />
          <div style={{fontSize: 20, color: 'red'}}>{mainUrlError}</div>
          <Divider/>
          <Divider/>
            <Progress percent={progress} indicating />
            <Header as='h3'>More photos </Header>
            <input type="file" required multiple onChange={this.handleUploadChange} />
            <br />
          <Image.Group size='small'>
            <Image 
              size='small'
              src={urls[0]}
              alt=""
            />

            <Image 
              size='small'
              src={urls[1]}
              alt=""
            />
            <Image 
              size='small'
              src={urls[2]}
              alt=""
            /> 
            <Image 
              size='small'
              src={urls[3]}
              alt=""
            />
            <Image 
              size='small'
              src={urls[4]}
              alt=""
            /> 
            <Image 
              size='small'
              src={urls[5]}
              alt=""
            />      
            <Image 
              size='small'
              src={urls[6]}
              alt=""
            /> 
            <Image 
              size='small'
              src={urls[7]}
              alt=""
            />                    
        </Image.Group>

        <br />
        <Button color='blue' size='medium'
          onClick={this.handleUpload}
        >
          Save
        </Button> IF IMAGES ARE NOT SHOWING. CLICK SAVE.
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

            <Label as='a' basic color='blue'>Odometer</Label>
            <br />
            <Form.Field>
              <input 
                type="text"
                name="odometer"
                placeholder="odometer"
                value={odometer}
                onChange={this.handleChange}
              />
            </Form.Field>
            <div style={{fontSize: 20, color: 'red'}}>{odometerError}</div>

            <Label as='a' basic color='blue'>Transmition</Label>
            <br />
            <Form.Field>
              <input 

                name="transmition"
                placeholder="transmition"
                value={transmition}
                onChange={this.handleChange}
              />
            </Form.Field>
            <div style={{fontSize: 20, color: 'red'}}>{transmitionError}</div>

            <Label as='a' basic color='blue'>Cylinders</Label>
            <br />
            <Form.Field>
              <input 
                type="text"
                name="cylinders"
                placeholder="cylinders"
                value={cylinders}
                onChange={this.handleChange}
              />
            </Form.Field>
            <div style={{fontSize: 20, color: 'red'}}>{cylindersError}</div>

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
            <div style={{fontSize: 20, color: 'red'}}>{vinError}</div>

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

            <Button className="ui primary button" type="submit" value="Create Post" size='huge'>Submit</Button>
          </Form>
        </div>
      </div>
    );
  }

  }

export default AddPostTwo;


