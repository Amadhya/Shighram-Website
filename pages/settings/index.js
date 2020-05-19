import React, {PureComponent, Fragment} from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import {Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import History from "./history";
import Security from "./security";
import {FlexView, Separator, Col, Container} from "../../components/layout";
import TextFieldInput from "../../components/textfield";
import {ButtonLayout} from "../../components/button";
import {CircularProgressWrapper} from "../../components/progress";
import fetchUserDetails, {getError, getStatus, getSuccess, getUserDetails} from "../../Container/profile/saga";
import fetchProfileEdit, {getError as getEditError, getStatus as getEditStatus, getSuccess as getEditSuccess} from "../../Container/edit_profile/saga";

const SubTitleWrapper = styled(Typography)`
  color: #1488CC !important;
`;
const TypographySuccess = styled(Typography)`
  color: #19ce19;
`;
const Wrapper = styled.div`
  width: 100%;
`;


const Form = [
  {
    id: 'firstName',
    label: 'First Name',
    type: 'text',
    name: 'first name',
    autoFocus: false,
  },
  {
    id: 'lastName',
    label: 'Last Name',
    type: 'text',
    name: 'last name',
    autoFocus: false,
  },
  {
    id: 'phone',
    label: 'Phone',
    type: 'text',
    name: 'phone',
    autoFocus: false,
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    name: 'email',
    autoFocus: false,
  },
];

class Settings extends PureComponent{

  constructor(props){
    super(props);
    this.state={
      form: {},
      isClicked: false,
    };
  }

  componentDidMount(){
    const {actions} = this.props;
    actions.fetchUserDetails();
  }

  componentDidUpdate(){

  }

  static getDerivedStateFromProps(props, state){
    const {userDetails} = props;
    const {form} = state;
    
    if(typeof userDetails!=="undefined" && Object.entries(form).length === 0 && form.constructor === Object){
      return {
        form: {
          ...userDetails,
        }
      }
    }

    return {...state}
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

  onUpdate = () => {
    const {form} = this.state;
    const {actions} = this.props;

    actions.fetchProfileEdit(form);

    this.setState({
      isClicked: true,
    });
  };

  renderDetails = () => {
    const {editError, editPending, editSuccess} = this.props;
    const {form, isClicked} = this.state;

    return (
      <Col mdOffset={1} md={6} smOffset={1} sm={10}>
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
        {isClicked && typeof editPending !== undefined && typeof editSuccess !== undefined && !editPending && editSuccess && editError === null && (
          <Fragment>
            <TypographySuccess variant="caption">Successfully updated!</TypographySuccess>
            <Separator height={2}/>
          </Fragment>
        )}
        {isClicked && editError !== null && (
          <Fragment>
            <Typography color="error" variant="caption">{editError}</Typography>
            <Separator height={2}/>
          </Fragment>
        )}
        <ButtonLayout 
          variant="contained" 
          color="primary" 
          endIcon={
            isClicked && !((typeof editPending !== undefined && typeof editSuccess !== undefined && !editPending && editSuccess) || editError) 
            && 
            <CircularProgressWrapper size={18}/>
          }
          onClick={() => this.onUpdate()}
        >
          Update Profile
        </ButtonLayout>
        <Separator height={2}/>
      </Col>
    )
  }

  renderLoading = () => (
    <FlexView alignItcoems="center" justify="center">
      <Typography variant="body1">Loading...</Typography>
    </FlexView>
  )

  render() {
    const {pending, success} = this.props;

    return(
      <Container initial="exit" animate="enter" exit="exit">
        <Head>
          <title>Settings</title>
          <meta
            name="description"
            content="Suvidham is a web application to ease and enhance your parking experience. Through Suvidham, users can reserve a parking slot and pay parking fee online through our website and android app."
          />
        </Head>
        <Col smOffset={1} sm={9} xs={12}>
          <Typography variant="h5">Settings</Typography>
          <Separator height={2}/>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="general-header"
            >
              <Typography>General</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Wrapper>
                {typeof pending !== undefined && typeof success !== undefined && !pending && success ? this.renderDetails() : this.renderLoading()}
              </Wrapper>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="security-header"
            >
              <Typography>Security</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Security/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="history-header"
            >
              <Typography>Parking History</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <History/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Col>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  error: getError(state),
  pending: getStatus(state),
  success: getSuccess(state),
  userDetails: getUserDetails(state),
  editError: getEditError(state),
  editSuccess: getEditSuccess(state),
  editPending: getEditStatus(state),
});

export default connect(
    mapStateToProps,
    dispatch => ({
      actions: bindActionCreators({fetchUserDetails, fetchProfileEdit}, dispatch)
    })
)(Settings);