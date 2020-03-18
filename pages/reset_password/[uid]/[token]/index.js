import React, { PureComponent, Fragment } from "react";
import Head from 'next/head';
import { Button, Typography, IconButton, Container } from '@material-ui/core';
import styled from 'styled-components';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {Router} from "../../../../routes";
import Theme from "../../../../constants/theme"
import {Col, Separator, MotionCol, MotionRow} from "../../../../components/layout";
import {FormWrapper} from "../../../../components/form";
import {ButtonLayout} from "../../../../components/button";
import TextFieldInput from "../../../../components/textfield";
import fetchPasswordReset, {getError, getStatus, getSuccess} from "../../../../Container/reset_password/saga";

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
const TypographySuccess = styled(Typography)`
  color: #19ce19;
`;

const Form = [
  {
    id: 'new_password',
    label: 'New Password',
    type: 'password',
    name: 'New Password',
    autoComplete: 'password',
    autoFocus: true,
  },
  {
    id: 're_type_password',
    label: 'Re-type Password',
    type: 'password',
    name: 'Re-type Password',
    autoComplete: 'password',
    autoFocus: false,
  }
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

class ResetPassword extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      form: {},
      emptyFields: false,
      isClicked: false,
    }
  }

  handleSignIn = () => {
    this.setState({
        isClicked: false,
    })
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
    let {form} = this.state;
    const {actions, route: {query: {uid, token}}} = this.props;
    const formSize = Object.keys(form).length;

    if(formSize !== 2){
      this.setState({
        isClicked: true,
        emptyFields: true,
      });
    }else{
      form = {
        'uidb64': uid,
        'token': token,
        ...form
      }
  
      actions.fetchPasswordReset(form);
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

  render() {
    const {isClicked, form, emptyFields} = this.state;
    const {error, pending, success} = this.props;
    
    return (
      <MotionRow initial="exit" animate="enter" exit="exit">
        <Head>
          <title>Reset Password</title>
          <meta
            name="description"
            content="Suvidham is a web application to ease and enhance your parking experience. Through Suvidham, users can reserve a parking slot and pay parking fee online through our website and android app."
          />
        </Head>
        <MotionCol variants={backVariants}>
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
            Reset Password
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
            <Separator height={2}/>
            {isClicked && error !== null && (
                <Fragment>
                  <Typography variant="caption" color="error">
                    {error}
                  </Typography>
                  <Separator height={2}/>
                </Fragment>
            )}
            {isClicked && emptyFields && (
                <Fragment>
                  <Typography variant="caption" color="error">
                    Please fill all the required fields*.
                  </Typography>
                  <Separator height={2}/>
                </Fragment>
            )}
            {isClicked && typeof pending !== undefined && typeof success !== undefined && !pending && success && error === null && (
              <Fragment>
                <TypographySuccess variant="body1">Password has been successfully reset!</TypographySuccess>
                <Separator height={2}/>
              </Fragment>
            )}
            <Separator height={2}/>
            <ButtonLayout fullWidth variant="contained" color="primary" onClick={() => this.onSubmit()}>
                Reset
            </ButtonLayout>
            <Separator height={2}/>
            <MobileButtonWrapper onClick={() => this.handleSignIn()}>Back to Login.</MobileButtonWrapper>
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
});

export default connect(
    mapStateToProps,
    dispatch => ({
      actions: bindActionCreators({fetchPasswordReset}, dispatch)
    })
)(ResetPassword);
