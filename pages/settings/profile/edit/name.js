import React, {PureComponent, Fragment} from "react";
import {Button, Typography} from "@material-ui/core";
import styled from "styled-components";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import TextFieldInput from ".../../../components/textfield";
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

const Form = [
  {
    id: 'firstName',
    label: 'First Name',
    type: 'text',
    name: 'first name',
    autoFocus: true,
  },
  {
    id: 'lastName',
    label: 'Last Name',
    type: 'text',
    name: 'last name',
    autoFocus: false,
  },
];

class Name extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      form: {
        firstName: this.props.firstName,
        lastName: this.props.lastName,
      },
      edit: false,
    };
  }

  editNameClick = () => {
    this.setState({
      edit: true,
    });
  };

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

  onSave = () => {
    const {form} = this.state;
    const {actions} = this.props;

    actions.fetchProfileEdit(form);

    this.setState({
      isClicked: true,
    });
  };

  render() {
    const {edit, form, isClicked} = this.state;
    const {success, pending, error} = this.props;

    if(!edit){
      return(
          <Row justify="space-between">
            <Col sm={4}>
              <Typography variant="body1">Name</Typography>
            </Col>
            <Col sm={4}>
              <Typography variant="body1" color="textSecondary">{form.firstName+' '+form.lastName}</Typography>
            </Col>
            <Col sm={4}>
              <EditWrapper variant="body1" color="primary" align="right" onClick={() => this.editNameClick()}>Edit</EditWrapper>
            </Col>
          </Row>
      )
    }else{
      return (
          <RowWrapper>
            <Col sm={4}>
              <Typography variant="body1">Name</Typography>
            </Col>
            <Col sm={4}>
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
              <Button variant="contained" color="primary" onClick={() => this.onSave()}>Save</Button>
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
)(Name);