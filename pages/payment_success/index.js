import React from 'react';
import Head from "next/dist/next-server/lib/head";
import { Button, Typography } from '@material-ui/core';

import {Router} from "../../routes";
import {Card, Separator, Container} from "../../components/layout";

const onBackToHome = () => {
    Router.pushRoute('slots_view');
};

const PaymentSuccess = () => {
    return (
        <Container justify="center" initial="exit" animate="enter" exit="exit">
            <Head>
                <title>Payment</title>
            </Head>
            <Card reverse={true} alignItems="center">
                <img src="/static/images/success.png"/>
                <Separator height={4}/>
                <Typography variant="h5" gutterBottom>Payment Successful!</Typography>
                <Typography variant="body1" color="textSecondary">Your payment was successful. You can continue using Suvidham.</Typography>
                <Separator height={3}/>
                <Button variant="outlined" color="primary" onClick={() => onBackToHome()}>Back to Home</Button>
            </Card>
        </Container>
    )
};

export default PaymentSuccess;