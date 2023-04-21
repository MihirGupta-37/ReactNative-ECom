import React from 'react';

export const AuthContext = React.createContext({
  userDetails: () => {},
  userToken: () => {},
  signOut: () => {},
});
