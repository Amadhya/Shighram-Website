import React from "react";
import styled from "styled-components";
import Typography from '@material-ui/core/Typography';
import {FlexView, Col, Container} from "../../components/layout";

const SlotWrapper = styled(FlexView)`
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 2px 2px 12px;
    margin: 0px 40px;
    padding: 60px 40px;
`;

const slots = [
    {
        number: 1,
    },
    {
        number: 2,
    },
    {
        number: 3,
    },
    {
        number: 4,
    },
    {
        number: 5,
    },
    {
        number: 6,
    },
];

const SlotView = () => (
    <Container justify="center" initial="exit" animate="enter" exit="exit">
        <SlotWrapper wrap="true" justify="center" reverse>
            <Typography variant="h4" component="h2" align="center" color="textSecondary" gutterBottom>
                Arduino Offline
            </Typography>
            <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
                To view other features of the website login with tony@avengers.com and the password is tony.
                For payment feature use RFID Number: 10101010.
            </Typography>
        </SlotWrapper>
    </Container>
);

export default SlotView;