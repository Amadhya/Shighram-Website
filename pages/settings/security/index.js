import React,{PureComponent, Fragment} from "react";
import {Box, Button, TextField, Typography} from "@material-ui/core";
import styled from "styled-components";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {ButtonLayout} from ".../../../components/button";
import TextFieldInput from ".../../../components/textfield";
import {Col, Separator, Row} from "../../../components/layout";
import fetchPasswordChange, {getError, getStatus, getSuccess} from "../../../Container/change_password/saga";

const TitleWrapper = styled(Typography)`
  font-weight: 600 !important;
`;
const SubTitleWrapper = styled(Typography)`
  color: #1488CC !important;
`;
const TypographySuccess = styled(Typography)`
  color: #19ce19;
`;
const DesktopWrapper = styled.div`
  @media(max-width: 767px){
    display: none !important;
  }
`;

class Security extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      current: '',
      newPassword: '',
      rePassword: '',
      errorMatch: false,
      isClicked: false,
      emptyField: false,
    }
  }

  handlePasswordChange = (e) => {
    this.setState({
      current: e.target.value,
    });
  };

  handleNewPasswordChange = (e) => {
    this.setState({
      newPassword: e.target.value,
    });
  };

  handleRePasswordChange = (e) => {
    const {newPassword} = this.state;

    if(newPassword !== e.target.value){
      this.setState({
        errorMatch: true,
        rePassword: e.target.value,
      });
    }else{
      this.setState({
        rePassword: e.target.value,
        errorMatch: false,
      });
    }
  };

  handlePasswordSubmit = () => {
    //API call to be made
    const {actions} = this.props;
    const {current, newPassword, rePassword} = this.state;

    if(current==='' || newPassword==='' || rePassword===''){
      this.setState({
        emptyField: true,
      });
    }else{
      actions.fetchPasswordChange(current, newPassword);

      this.setState({
        isClicked: true,
        current: '',
        newPassword: '',
        rePassword: '',
        emptyField: false,
      });
    }
  };

  render() {
    const {success, pending, error, screen=''} = this.props;
    const {current, newPassword, rePassword, errorMatch, isClicked, emptyField} = this.state;

    return(
      <Col mdOffset={1} md={6} smOffset={1} sm={10}>
        <DesktopWrapper>
          <TitleWrapper variant="h4" color="textSecondary">Security</TitleWrapper>
          <Separator height={2}/>
        </DesktopWrapper>
        <Separator height={2}/>
        <SubTitleWrapper variant="body1">Current Password</SubTitleWrapper>
        <TextFieldInput
            id={"current-password"+screen}
            label="Current Password"
            type="password"
            value={current}
            autoFocus={true}
            onChange={(e) => this.handlePasswordChange(e)}
            fullWidth={true}
        />
        <Separator height={2}/>
        <SubTitleWrapper variant="body1">New Password</SubTitleWrapper>
        <TextFieldInput
            id={"new-password"+screen}
            label="New Password"
            type="password"
            value={newPassword}
            autoFocus={false}
            onChange={(e) => this.handleNewPasswordChange(e)}
            variant="outlined"
            fullWidth={true}
        />
        <Separator height={2}/>
        <SubTitleWrapper variant="body1">Re-type Password</SubTitleWrapper>
        <TextFieldInput
            id={"re-type-password"+screen}
            label="Re-type Password"
            type="password"
            value={rePassword}
            error={errorMatch}
            onChange={(e) => this.handleRePasswordChange(e)}
            variant="outlined"
            fullWidth={true}
        />
        <Separator height={2}/>
        {emptyField && (
          <Fragment>
            <Typography variant="caption" color="error" gutterBottom={true}>Please fill all the fields*</Typography>
            <Separator height={2}/>
          </Fragment>
        )}
        {errorMatch && (
            <Fragment>
              <Typography variant="caption" color="error" gutterBottom={true}>Password does not match.</Typography>
              <Separator height={2}/>
            </Fragment>
        )}
        {isClicked && typeof pending !== undefined && typeof success !== undefined && !pending && success && error === null && (
          <Fragment>
            <TypographySuccess variant="caption">Successfully updated!</TypographySuccess>
            <Separator height={2}/>
          </Fragment>
        )}
        {isClicked && error !== null && (
          <Fragment>
            <Typography color="error" variant="caption">{error}</Typography>
            <Separator height={2}/>
          </Fragment>
        )}
        <ButtonLayout variant="contained" color="primary"
         onClick={() => this.handlePasswordSubmit()}>
           Update Password
        </ButtonLayout>
        <Separator height={2}/>
      </Col>
    )
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
      actions: bindActionCreators({fetchPasswordChange}, dispatch)
    })
)(Security);