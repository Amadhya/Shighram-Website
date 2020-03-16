import React, { PureComponent, Fragment } from "react";
import Head from 'next/head';
import { Button, Typography, IconButton } from '@material-ui/core';
import styled from 'styled-components';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { GoogleLogin } from 'react-google-login';

import {Router} from "../../routes";
import Theme from "../../constants/theme"
import {Row, Col, Separator, MotionCol, MotionRow} from "../../components/layout";
import {FormWrapper} from "../../components/form";
import {ButtonLayout} from "../../components/button";
import TextFieldInput from "../../components/textfield";
import fetchLoginDetails, {getError, getStatus, getSucces} from "../../Container/login/saga";
import fetchGoogleLoginDetails, {getError as getGoogleError, getStatus as getGoogleStatus, getSuccess as getGoogleSuccess} from "../../Container/google_login/saga";

const LoginCol = styled(Col)`
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
`;
const TextWrapper = styled(Typography)`
  color: white;
`;
const ButtonWrapper = styled(Button)`
  width: 30%;
`;
const TitleWrapper = styled(Typography)`
  color: ${Theme.primaryColor} !important;
  @media(max-width: 767px){
    font-size: 42px !important;
  }
`;
const MobileButtonWrapper = styled(Button)`
  color: #1488CC !important;
  text-transform: capitalize !important;
  @media(min-width: 767px){
    display: none !important;
  }
`;
const LinkWrapper = styled(Typography)`
  &: hover{
    cursor: pointer;
    color: ${Theme.primaryColor} !important;
  }
`;

const Form = [
  {
    id: 'email',
    label: 'Email',
    type: 'text',
    name: 'Email',
    autoComplete: 'email',
    autoFocus: true,
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    name: 'Password',
    autoComplete: 'password',
    autoFocus: false,
  },
];

const backVariants = {
  exit: {
    x: '-175%',
    opacity: 0,
    transition: {
      duration: 0.9,
    }
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
    }
  }
};

class Login extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      form: {
        'email': '',
        'password': ''
      },
      emptyFields: false,
      isClicked: false,
      googleLoginError: false,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { success, pending, googleSuccess, googlePending } = this.props;

    if(typeof pending !== "undefined" && !pending){
      if(typeof success !== "undefined" && success){
        Router.pushRoute('slots_view');
      }
    }
    if(typeof googlePending !== "undefined" && !googlePending){
      if(typeof googleSuccess !== "undefined" && googleSuccess){
        Router.pushRoute('slots_view');
      }
    }
  }

  handleSignUp = () => {
    Router.pushRoute('signup');
  }

  handleChange = (id,val) => {
    const {form} = this.state;
    let temp = {};

    temp[id]=val;
    this.setState({
      form: {
        ...form,
        ...temp,
      }
    });
  };

  onSubmit = () => {
    const {form} = this.state;
    const {actions} = this.props;

    if(form['email'] ==='' || form['password'] ===''){
      this.setState({
        isClicked: true,
        emptyFields: true,
      });
    }else{
      actions.fetchLoginDetails(form);
      this.setState({
        isClicked: true,
        emptyFields: false,
        form: {},
      });
    }
  };

  forgotPassword = () => {
    Router.pushRoute('forgot_password');
  }

  googleResponse = (response) => {
    const {actions} = this.props;
    const {accessToken} = response;

    actions.fetchGoogleLoginDetails(accessToken)
  }

  onFailure = () => {
    this.setState({
      googleLoginError: true,
    })
  }

  render() {
    const {isClicked, form, emptyFields, googleLoginError} = this.state;
    const {error} = this.props;
    
    return (
      <MotionRow initial="exit" animate="enter" exit="exit">
        <Head>
          <title>Sign In</title>
        </Head>
        <LoginCol sm={8} xs={12} align="center">
          <TitleWrapper component="h1" variant="h2">
            Sign in to Suvidham
          </TitleWrapper>
          <Separator height={4}/>
          <FormWrapper noValidate autoComplete="off">
            {Form.map(obj => (
                <TextFieldInput
                    id={obj.id}
                    label={obj.label}
                    type={obj.type}
                    name={obj.name}
                    value={form[obj.id]}
                    autoComplete={obj.autoComplete}
                    autoFocus={obj.autoFocus}
                    onChange={(id,v) => this.handleChange(id,v)}
                    key={obj.id}
                />
            ))}
            <Separator height={1}/>
            {isClicked && error !== null && (
                <Fragment>
                  <Typography variant="caption" color="error" align="left">
                    {error}
                  </Typography>
                  <Separator height={2}/>
                </Fragment>
            )}
            {googleLoginError && (
                <Fragment>
                  <Typography variant="caption" color="error" align="left">
                    There was some error signing you in with Google.
                  </Typography>
                  <Separator height={2}/>
                </Fragment>
            )}
            {isClicked && emptyFields && (
                <Fragment>
                  <Typography variant="caption" color="error" align="left">
                    Please fill all the required fields*.
                  </Typography>
                  <Separator height={2}/>
                </Fragment>
            )}
            <LinkWrapper variant="body2" align="right" onClick={() => this.forgotPassword()}>
              Forgot Password?
            </LinkWrapper>
            <Separator height={3}/>
            <Row alignItems="center">
              <Col sm={5} xs={5}>
                <ButtonLayout fullWidth variant="contained" color="primary" onClick={() => this.onSubmit()}>
                  Sign In
                </ButtonLayout>
              </Col>
              <Col sm={1} xs={1}>
                <Typography variant="body2" align="right" color="textSecondary">
                  Or
                </Typography>
              </Col>
              <Col sm={6} xs={6}>
                <GoogleLogin
                  clientId={process.env.google_client_id}
                  buttonText="Sign in with Google"
                  onSuccess={this.googleResponse}
                  onFailure={this.onFailure}
                />  
              </Col>
            </Row>
            <Separator height={2}/>
            <MobileButtonWrapper onClick={() => this.handleSignUp()}>Don't have an account? Sign Up.</MobileButtonWrapper>
          </FormWrapper>
        </LoginCol>
        <MotionCol variants={backVariants}>
          <TextWrapper component="h1" variant="h3">
            Hello Friend!
          </TextWrapper>
          <Separator height={4}/>
          <TextWrapper variant="body1">
            Enter your personal details and start your journey with us.
          </TextWrapper>
          <Separator height={8}/>
          <TextWrapper variant="body1">
            Don't have an account?
          </TextWrapper>
          <Separator height={2}/>
          <ButtonWrapper variant="outlined" color="inherit" onClick={() => this.handleSignUp()}>
            Sign Up
          </ButtonWrapper>
        </MotionCol>
      </MotionRow>
    );
  }
}

const mapStateToProps = (state) => ({
  error: getError(state),
  pending: getStatus(state),
  success: getSucces(state),
  googleError: getGoogleError(state),
  googlePending: getGoogleStatus(state),
  googleSuccess: getGoogleSuccess(state),
});

export default connect(
    mapStateToProps,
    dispatch => ({
      actions: bindActionCreators({fetchLoginDetails, fetchGoogleLoginDetails}, dispatch)
    })
)(Login);
