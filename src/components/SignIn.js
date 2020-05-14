import React from 'react';
import { signInWithGoogle } from '../firebase';

function SignIn() {
  return <button style={{display: 'none' }}onClick={signInWithGoogle}>Sign In</button>
}

export default SignIn;