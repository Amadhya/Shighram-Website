import React, {PureComponent} from "react";
import {Box, Typography} from "@material-ui/core";
import styled from "styled-components";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import Name from "./edit/name";
import Phone from "./edit/phone";
import Email from "./edit/email";
import {FlexView} from "../../../components/layout";
import fetchUserDetails, {getError, getStatus, getSuccess, getUserDetails} from "../../../Container/profile/saga";

const Wrapper = styled.div`
  padding: 10px 20px;
`;

class General extends PureComponent{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    const {actions} = this.props;
    actions.fetchUserDetails();
  }

  renderDetails = () => {
    const {userDetails} = this.props;

    return (
      <div>
        <Box fontSize={20} mb={1} ml={0.5}>General Account Settings</Box>
        <hr/>
        <Wrapper>
          <Name firstName={userDetails.firstName} lastName={userDetails.lastName}/>
          <hr/>
          <Phone phone={userDetails.phone}/>
          <hr/>
          <Email email={userDetails.email}/>
        </Wrapper>
        <hr/>
      </div>
    )
  }

  renderLoading = () => (
    <FlexView alignItems="center" justify="center">
      <Typography variant="body1">Loading...</Typography>
    </FlexView>
  )

  render(){
    const {pending, success} = this.props;

    return (
      <div>
        {typeof pending !== undefined && typeof success !== undefined && !pending && success ? this.renderDetails() : this.renderLoading()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  error: getError(state),
  pending: getStatus(state),
  success: getSuccess(state),
  userDetails: getUserDetails(state),
});

export default connect(
    mapStateToProps,
    dispatch => ({
      actions: bindActionCreators({fetchUserDetails}, dispatch)
    })
)(General);