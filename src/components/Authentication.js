import React, { useContext } from 'react';
import CurrentUser from './CurrentUser';
import SignIn from './SignIn';
import { UserContext } from '../providers/UserProvider';
import AddPost from './AddPost';
import { Advertisement } from 'semantic-ui-react';

const Authentication = ({ loading }) => {

  const user = useContext(UserContext);
  if (loading) return null;

  return <div style={{backgroundColor: '#D3D3D3'}}>{user ? <div>
        <CurrentUser {...user}/>
        <Advertisement unit='banner' centered test='Salam ô Alikom' />
        <AddPost />
      </div> : <SignIn />}</div>;
};

export default Authentication;