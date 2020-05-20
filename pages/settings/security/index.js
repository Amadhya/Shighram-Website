import React,{PureComponent, Fragment} from "react";
import {Typography} from "@material-ui/core";
import styled from "styled-components";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {ButtonLayout} from ".../../../components/button";
import TextFieldInput from ".../../../components/textfield";
import {CircularProgressWrapper} from "../../../components/progress";
import {Col, Separator, Row} from "../../../components/layout";
import fetchPasswordChange, {getError, getStatus, getSuccess} from "../../../Container/change_password/saga";

const SubTitleWrapper = styled(Typography)`
  color: #1488CC !important;
`;
const TypographySuccess = styled(Typography)`
  color: #19ce19;
`;

const Form = [
  {
    id: 'current_password',
    label: 'Current Password',
    type: 'password',
    name: 'Current Password',
    autoComplete: 'Current Password',
    autoFocus: true,
  },
  {
    id: 'new_password',
    label: 'New Password',
    type: 'password',
    name: 'New Password',
    autoComplete: 'New Password',
    autoFocus: false,
  },
  {
    id: 're_type_password',
    label: 'Re-type Password',
    type: 'password',
    name: 'Re-type Password',
    autoComplete: 'Re-type Password',
    autoFocus: false,
  },
];

class Security extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      errorMatch: false,
      isClicked: false,
      emptyField: false,
      form: {
        'new_password': '',
        'current_password': '',
        're_type_password': ''
      },
      status: false,
    }
  }

  componentDidUpdate(){
    const {success, pending, error} = this.props;
    const {isClicked} = this.state;

    if(isClicked){
      if(typeof pending !== "undefined" && !pending){  
        if(typeof success !== "undefined" && success){
          this.setState({
            form: {
              'new_password': '',
              'current_password': '',
              're_type_password': ''
            },
            isClicked: false,
            status: true,
          });
        }
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

  handlePasswordSubmit = () => {
    //API call to be made
    const {actions} = this.props;
    const {form: {current_password, new_password, retype_password}} = this.state;

    if(current_password==='' || new_password==='' || retype_password===''){
      this.setState({
        emptyField: true,
      });
    }else if(new_password === retype_password){
      this.setState({
        errorMatch: true,
      });
    }else{
      actions.fetchPasswordChange(current_password, new_password);

      this.setState({
        isClicked: true,
        emptyField: false,
      });
    }
  };

  render() {
    const {success, pending, error} = this.props;
    const {errorMatch, isClicked, emptyField, form, status} = this.state;

    return(
      <Col md={6} sm={10}>
        {Form.map(obj => (
          <div key={obj.id}>
            <SubTitleWrapper variant="body1">{obj.label}</SubTitleWrapper>
            <TextFieldInput
              id={obj.id}
              label={obj.label}
              type={obj.type}
              name={obj.name}
              value={form[obj.id]}
              autoComplete={obj.autoComplete}
              autoFocus={obj.autoFocus}
              onChange={(id,v) => this.handleChange(id,v)}
              fullWidth
            />
            <Separator height={2}/>
          </div>
        ))}
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
        {status && typeof pending !== undefined && typeof success !== undefined && !pending && success && error === null && (
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
         onClick={() => this.handlePasswordSubmit()}
         endIcon={
            isClicked && !((typeof pending !== undefined && typeof success !== undefined && !pending && success) || error) 
            && 
            <CircularProgressWrapper size={18}/>
          }
        >
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