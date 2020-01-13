import React from "react";
import styled from "styled-components";
import Typography from '@material-ui/core/Typography';
import {FlexView, Col, Container} from "../../components/layout";

const SlotWrapper = styled(FlexView)`
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 2px 2px 12px;
    margin: 0px 40px;
    padding: 10px;
`;
const ColWrapper = styled(Col)`
    border: 2px solid;
    padding: 32px;
    margin: 4% 0;
    margin-top: 0;
    align-items: center;
    display: flex;
    justify-content: center;
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
    <Container justify="center">
        <SlotWrapper wrap="true" justify="center">
            {slots.map(obj => (
                <ColWrapper sm={4} key={obj.number}>
                    <Typography variant="h1" component="h2" align="center">
                        {obj.number}
                    </Typography>
                </ColWrapper>
            ))}
        </SlotWrapper>
    </Container>
);

export default SlotView;