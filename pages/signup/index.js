import React, {Fragment, PureComponent} from "react";
import { Button, Typography, IconButton, Container } from '@material-ui/core';
import styled from 'styled-components';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Head from "next/dist/next-server/lib/head";
import { GoogleLogin } from 'react-google-login';

import Theme from "../../constants/theme";
import {FormWrapper} from "../../components/form";
import {ButtonLayout} from "../../components/button";
import {Router} from "../../routes";
import {Row, Col, Separator, MotionCol, MotionRow} from "../../components/layout";
import TextFieldInput from "../../components/textfield";
import fetchSignUpDetails, {getSuccess, getError, getStatus} from "../../Container/signup/saga";
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
    font-size: 36px !important;
    padding-top: 20px;
  }
`;
const MobileButtonWrapper = styled(Button)`
  color: #1488CC !important;
  text-transform: capitalize !important;
  @media(min-width: 767px){
    display: none !important;
  }
`;

const Form = [
  {
    id: 'first_name',
    label: 'First Name',
    type: 'text',
    name: 'First Name',
    autoComplete: 'fisrtName',
    autoFocus: true,
  },
  {
    id: 'last_name',
    label: 'Last Name',
    type: 'text',
    name: 'Last Name',
    autoComplete: 'lastName',
    autoFocus: false,
  },
  {
    id: 'email',
    label: 'Email',
    type: 'text',
    name: 'Email',
    autoComplete: 'email',
    autoFocus: false,
  },
  {
    id: 'phone',
    label: 'Phone Number',
    type: 'text',
    name: 'Phone Number',
    autoComplete: 'phone',
    autoFocus: false,
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
    x: '175%',
    opacity: 0,
    transition: {
      duration: 0.9,
    }
  },
  enter: {
    x: '0%',
    opacity: 1,
    transition: {
      duration: 0.9,
    }
  }
};


class SignUp extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      isClicked: false,
      emptyFields: false,
      form: {
        'first_name': '',
        'last_name': '',
        'phone': '',
        'email': '',
        'password': ''
      },
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

  handleSignIn = () => {
    Router.pushRoute('login');
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

    if(form['firstName'] ==='' || form['lastName'] ==='' || form['email'] ==='' || form['password'] ==='' || form['phone'] ===''){
      this.setState({
        isClicked: true,
        emptyFields: true,
        googleLoginError: false
      });
    }else{
      actions.fetchSignUpDetails(form);
      this.setState({
        isClicked: true,
        emptyFields: false,
        googleLoginError: false,
        form: {
          'first_name': '',
          'last_name': '',
          'phone': '',
          'email': '',
          'password': ''
        },
      });
    }
  };

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
          <title>Sign Up</title>
        </Head>
        <MotionCol variants={backVariants} reverse>
          <TextWrapper component="h1" variant="h3">
            Welcome Back!
          </TextWrapper>
          <Separator height={4}/>
          <Container maxWidth='xs'>
            <TextWrapper variant="body1">
              To be connected with us, please login with your personal details.
            </TextWrapper>
          </Container>
          <Separator height={8}/>
          <TextWrapper variant="body1">
            Already have an account?
          </TextWrapper>
          <Separator height={2}/>
          <ButtonWrapper variant="outlined" color="inherit" onClick={() => this.handleSignIn()}>
            Sign in
          </ButtonWrapper>
        </MotionCol>
        <LoginCol sm={8} xs={12} align="center">
          <TitleWrapper component="h1" variant="h2">
            Create Account
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
            {isClicked && emptyFields && (
                <Fragment>
                  <Typography variant="caption" color="error" align="left">
                    Please fill all the required fields*.
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
            <Row alignItems="center">
              <Col sm={5} xs={5}>
                <ButtonLayout fullWidth variant="contained" color="primary" onClick={() => this.onSubmit()}>
                  Sign Up
                </ButtonLayout>
              </Col>
              <Col sm={1} xs={1}>
                <Typography variant="body2" align="right" color="textSecondary">
                  Or
                </Typography>
              </Col>
              <Col sm={6} xs={6}>
                <GoogleLogin
                  clientId={process.env.CLIENT_ID}
                  buttonText="Sign in with Google"
                  onSuccess={this.googleResponse}
                  onFailure={this.onFailure}
                />
              </Col>
            </Row>
            <Separator height={2}/>
            <MobileButtonWrapper onClick={() => this.handleSignIn()}>Already have an account? Sign In.</MobileButtonWrapper>
          </FormWrapper>
        </LoginCol>
      </MotionRow>
    );
  }
}

const mapStateToProps = (state) => ({
  error: getError(state),
  pending: getStatus(state),
  success: getSuccess(state),
  googleError: getGoogleError(state),
  googlePending: getGoogleStatus(state),
  googleSuccess: getGoogleSuccess(state),
});

export default connect(
    mapStateToProps,
    dispatch => ({
      actions: bindActionCreators({fetchSignUpDetails, fetchGoogleLoginDetails}, dispatch)
    })
)(SignUp);
