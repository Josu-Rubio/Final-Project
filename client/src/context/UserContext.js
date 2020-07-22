import React from 'react';

const UserContext = React.createContext();

export default function withUserContext(Component) {
  return function WithUserContext(props) {
    return (
      <UserContext.Consumer>
        {(userContextValue) => <Component {...props} {...userContextValue} />}
      </UserContext.Consumer>
    );
  };
}
