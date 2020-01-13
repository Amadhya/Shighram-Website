import React, {PureComponent, Fragment} from "react";
import {Button, TextField, Typography} from "@material-ui/core";
import styled from "styled-components";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {Col, Row} from "../../../../components/layout";
import fetchProfileEdit, {getError, getStatus, getSuccess} from "../../../../Container/edit_profile/saga";

const EditWrapper = styled(Typography)`
  &: hover{
    cursor: pointer;
    text-decoration: underline;
  }
`;
const RowWrapper = styled(Row) `
  background: rgb(244, 244, 244);
  padding: 10px 0px;
  margin-left: 0px;
`;
const TypographySuccess = styled(Typography)`
  color: #19ce19;
`;

class Email extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      email: this.props.email,
      edit: false,
      isClicked: false,
    };
  };

  editEmailClick = () => {
    this.setState({
      edit: true,
    });
  };

  handleEditEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handleEmailSave = () => {
    //API Call to be made
    const {email} = this.state;
    const {actions} = this.props;

    actions.fetchProfileEdit({'email': email});

    this.setState({
      isClicked: true,
    });
  };

  render() {
    const {edit, email, isClicked} = this.state;
    const {success, pending, error} = this.props;

    if(!edit){
      return(
        <Row justify="space-between">
          <Col sm={4}>
            <Typography variant="body1">Email</Typography>
          </Col>
          <Col sm={4}>
            <Typography variant="body1" color="textSecondary">{email}</Typography>
          </Col>
          <Col sm={4}>
            <EditWrapper variant="body1" color="primary" align="right" onClick={() => this.editEmailClick()}>Edit</EditWrapper>
          </Col>
        </Row>
      )
    }else{
      return (
        <RowWrapper>
          <Col sm={4}>
            <Typography variant="body1">Email</Typography>
          </Col>
          <Col sm={8}>
            <TextField
                id="email"
                label="Email"
                type="text"
                value={email}
                margin="normal"
                autoFocus={true}
                required
                onChange={(e) => this.handleEditEmail(e)}
                variant="outlined"
            />
            <br/>
            {isClicked && typeof pending !== undefined && typeof success !== undefined && !pending && success && error === null && (
              <Fragment>
                <TypographySuccess variant="caption">Name successfully chaned</TypographySuccess>
                <br/>
              </Fragment>
            )}
            {isClicked && error !== null && (
              <Fragment>
                <Typography color="error" variant="caption">{error}</Typography>
                <br/>
              </Fragment>
            )}
            <Button variant="contained" color="primary" onClick={() => this.handleEmailSave()}>Save</Button>
          </Col>
        </RowWrapper>
      )
    }
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
      actions: bindActionCreators({fetchProfileEdit}, dispatch)
    })
)(Email);