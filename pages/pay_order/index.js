import React, { PureComponent, Fragment } from "react";
import Head from 'next/head';
import { Button, Typography } from '@material-ui/core';
import styled from 'styled-components';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { GoogleLogin } from 'react-google-login';

import Theme from "../../constants/theme"
import {Row, Col, Separator, MotionCol, MotionRow} from "../../components/layout";
import {FormWrapper} from "../../components/form";
import {ButtonLayout} from "../../components/button";
import TextFieldInput from "../../components/textfield";
import fetchPayDetails, {getError, getStatus, getSucces} from "../../Container/create_payment/saga";

const LoginCol = styled(Col)`
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
`;
const TitleWrapper = styled(Typography)`
  color: ${Theme.primaryColor} !important;
  @media(max-width: 769px){
    font-size: 41px !important;
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
    id: 'rfid',
    label: 'rfid',
    type: 'text',
    name: 'rfid',
    autoComplete: 'rfid',
    autoFocus: true,
  },
  {
    id: 'location',
    label: 'location',
    type: 'text',
    name: 'location',
    autoComplete: 'location',
    autoFocus: false,
  },
  {
    id: 'slot_number',
    label: 'slot',
    type: 'text',
    name: 'slot',
    autoComplete: 'slot',
    autoFocus: false,
  },
  {
    id: 'amount',
    label: 'amount',
    type: 'text',
    name: 'amount',
    autoComplete: 'amount',
    autoFocus: false,
  },
];

class PayOrder extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      form: {
        'rfid': '',
        'location': '',
        'slot_number': '',
        'amount': '',
      },
      emptyFields: false,
      isClicked: false,
      googleLoginError: false,
    }
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

    actions.fetchPayDetails(form);
    this.setState({
    isClicked: true,
    emptyFields: false,
    googleLoginError: false,
    form: {
        'rfid': '',
        'location': '',
        'slot_number': '',
        'amount': '',
    },
    });
  };
  render() {
    const {isClicked, form, emptyFields, googleLoginError} = this.state;
    const {error, googleError} = this.props;
    
    return (
      <MotionRow initial="exit" animate="enter" exit="exit">
        <Head>
          <title>Pay Order</title>
          <meta
            name="description"
            content="Suvidham is a web application to ease and enhance your parking experience. Through Suvidham, users can reserve a parking slot and pay parking fee online through our website and android app."
          />
        </Head>
        <LoginCol sm={7} md={8} xs={12} align="center">
          <TitleWrapper component="h1" variant="h2">
            Pay Order
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
            {googleLoginError || googleError && (
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
                  clientId={process.env.CLIENT_ID}
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
      actions: bindActionCreators({fetchPayDetails}, dispatch)
    })
)(PayOrder);
