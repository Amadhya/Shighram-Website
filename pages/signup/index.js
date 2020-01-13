import React, {Fragment, PureComponent} from "react";
import { Button, Typography, Avatar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import styled from 'styled-components';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Head from "next/dist/next-server/lib/head";

import {FormWrapper} from "../../components/form";
import {Router} from "../../routes";
import {Card, Container} from "../../components/layout";
import TextFieldInput from "../../components/textfield";
import fetchSignUpDetails, {getSuccess, getError, getStatus} from "../../Container/signup/saga";

const AvatarWrapper = styled(Avatar)`
  margin: 5px;
  background-color: #f50057 !important;
`;

const Form = [
  {
    id: 'firstName',
    label: 'First Name',
    type: 'text',
    name: 'First Name',
    autoComplete: 'fisrtName',
    autoFocus: true,
  },
  {
    id: 'lastName',
    label: 'Last Name',
    type: 'text',
    name: 'Last Name',
    autoComplete: 'lastName',
    autoFocus: false,
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
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


class SignUp extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      isClicked: false,
      form: {
        phone: "",
      },
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { success, pending } = this.props;

    if(typeof pending !== "undefined" && !pending){
      if(typeof success !== "undefined" && success){
        Router.pushRoute('feed');
      }
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

    actions.fetchSignUpDetails(form);
    this.setState({
      isClicked: true,
      form: {
        phone: "",
      },
    });
  };

  render() {
    const {isClicked, form} = this.state;
    const {error} = this.props;

    return (
        <Container justify="center">
          <Head>
            <title>Sign Up</title>
          </Head>
          <Card reverse={true} alignItems="center">
            <AvatarWrapper>
              <LockOutlinedIcon/>
            </AvatarWrapper>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
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
                    <br/>
                  </Fragment>
              )}
              <Button variant="contained" color="primary" onClick={() => this.onSubmit()}>
                Sign Up
              </Button>
            </FormWrapper>
          </Card>
        </Container>
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
      actions: bindActionCreators({fetchSignUpDetails}, dispatch)
    })
)(SignUp);
