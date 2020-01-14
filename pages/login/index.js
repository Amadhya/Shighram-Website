import React, { PureComponent, Fragment } from "react";
import Head from 'next/head'
import { Button, Typography, Avatar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import styled from 'styled-components';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {Router} from "../../routes";
import Theme from "../../constants/theme"
import {Card, Container} from "../../components/layout";
import {FormWrapper} from "../../components/form";
import TextFieldInput from "../../components/textfield";
import fetchLoginDetails, {getError, getStatus, getSucces} from "../../Container/login/saga";

const AvatarWrapper = styled(Avatar)`
  margin: 5px;
  background-color: #f50057 !important;
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
        <Container justify="center">
          <Head>
            <title>Log In</title>
          </Head>
          <Card reverse={true} alignItems="center">
            <AvatarWrapper>
              <LockOutlinedIcon/>
            </AvatarWrapper>
            <Typography component="h1" variant="h5">
              Log in
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
                Log In
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
  success: getSucces(state),
});

export default connect(
    mapStateToProps,
    dispatch => ({
      actions: bindActionCreators({fetchLoginDetails}, dispatch)
    })
)(Login);
