import React, {Fragment, PureComponent} from "react";
import { Button, Typography, TextField, Container } from '@material-ui/core';
import styled from 'styled-components';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Head from "next/dist/next-server/lib/head";

import Theme from "../../constants/theme";
import {FormWrapper} from "../../components/form";
import {ButtonLayout} from "../../components/button";
import {Router} from "../../routes";
import {Col, Separator, MotionCol, MotionRow} from "../../components/layout";
import fetchForgotPasswordDetails, {getSuccess, getError, getStatus, getEmailVerification, getMessage} from "../../Container/forgot_password/saga";


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

class ForgotPassword extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      isClicked: false,
      email: '',
    }
  }

  handleSignIn = () => {
    this.setState({
        isClicked: false,
    })
    Router.pushRoute('login');
  }

  handleChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onSubmit = () => {
    const {email} = this.state;
    const {actions} = this.props;

    actions.fetchForgotPasswordDetails(email);
    this.setState({
      isClicked: true,
      email: '',
    });
  };

  renderEmail = () => {
      const {email, isClicked} = this.state;
      const {error} = this.props;

      return (
        <Fragment>
            <TitleWrapper component="h1" variant="h3">
                Forgot Password?
            </TitleWrapper>
            <Separator height={2}/>
            <Container maxWidth='sm'>
                <Typography variant="body1" gutterBottom color="textSecondary">
                    Don't worry! Enter your email below and we'll email you with instructions on how to reset your password.
                </Typography>
            </Container>
            <Separator height={2}/>
            <FormWrapper noValidate autoComplete="off">
            <TextField
                id="email"
                label="Email"
                type="email"
                name="email"
                value={email}
                autoComplete="email"
                autoFocus={true}
                onChange={(v) => this.handleChange(v)}
                margin="normal"
                variant="outlined"
            />
            <Separator height={2}/>
            {isClicked && error !== null && (
                <Fragment>
                  <Typography variant="caption" color="error">
                    {error}
                  </Typography>
                  <Separator height={2}/>
                </Fragment>
            )}
            <ButtonLayout variant="contained" color="primary" onClick={() => this.onSubmit()}>
                Send
            </ButtonLayout>
            <Separator height={2}/>
            <MobileButtonWrapper onClick={() => this.handleSignIn()}>Back to Login</MobileButtonWrapper>
          </FormWrapper>
        </Fragment>
      )
  }

  renderEmailSuccess = () => (
    <Fragment>
        <img src="/static/images/email_sent.png"/>
        <Separator height={2}/>
        <TitleWrapper component="h1" variant="h3">
            Email has been sent!
        </TitleWrapper>
        <Separator height={2}/>
        <Container maxWidth='sm'>
            <Typography variant="body1" gutterBottom color="textSecondary">
                {this.props.message}
            </Typography>
        </Container>
    </Fragment>
  )

  render() {
    const {pending, success, emailVerified} = this.props;
    const {isClicked} = this.state;

    return (
      <MotionRow initial="exit" animate="enter" exit="exit">
        <Head>
          <title>Forgot Password</title>
        </Head>
        <MotionCol variants={backVariants} reverse>
          <TextWrapper component="h1" variant="h3">
            Welcome Back!
          </TextWrapper>
          <Separator height={4}/>
          <TextWrapper variant="body1">
            To be connected with us, please login with your personal details.
          </TextWrapper>
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
            {
                typeof pending !== "undefined" && typeof success !== "undefined" && !pending && success && emailVerified === "true" && isClicked
                ? this.renderEmailSuccess() : this.renderEmail()
            }
        </LoginCol>
      </MotionRow>
    );
  }
}

const mapStateToProps = (state) => ({
  error: getError(state),
  pending: getStatus(state),
  success: getSuccess(state),
  emailVerified: getEmailVerification(state),
  message: getMessage(state),
});

export default connect(
    mapStateToProps,
    dispatch => ({
      actions: bindActionCreators({fetchForgotPasswordDetails}, dispatch)
    })
)(ForgotPassword);
