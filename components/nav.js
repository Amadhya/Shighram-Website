import React from 'react';

import {Box, Typography, Button} from '@material-ui/core';
import {Router} from "../routes";
import Theme from "../constants/theme";

import styled from 'styled-components';

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);
  position: fixed;
  width: 100%;
  background: ${Theme.bgColor};
  color: white;
  padding: 12px 0px;
`;
const TypographyWrapper = styled(Typography)`
  &:hover {
    cursor: pointer;
  }
`;

class Nav extends React.PureComponent{
  constructor(props){
    super(props);
    this.state={
      loggedIn: undefined,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      loggedIn: props.loggedIn === undefined ? props.loggedIn : (!!(typeof window !== 'undefined' && localStorage.getItem('token'))),
    }
  }

  handleLogout = () => {
    this.props.handleLogout()
  };

  handleLogin = () => {
    Router.pushRoute('login');
  };

  handleSignUp = () => {
    Router.pushRoute('signup');
  };

  handleSettings = () => {
    Router.pushRoute('settings');
  };

  render() {
    const {loggedIn} = this.props;
    return(
        <NavBar>
          <Box flex={1}></Box>
          <Box flex={1}><Typography variant="h4">Park Smart</Typography></Box>
          {loggedIn ? (
              <Box flex={1} justifyContent="flex-end">
                <Button color="inherit" onClick={() => this.handleSettings()}>Settings</Button>
                <Button color="inherit" onClick={() => this.handleLogout()}>Sign out</Button>
              </Box>
          ):(
              <Box flex={1} justifyContent="flex-end">
                <Button color="inherit" onClick={() => this.handleLogin()}>Login</Button>
                <Button color="inherit" onClick={() => this.handleSignUp()}>Sign Up</Button>
              </Box>
          )}
          <style jsx>{`
          :global(body) {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
              Helvetica, sans-serif;
          }
          a{
            color: white;
            text-decoration: none;
            margin-right: 24px;
          }
        `}</style>
        </NavBar>
    )
  }
}

export default Nav