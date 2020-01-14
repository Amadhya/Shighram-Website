import React, { Component, Fragment } from "react";
import Head from "next/dist/next-server/lib/head";
import { Button,  TextField, Typography } from '@material-ui/core';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import styled from "styled-components";


import {Router} from "../../routes";
import Theme from "../../constants/theme";
import {Container, Card} from "../../components/layout";
import {FormWrapper} from "../../components/form";
import fetchOrederDetails, {getError, getStatus, getSucces, getOrder} from "../../Container/order/saga";
import fetchPaymentVerification, {getError as VerificationError, getStatus as VerificationStatus, getSucces as VerificationSuccess} from "../../Container/login/saga";


const DetailWrapper = styled.div`
  background-color: ${Theme.lightGrey};
  border-radius: 8px;
  padding: 12px 15px;
`;

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
    const {order, paymentPending, paymentSuccess} = this.props;

    let options = {
      "key": "", // Enter the Key ID generated from the Dashboard
      "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
      "currency": "INR",
      "name": "Smart Parking",
      "description": "Parking Payement",
      "order_id": order.razorpay_order_id,//This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
      "handler": function (response){
        console.log(response, 'after checkout...........');
        // fetch(`http://127.0.0.1:8000/api/paymentVerification/${options.order_id}`, {
        //   method: 'PATCH',
        //   body: JSON.stringify({...response})
        // })
        Router.pushRoute('slots_view');
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
    const {error} = this.props;

    return (
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
        <Button variant="contained" color="primary" onClick={() => this.onSubmit()}>
          Calculate Charge
        </Button>
      </FormWrapper>
    )
  }

  renderPaymentDetails = () => {
    const {order} = this.props;

    return (
      <Fragment>
        <DetailWrapper>
          <Typography variant="body1" gutterBottom>Payment&nbsp;Due:&nbsp;₹&nbsp;{parseFloat(order.amount)/100.00}</Typography>
          <Typography variant="body1" gutterBottom>Location:&nbsp;{order.location}</Typography>
          <Typography variant="body1" gutterBottom>RFID&nbsp;Number:&nbsp;{order.rfid}</Typography>
          <Typography variant="body1">Entry&nbsp;time:&nbsp;{new Date(order.created_on).toString()}</Typography>
        </DetailWrapper>
        <br/>
        <Button variant="contained" color="primary" id="rzp-button1" onClick={() => this.onPay()}>Pay Payment</Button>
      </Fragment>
    )
  }

  render() {
    const {success, pending} = this.props;

    return (
      <Container justify="center">
        <Head>
          <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
          <title>Payment</title>
        </Head>
        <Card reverse={true} alignItems="center">
          {typeof pending !== undefined && typeof success !== undefined && !pending && success ? this.renderPaymentDetails() : this.renderRFIDSearch()}
        </Card> 
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