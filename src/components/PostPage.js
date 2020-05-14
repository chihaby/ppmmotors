import React, { Component } from 'react';
import PostContent from './PostContent';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utilities';
import { withRouter } from 'react-router-dom';

class PostPage extends Component {
  state = { post: null, comments: [] };

  get postId() {
    return this.props.match.params.id;

  }

  get postRef() {
    return firestore.doc(`posts/${this.postId}`);
  }

  unsubscribeFromPost = null;

  componentDidMount = async () => {
    this.unsubscribeFromPost = await this.postRef.onSnapshot(snapshot => {
      const post = collectIdsAndDocs(snapshot);
      this.setState({ post });
    })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromPost();
  };

  render() {
    const { post } = this.state;
    return (
      <section className="slides body">
        {post && <PostContent {...post} />}
      </section>
    );
  }
}


export default withRouter(PostPage);