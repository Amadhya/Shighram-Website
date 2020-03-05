import React from 'react';
import Head from "next/dist/next-server/lib/head";
import { Button, Typography } from '@material-ui/core';
import styled from "styled-components";

import Theme from "../../constants/theme";
import {Router} from "../../routes";
import {Card, Separator, Container} from "../../components/layout";

const Wrapper = styled(Container)`
    background: rgba(63, 81, 181, 0.04);
    height: 100vh;
    align-items: center;
    padding: 0px;
`;

const onBackToHome = () => {
    Router.pushRoute('slots_view');
};

const PaymentSuccess = () => {
    return (
        <Wrapper justify="center" initial="exit" animate="enter" exit="exit">
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
        </Wrapper>
    )
};

export default PaymentSuccess;