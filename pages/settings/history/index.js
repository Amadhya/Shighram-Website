import React, {PureComponent} from "react";
import {Typography} from "@material-ui/core";
import styled from "styled-components";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {Row, Col, Separator, FlexView} from "../../../components/layout";
import Theme from "../../../constants/theme";
import fetchPaymentHistoryDetails, {getError, getStatus, getSuccess, getPaymentHistory} from "../../../Container/payment_history/saga";

const RowWrapper = styled(Row)`
  padding: 20px 25px;
  background: ${(props) => props.bgGrey && Theme.lightGrey};
`;
const TitleWrapper = styled(Typography)`
  font-weight: 600 !important;
`;
const Card = styled(FlexView)`
  background: white;
  border-radius: 4px;
  box-shadow: 2px 2px 12px rgba(0,0,0,0.1);
  overflow: unset;
  flex-direction: column;
  margin-bottom: 20px;
  @media(max-width: 767px){
    min-width: 75%;
  }
`;
const HeaderWrapper = styled(Row)`
  padding: 30px 25px;
  box-shadow: 2px 2px 12px rgba(0,0,0,0.1);
  z-index: 1;
`;
const DesktopWrapper = styled.div`
  @media(max-width: 767px){
    display: none !important;
  }
`;
const MobileWrapper = styled.div`
  @media(min-width: 767px){
    display: none;
  }
`;
const ColWrapper = styled(Col)`
  padding: 10px 0px;
  border-bottom: 1px solid ${Theme.grey};
  margin: 0px 15px;
`;
const StatusWrapper = styled(Typography)`
  color: ${(props) => props.done ? '#32CD32' : 'red'} !important;
`;

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function dateTime (t){
  let newDate=new Date(t);

  let date = newDate.getDate();
  let month = newDate.getMonth();
  let year = newDate.getFullYear();
  let hour = newDate.getHours();
  let min = newDate.getMinutes();
  let sec = newDate.getSeconds(); 

  return `${monthNames[month]} ${date}, ${year} at ${hour}:${min}`
}

class History extends PureComponent{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    const {actions} = this.props;
    actions.fetchPaymentHistoryDetails();
  }

  render() {
    const {pending, success, history, screen=""} = this.props;

    if(!(typeof pending !== undefined && typeof success !== undefined && !pending && success))
      return (
        <Col smOffset={2} sm={9}>
          <Typography variant="body1" color="textSecondary">Loading...</Typography>
        </Col>
      )
    
    return(
      <Col mdOffset={1} md={10} smOffset={1} sm={11}>
        <DesktopWrapper>
          <TitleWrapper variant="h4" color="textSecondary">Parking History</TitleWrapper>
          <Separator height={2}/>
        </DesktopWrapper>
        <Separator height={2}/>
        <Card>
          <DesktopWrapper>
            <HeaderWrapper>
              <Col sm={3}>
                <Typography variant="body1" color="textSecondary">Location</Typography>
              </Col>
              <Col sm={2}>
                <Typography variant="body1" color="textSecondary">Charged</Typography>
              </Col>
              <Col sm={2}>
                <Typography variant="body1" color="textSecondary">RFID Number</Typography>
              </Col>
              <Col sm={1}>
                <Typography variant="body1" color="textSecondary">Slot</Typography>
              </Col>
              <Col sm={3}>
                <Typography variant="body1" color="textSecondary">Date</Typography>
              </Col>
              <Col sm={1}>
                <Typography variant="body1" color="textSecondary">Status</Typography>
              </Col>
            </HeaderWrapper>
            {history.map((obj,index) => (
              <RowWrapper key={index.toString()+screen} bgGrey={index%2==0}>
                <Col sm={3}>
                  <Typography variant="body1" color="textSecondary">{obj.location}</Typography>
                </Col>
                <Col sm={2}>
                  <Typography variant="body1" color="textSecondary">{obj.amount}</Typography>
                </Col>
                <Col sm={2}>
                  <Typography variant="body1" color="textSecondary">{obj.rfid}</Typography>
                </Col>
                <Col sm={1}>
                  <Typography variant="body1" color="textSecondary">{obj.slot_number}</Typography>
                </Col>
                <Col sm={3}>
                  <Typography variant="body1" color="textSecondary">{dateTime(obj.created_on)}</Typography>
                </Col>
                <Col sm={1}>
                  <StatusWrapper variant="body1" color="textSecondary" done={obj.payment_verified==="True"}>{obj.payment_verified==="True" ? 'Paid' : 'Pending'}</StatusWrapper>
                </Col>
              </RowWrapper>
            ))}
          </DesktopWrapper>
          <MobileWrapper>
            {history.map((obj,index) => (
              <ColWrapper key={index.toString()+screen+screen}>
                <Typography variant="body1" color="textSecondary" gutterBottom>Location:&nbsp;{obj.location}</Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>Amount:&nbsp;{obj.amount}</Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>RFID Number:&nbsp;{obj.rfid}</Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>Slot Number:&nbsp;{obj.slot_number}</Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>Date:&nbsp;{dateTime(obj.created_on)}</Typography>
                <StatusWrapper variant="body1" color="textSecondary" done={obj.payment_verified==="True"}>Status:&nbsp;{obj.payment_verified==="True" ? 'Paid' : 'Pending'}</StatusWrapper>
              </ColWrapper>
            ))}
          </MobileWrapper>
        </Card>
        <Separator height={1}/>
      </Col>
    )
  }
}

const mapStateToProps = (state) => ({
  error: getError(state),
  pending: getStatus(state),
  success: getSuccess(state),
  history: getPaymentHistory(state),
});

export default connect(
    mapStateToProps,
    dispatch => ({
      actions: bindActionCreators({fetchPaymentHistoryDetails}, dispatch)
    })
)(History);