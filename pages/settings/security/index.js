import React,{PureComponent, Fragment} from "react";
import {Box, Button, TextField, Typography} from "@material-ui/core";
import styled from "styled-components";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {Col, Row} from "../../../components/layout";
import fetchPasswordChange, {getError, getStatus, getSuccess} from "../../../Container/change_password/saga";

const RowWrapper = styled(Row) `
  padding: 10px 20px;
`;
const TypographySuccess = styled(Typography)`
  color: #19ce19;
`;
const MobileWrapper = styled(Col)`
  @media(max-width: 767px){
    display: none;
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
    const {current, newPassword} = this.state;

    actions.fetchPasswordChange(current, newPassword);

    this.setState({
      isClicked: true,
    })
  };

  render() {
    const {success, pending, error} = this.props;
    const {current, newPassword, rePassword, errorMatch, isClicked} = this.state;

    return(
        <div>
          <Box fontSize={20} mb={1} ml={0.5}>Change Password</Box>
          <hr/>
          <RowWrapper>
            <MobileWrapper sm={4} margin={true}>
              <Typography variant="body1">Current Password</Typography>
            </MobileWrapper>
            <Col sm={8}>
              <TextField
                  id="current-password"
                  label="Current Password"
                  type="password"
                  value={current}
                  margin="normal"
                  autoFocus={true}
                  required
                  onChange={(e) => this.handlePasswordChange(e)}
                  variant="outlined"
              />
              <br/>
              <Typography variant="caption" color="textSecondary" gutterBottom={true}>Please enter your current password</Typography>
              <br/>
            </Col>
          </RowWrapper>
          <RowWrapper>
            <MobileWrapper sm={4} margin={true}>
              <Typography variant="body1">New Password</Typography>
            </MobileWrapper>
            <Col sm={8}>
              <TextField
                  id="new-password"
                  label="New Password"
                  type="password"
                  value={newPassword}
                  margin="normal"
                  autoFocus={false}
                  required
                  onChange={(e) => this.handleNewPasswordChange(e)}
                  variant="outlined"
              />
            </Col>
          </RowWrapper>
          <RowWrapper>
            <MobileWrapper sm={4} margin={true}>
              <Typography variant="body1">Re-type Password</Typography>
            </MobileWrapper>
            <Col sm={8}>
              <TextField
                  id="re-type-password"
                  label="Re-type Password"
                  type="password"
                  value={rePassword}
                  margin="normal"
                  required
                  error={errorMatch}
                  onChange={(e) => this.handleRePasswordChange(e)}
                  variant="outlined"
              />
            </Col>
          </RowWrapper>
          <Col smOffset={4}>
            {errorMatch && (
                <Fragment>
                  <Typography variant="caption" color="error" gutterBottom={true}>Password does not match</Typography>
                  <br/>
                </Fragment>
            )}
            {isClicked && error !== null && (
                <Fragment>
                  <Typography variant="caption" color="error" gutterBottom={true}>{error}</Typography>
                  <br/>
                </Fragment>
            )}
            {isClicked && typeof pending !== undefined && typeof success !== undefined && !pending && success && error === null && (
              <TypographySuccess variant="caption">
                Password changed successfully
              </TypographySuccess>
            )}
            <br/>
            <Button variant="contained" color="primary" onClick={() => this.handlePasswordSubmit()}>Save</Button>
          </Col>
          <hr/>
        </div>
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