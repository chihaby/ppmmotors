import React, { Component } from 'react';
import { firestore, storage, auth } from '../firebase';
import { Button, Form, TextArea, Icon, Image, Divider } from 'semantic-ui-react';

const initialState = { title: '', preview:'', content: '', url: '', progress: 0, imageName: '', titleError: '', previewError: '', contentError: '', urlError: '' };

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
    let titleError = "";
    let previewError = "";
    let contentError = "";
    let urlError = "";

    if (!this.state.title) {
      titleError = 'Title can not be blank'
    }
    if (!this.state.preview) {
      previewError = 'Preview can not be blank'
    }
    if (!this.state.content) {
      contentError = 'Content can not be blank'
    }
    if (!this.state.url) {
      urlError = 'Image not saved Click Upload button '
    }

    if (titleError || previewError || contentError || urlError ) {
      this.setState({ titleError, previewError, contentError, urlError });
      return false;
    }
    return true;
  };

  handleSubmit = event => {
    event.preventDefault(); 
    const isValid = this.validate();
    if (isValid) {
      const { title, preview, content, url, imageName, progress } = this.state;
      const { uid, displayName, email, photoURL } = auth.currentUser || {};
      const post = {
        title,
        preview,
        content,
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
    const { title, preview, content, url, progress, titleError, previewError, contentError, urlError } = this.state;
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
          <Button color='red' size='massive'
            onClick={this.handleUpload}
          >
            Upload 
          </Button>
          <br />
          <Divider/>
            <Image 
              size='large'
              src={url}
              alt=""
            />
          <div style={{fontSize: 20, color: 'red'}}>{urlError}</div>
        </div>

        <div style={{textAlign: 'center' }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <input 
                className='form'
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={this.handleChange}
              />
            </Form.Field>
            <div style={{fontSize: 20, color: 'red'}}>{titleError}</div>
            <Form.Field>
              <TextArea 
                type="text" 
                rows="5" 
                cols="60" 
                name="preview"
                placeholder="preview"
                value={preview} 
                onChange={this.handleChange}
                >
              </TextArea>
            </Form.Field>
            <div style={{fontSize: 20, color: 'red'}}>{previewError}</div>
            <Form.Field>
              <TextArea 
                type="text" 
                rows="10" 
                cols="60" 
                name="content"
                placeholder="Tell us more"
                value={content} 
                onChange={this.handleChange}
                >
              </TextArea>
            </Form.Field>
            <div style={{fontSize: 20, color: 'red'}}>{contentError}</div>
            <Button className="ui primary button" type="submit" value="Create Post">Create Post</Button>
          </Form>
        </div>
      </div>
    );
  }

  }

export default AddPost;