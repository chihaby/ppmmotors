import React, { useContext } from 'react';
import CurrentUser from './CurrentUser';
import SignIn from './SignIn';
import { UserContext } from '../providers/UserProvider';
import AddPostTwo from './AddPostTwo';
import { Advertisement } from 'semantic-ui-react';

const Authentication = ({ loading }) => {

  const user = useContext(UserContext);
  if (loading) return null;

  return <div style={{backgroundColor: '#D3D3D3', margin: '20px'}}>{user ? <div>
        <CurrentUser {...user}/>
          <Advertisement unit='banner' color='blue' centered test='Salam ô Alikom' />
        <AddPostTwo />
      </div> : <SignIn />}</div>;
};

export default Authentication;