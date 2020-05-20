import React, {PureComponent, Fragment} from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import {Typography, Tabs, Tab, Box} from "@material-ui/core";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import History from "./history";
import Security from "./security";
import {FlexView, Separator, Col, Container} from "../../components/layout";
import Theme from "../../constants/theme";
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
const TabsWrapper = styled(Tabs)`
  border-bottom: 1px solid ${Theme.grey};
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box paddingTop={3} paddingLeft={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

class Settings extends PureComponent{

  constructor(props){
    super(props);
    this.state={
      form: {},
      isClicked: false,
      value: 0
    };
  }

  componentDidMount(){
    const {actions} = this.props;
    actions.fetchUserDetails();
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

  onTabChange = (e,newVal) => {
    this.setState({
      value: newVal,
    })
  }

  renderDetails = () => {
    const {editError, editPending, editSuccess} = this.props;
    const {form, isClicked} = this.state;

    return (
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
      </Col>
    )
  }

  renderLoading = () => (
    <FlexView alignItcoems="center" justify="center">
      <Typography variant="body1">Loading...</Typography>
    </FlexView>
  )

  a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  render() {
    const {pending, success} = this.props;
    const {value} = this.state;

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
          <TabsWrapper value={value} onChange={(e,newVal) => this.onTabChange(e,newVal)} indicatorColor="primary" aria-label="settings tabs">
            <Tab label="General" {...this.a11yProps(0)} />
            <Tab label="Security" {...this.a11yProps(1)} />
            <Tab label="History" {...this.a11yProps(2)} />
          </TabsWrapper>
          <TabPanel value={value} index={0}>
            {typeof pending !== undefined && typeof success !== undefined && !pending && success ? this.renderDetails() : this.renderLoading()}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Security/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <History/>
          </TabPanel>
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