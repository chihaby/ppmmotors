import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostContent from './PostContent';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utilities';
import { withRouter } from 'react-router-dom';
import {
  Container,
  Menu,
  Responsive,
  Segment,
  Header,
  Visibility,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Park Plaza Motors'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Your local dealership'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}


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
    const { fixed } = this.state
    const { post } = this.state;
    return (
      <div>
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 100, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
              <Menu.Item >
                <Link to={`/`}>Home</Link>
                </Menu.Item>
                <Menu.Item >
                  <Link to={`/services`}>Services</Link>
                </Menu.Item>
                <Menu.Item > 
                  <Link to={`/contact`}>Contact Us</Link>
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>
      </Responsive>

      <section >
        {post && <PostContent {...post} />}
      </section>
      </div>
    );
  }
}


export default withRouter(PostPage);