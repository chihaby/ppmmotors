import React from 'react';
import { signOut } from '../firebase';
import { Button } from 'semantic-ui-react';

const CurrentUser = ({ displayName, photoURL, email, children }) => {
  return (
    <section className="CurrentUser" style={{textAlign:'center', display: 'border-box'}}>
      <div className="CurrentUser--profile">
        {photoURL && <img src={photoURL} alt={displayName} />}
        <div className="CurrentUser--information">
          <h2>{displayName}</h2>
          <p className="email">{email}</p>
        </div>
      </div>
      <div>
        <div>{children}</div>
        <Button color='orange' onClick={signOut} >Sign Out </Button>
      </div>
    </section>
  );
};

export default CurrentUser;