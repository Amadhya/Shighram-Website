import React, {Fragment} from 'react';

import {Typography, Button, IconButton, Menu, MenuItem, ListItemIcon, ListItemText} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PaymentIcon from '@material-ui/icons/Payment';
import {Row, Col} from "./layout"
import {Router} from "../routes";
import Theme from "../constants/theme";

import styled from 'styled-components';

const NavBar = styled(Row)`
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
const DesktopButton = styled(Button)`
  @media(max-width: 768px){
    display: none !important;
  }
`;
const MobileButton = styled(MenuItem)`
  @media(min-width: 768px){
    display: none !important;
  }
`;
const BorderWrapper = styled.hr`
  color: ${Theme.lightGrey} !important;
  margin: 0px 6px !important;
`;
const BorderMobileWrapper = styled.hr`
  @media(max-width: 768px){
    color: ${Theme.lightGrey} !important;
    margin: 0px 8px !important;
    display: block !important;
  }
  display: none !important;
`;
const MenuWrapper = styled(Menu)`
  margin-top: 30px !important;
  @media(max-width: 768px){
    margin-top: 40px !important;
  }
`;

class Nav extends React.PureComponent{
  constructor(props){
    super(props);
    this.state={
      loggedIn: undefined,
      anchorEl: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      loggedIn: props.loggedIn === undefined ? props.loggedIn : (!!(typeof window !== 'undefined' && localStorage.getItem('token'))),
    }
  }

  handleMenu = event => {
    this.setState({
      anchorEl: event.target,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleLogout = () => {
    this.handleClose();
    this.props.handleLogout()
  };

  handleSettings = () => {
    this.handleClose();
    Router.pushRoute('settings');
  };

  handleHome = () => {
    Router.pushRoute('slots_view');
  }

  handlePayment = () => {
    Router.pushRoute('payment');
  }

  render() {
    const {anchorEl} = this.state;

    return(
        <NavBar>
          <Col smOffset={4} sm={5} xsOffset={3} xs={6}><TypographyWrapper onClick={() => this.handleHome()} variant="h4">Suvidham</TypographyWrapper></Col>
          <Col sm={2} xs={2} justifyContent="flex-end">
            <DesktopButton color="inherit" startIcon={<PaymentIcon/>} onClick={() => this.handlePayment()}>Payment</DesktopButton>
            <Fragment>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => this.handleMenu(e)}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <MenuWrapper
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={anchorEl!==null}
                onClose={() => this.handleClose()}
              >
                <MobileButton onClick={() => this.handlePayment()}>
                  <ListItemIcon>
                    <PaymentIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Payment" />
                </MobileButton>
                <BorderMobileWrapper/>
                <MenuItem onClick={() => this.handleSettings()}>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </MenuItem>
                <BorderWrapper/>
                <MenuItem onClick={() => this.handleLogout()}>
                  <ListItemIcon>
                    <ExitToAppIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Sign out" />
                </MenuItem>
              </MenuWrapper>
            </Fragment>
          </Col>
          <style jsx>{`
          :global(body) {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
              Helvetica, sans-serif;
          }
        `}</style>
        </NavBar>
    )
  }
}

export default Nav