import React, { Component, Fragment } from "react";
import Head from "next/dist/next-server/lib/head";
import { TextField, Typography } from '@material-ui/core';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import styled from "styled-components";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import DateRangeIcon from '@material-ui/icons/DateRange';
import StarIcon from '@material-ui/icons/Star';


import {Router} from "../../routes";
import Theme from "../../constants/theme";
import {Container, Card, Row, Col, Separator, FlexView} from "../../components/layout";
import {FormWrapper} from "../../components/form";
import {ButtonLayout} from "../../components/button";
import {CircularProgressWrapper} from "../../components/progress";
import fetchOrederDetails, {getError, getStatus, getSucces, getOrder} from "../../Container/order/saga";
import fetchPaymentVerification, {getError as VerificationError, getStatus as VerificationStatus, getSucces as VerificationSuccess} from "../../Container/payment_verification/saga";


const ColWrapper = styled(Col)`
  background: ${Theme.bgColor} !important;
  padding: 20px 25px;
  border-radius: 10px 0px 0px 10px;
  @media(max-width: 767px){
    border-radius: 10px 10px 0px 0px;
  }
`;
const DetailsWrapper = styled(Col)`
  padding: 20px 25px;
`;
const RowWrapper = styled(Row)`
  background: white;
  border-radius: 10px;
  box-shadow: 2px 2px 12px rgba(0,0,0,0.1);
  overflow: unset;
  margin: 0px 25px;
  @media(max-width: 767px){
    min-width: 75%;
    margin: 0px 25px 25px 25px;
  }
`;
const TextWrapper = styled(Typography)`
  color: white;
`;
const TitleWrapper = styled(Typography)`
  color: ${Theme.primaryColor} !important;
`;
const IconWrapper = styled(Col)`
  color: white;
  padding: 0px;
`;
const HrWrapper = styled.hr`
  background: white;
  opacity: 0.4;
  margin: 10px 0px;
`;
const GreetingWrapper = styled(Typography)`
  font-weight: 600 !important;
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

  return `${monthNames[month]} ${date}, ${year} ${hour}:${min}:${sec}`
}

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rfid: '',
      isClicked: false,
    };
  }

  handleRfidChange = (e) => {
    this.setState({
      rfid: e.target.value,
    });
  } 

  onSubmit = () => {
    const {actions} = this.props;
    const {rfid} = this.state;

    actions.fetchOrederDetails(rfid);
    this.setState({
      rfid: '',
      isClicked: true,
    })
  }

  onPay = () => {
    const {order, actions} = this.props;

    this.setState({
      isClicked: false,
    });

    let options = {
      "key": process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
      "currency": "INR",
      "name": "Smart Parking",
      "description": "Parking Payement",
      "order_id": order.razorpay_order_id,//This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
      "handler": function (response){
        // fetch(`http://127.0.0.1:8000/api/paymentVerification/${options.order_id}`, {
        //   method: 'PATCH',
        //   body: JSON.stringify({...response})
        // })
        actions.fetchPaymentVerification(response)
        Router.pushRoute('payment_success');
      },
      "prefill": {
          "name": order.first_name+' '+order.last_name,
          "email": order.email,
          "contact": order.phone
      },
  } ;
    var rzp1 = new Razorpay(options);
    rzp1.open();
  }

  ra

  renderRFIDSearch = () => {
    const {rfid, isClicked} = this.state;
    const {error, success, pending} = this.props;

    return (
      <Card reverse>
        <FormWrapper>
          <TextField
            id="rfid"
            label="RFID Number"
            type="text"
            name="RFID Number"
            value={rfid}
            autoFocus={true}
            onChange={(e) => this.handleRfidChange(e)}
          />
          <br/>
          {isClicked && error !== null && (
              <Fragment>
                <Typography variant="caption" color="error">
                  {error}
                </Typography>
                <br/>
              </Fragment>
          )}
          <Typography variant="caption" color="textSecondary" gutterBottom={true}>Enter the first 10 digits of rfid card number</Typography>
          <ButtonLayout 
            variant="contained"
            color="primary" 
            endIcon={
              isClicked && !((typeof pending !== undefined && typeof success !== undefined && !pending && success) || error) 
              && 
              <CircularProgressWrapper size={18}/>
            } 
            onClick={() => this.onSubmit()}
          >
            Calculate Charge
          </ButtonLayout>
        </FormWrapper>
      </Card>
    )
  }

  renderPaymentDetails = () => {
    const {order} = this.props;

    return (
      <FlexView>
        <RowWrapper>
          <ColWrapper sm={4} xs={12}>
            <TextWrapper variant="body1" gutterBottom>Invoice for</TextWrapper>
            <TextWrapper variant="h5">{order.user_name}</TextWrapper>
            <HrWrapper/>
            <Row>
              <IconWrapper sm={2} xs={2}>
                <AccountBalanceWalletIcon/>
              </IconWrapper>
              <Col sm={10} xs={10}>
                <TextWrapper variant="body1" gutterBottom>Amount:</TextWrapper>
                <TextWrapper variant="body1">₹{order.amount/100}</TextWrapper>
              </Col>
            </Row>
            <HrWrapper/>
            <Row>
              <IconWrapper sm={2} xs={2}>
                <DateRangeIcon/>
              </IconWrapper>
              <Col sm={10} xs={10}>
                <TextWrapper variant="body1" gutterBottom>Date:</TextWrapper>
                <TextWrapper variant="body1">{new Date().toString()}</TextWrapper>
              </Col>
            </Row>
            <HrWrapper/>
            <Row>
              <IconWrapper sm={2} xs={2}>
                <StarIcon/>
              </IconWrapper>
              <Col sm={10} xs={10}>
                <TextWrapper variant="body1" gutterBottom>Issuer:</TextWrapper>
                <TextWrapper variant="body1">Suvidham</TextWrapper>
              </Col>
            </Row>
          </ColWrapper>
          <DetailsWrapper sm={8} xs={12}>
            <Row alignItems="baseline">
              <Col sm={6}>
                <TitleWrapper variant="h4">Suvidham</TitleWrapper>
              </Col>
              <Col sm={6}>
                <Typography variant="body1" align="right" color="textSecondary">{dateTime(order.created_on)}</Typography>
              </Col>
            </Row>
            <hr/>
            <Separator height={2}/>
            <GreetingWrapper variant="body1" gutterBottom color="textSecondary">Hello&nbsp;{order.user_name},</GreetingWrapper>
            <Typography variant="body1" gutterBottom color="textSecondary">Your parking details are mentioned as below:</Typography>
            <Separator height={2}/>
            <Typography variant="body1" gutterBottom color="textSecondary">Location:&nbsp;{order.location}</Typography>
            <Typography variant="body1" gutterBottom color="textSecondary">RFID&nbsp;Number:&nbsp;{order.rfid}</Typography>
            <Separator height={2}/>
            <ButtonLayout 
              variant="contained" 
              color="primary" 
              id="rzp-button1"
              onClick={() => this.onPay()}
            >
                Pay Now
            </ButtonLayout>
          </DetailsWrapper>
        </RowWrapper>
      </FlexView>
    )
  }

  render() {
    const {success, pending} = this.props;
    const {isClicked} = this.state;

    return (
      <Container justify="center" initial="exit" animate="enter" exit="exit">
        <Head>
          <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
          <title>Payment</title>
          <meta
            name="description"
            content="Suvidham is a web application to ease and enhance your parking experience. Through Suvidham, users can reserve a parking slot and pay parking fee online through our website and android app."
          />
        </Head>
        {isClicked && typeof pending !== undefined && typeof success !== undefined && !pending && success ? this.renderPaymentDetails() : this.renderRFIDSearch()} 
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  error: getError(state),
  pending: getStatus(state),
  success: getSucces(state),
  order: getOrder(state),
  paymentError: VerificationError(state),
  paymentPending: VerificationStatus(state),
  paymentSuccess: VerificationSuccess(state)
});

export default connect(
    mapStateToProps,
    dispatch => ({
      actions: bindActionCreators({fetchOrederDetails, fetchPaymentVerification}, dispatch)
    })
)(Checkout);