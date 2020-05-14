import React , { Component, createContext } from 'react';
import { storage } from '../firebase';
// import { collectIdsAndDocs } from '../utilities';

export const ImagesContext = createContext();

class ImagesProvider extends Component {
  state = { 
    image: null,
    url: "",
    progress: 0
  }

  unsubscribeFromStorage = null;

  componentDidMount = async () => {
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
          console.log("url: ",this.state.url)
      }
    );
  }

  componentWillUnmount = () => {
    this.unsubscribeFromStorage();
  }

    render() {
      const { url } = this.state;
      const { children } = this.props;

      return (
        <ImagesContext.Provider value={url}>
          {children}
        </ImagesContext.Provider>
      )
    }

}

export default ImagesProvider;