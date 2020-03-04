import React, { PureComponent, Fragment } from "react";
import Head from 'next/head'
import { Button, Typography, IconButton } from '@material-ui/core';
import styled from 'styled-components';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { motion } from 'framer-motion';

import {Router} from "../../routes";
import Theme from "../../constants/theme"
import {Row, Col, Separator, MotionCol, MotionRow} from "../../components/layout";
import {FormWrapper} from "../../components/form";
import {ButtonLayout} from "../../components/button";
import TextFieldInput from "../../components/textfield";
import fetchLoginDetails, {getError, getStatus, getSucces} from "../../Container/login/saga";

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
`;

const Form = [
  {
    id: 'email',
    label: 'Email',
    type: 'email',
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

const easing = [0.175, 0.85, 0.42, 0.96];

const backVariants = {
  exit: {
    x: '-100%',
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: easing
    }
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easing
    }
  }
};

class Login extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      form: {},
      isClicked: false,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { success, pending } = this.props;

    if(typeof pending !== "undefined" && !pending){
      if(typeof success !== "undefined" && success){
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
    actions.fetchLoginDetails(form);
    this.setState({
      isClicked: true,
      form: {},
    });
  };

  render() {
    const {isClicked, form} = this.state;
    console.log(form);
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
            <br />
            {isClicked && error !== null && (
                <Fragment>
                  <Typography variant="caption" color="error">
                    {error}
                  </Typography>
                  <Separator height={2}/>
                </Fragment>
            )}
            <Typography variant="body2" align="right">
              Forgot Password?
            </Typography>
            <Separator height={4}/>
            <Row alignItems="center">
              <Col sm={4} xs={4}>
                <ButtonLayout fullWidth variant="contained" color="primary" onClick={() => this.onSubmit()}>
                  Sign In
                </ButtonLayout>
              </Col>
              <Col sm={7} xs={7}>
                <Typography variant="body2" align="right" color="textSecondary">
                  Or sign in with
                </Typography>
              </Col>
              <Col sm={1} xs={1}>
                <IconButton>
                  <img src="/static/images/google_plus_icon.png"/>
                </IconButton>
              </Col>
            </Row>
          </FormWrapper>
        </LoginCol>
        <MotionCol variants={backVariants}>
          <TextWrapper component="h1" variant="h3">
            Hello Friend!
          </TextWrapper>
          <Separator height={4}/>
          <TextWrapper variant="body1">
            Enter your personal details and start journey with us.
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
});

export default connect(
    mapStateToProps,
    dispatch => ({
      actions: bindActionCreators({fetchLoginDetails}, dispatch)
    })
)(Login);
