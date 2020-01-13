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

class Phone extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      phone: this.props.phone,
      edit: false,
      isClicked: false,
    };
  }

  editPhoneClick = () => {
    this.setState({
      edit: true,
    });
  };

  handleEditPhone = (e) => {
    this.setState({
      phone: e.target.value,
    });
  };

  handlePhoneSave = () => {
    //API Call to be made
    const {phone} = this.state;
    const {actions} = this.props;

    actions.fetchProfileEdit({'phone': phone});

    this.setState({
      isClicked: true,
    });
  };

  render() {
    const {edit, phone, isClicked} = this.state;
    const {success, pending, error} = this.props;

    if(!edit){
      return(
        <Row justify="space-between">
          <Col sm={4}>
            <Typography variant="body1">Phone</Typography>
          </Col>
          <Col sm={4}>
            <Typography variant="body1" color="textSecondary">{phone}</Typography>
          </Col>
          <Col sm={4}>
            <EditWrapper variant="body1" color="primary" align="right" onClick={() => this.editPhoneClick()}>Edit</EditWrapper>
          </Col>
        </Row>
      )
    }else{
      return (
        <RowWrapper>
          <Col sm={4}>
            <Typography variant="body1">Phone</Typography>
          </Col>
          <Col sm={8}>
            <TextField
                id="phone"
                label="Phone"
                type="text"
                value={phone}
                margin="normal"
                autoFocus={true}
                required
                onChange={(e) => this.handleEditPhone(e)}
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
            <Button variant="contained" color="primary" onClick={() => this.handlePhoneSave()}>Save</Button>
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
)(Phone);