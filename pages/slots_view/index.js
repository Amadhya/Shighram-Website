import React from "react";
import styled from "styled-components";
import {Dialog, DialogContent, DialogActions, Typography, Button, Chip, Divider} from "@material-ui/core";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';

import Theme from "../../constants/theme"
import {Separator, Container, Row, Col} from "../../components/layout";
import { motion } from "framer-motion";

const ColWrapper = styled(Col)`
    border-top: 1px solid ${Theme.grey};
    border-bottom: 1px solid ${Theme.grey};
    padding: 0;
`;
const ImageWrapper = styled(motion.img)`
    width: 20px;
`;
const SlotWrapper = styled(Col)`
    padding: 1rem;
    border-left: 1px solid ${Theme.grey};
    border-right: 1px solid ${Theme.grey};
    display: flex !important;
    justify-content: center;
`;
const Wrapper = styled(Container)`
    margin: 0 2rem;
`;
const ChipWrapper = styled(Chip)`
    display: flex !important;
    margin: 0 3rem;
`;
const DialogWrapper = styled(Dialog)`
    .MuiDialog-paperWidthSm{
        width: 80% !important;
        @media(min-width: 769px){
            width: 30% !important;
        }
    }
    .MuiDialogContent-root{
        @media(max-width: 767px){
            padding: 12px;
        }
    }
`;
const TypographyWrapper = styled(Typography)`
    color: ${Theme.primaryColor} !important;
`;

const backVariants = {
    exit: {
      opacity: 0,
      transition: {
        duration: 3,
      }
    },
    enter: {
      opacity: 1,
      transition: {
        duration: 3,
      }
    }
  };

class SlotView extends React.Component  {
    constructor(props){
        super(props);
        this.state = {
            cord: {
                lat: 30.7411,
                lng: 76.7790,
            },
            open: false,
        }
    }
    
    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const {longitude, latitude} = position.coords;

                    this.setState({
                        cord: {
                            lat: latitude,
                            lng: longitude
                        }
                    })
                }, error => {
                    console.log(error);
                }
            )
        }
    }

    onMarkerClick = (mapData) => {
        const {position: {lat, lng}} = mapData;
        this.setState({
            open: true,
        })
    }

    handleClose = () => {
        this.setState({
            open: false,
        })
    }

    renderModal = () => (
        <DialogWrapper open={this.state.open} onClose={() => this.handleClose()} aria-labelledby="form-dialog-title">
            <DialogContent>
                <Row alignItems="center" justify="center">
                    <RoomOutlinedIcon/>
                    <Typography align="center" variant="h6">
                        Punjab Engineering College
                    </Typography>
                </Row>
                <Separator height={1}/>
                <Divider />
                <Separator height={3}/>
                <Row alignItems="center">
                    <Col sm={2} xs={2}>
                        <Typography align="center" style={{color: '#32CD32'}}>Entry</Typography>
                    </Col>
                    <ColWrapper sm={8} xs={8}>
                        <Row>
                            <SlotWrapper sm={4} xs={4}>
                                <ImageWrapper variants={backVariants} alt="slot occupied" src="/static/images/car.png"/>
                            </SlotWrapper>
                            <SlotWrapper sm={4} xs={4}>
                                <TypographyWrapper variant="h6" color="primary" align="center">2</TypographyWrapper>
                            </SlotWrapper>
                            <SlotWrapper sm={4} xs={4}>
                                <ImageWrapper variants={backVariants} alt="slot occupied" src="/static/images/car.png"/>
                            </SlotWrapper>
                        </Row>
                        <Separator height={2}/>
                        <ChipWrapper label="4 SLOTS FREE"/>
                        <Separator height={2}/>
                        <Row>
                            <SlotWrapper sm={4} xs={4}>
                                <TypographyWrapper variant="h6" color="primary" align="center">6</TypographyWrapper>
                            </SlotWrapper>
                            <SlotWrapper sm={4} xs={4}>
                                <TypographyWrapper variant="h6" color="primary" align="center">5</TypographyWrapper>
                            </SlotWrapper>
                            <SlotWrapper sm={4} xs={4}>
                                <TypographyWrapper variant="h6" color="primary" align="center">4</TypographyWrapper>
                            </SlotWrapper>
                        </Row>
                    </ColWrapper>
                    <Col sm={2} xs={2}>
                        <Typography align="center" style={{color: 'red'}}>Exit</Typography>
                    </Col>
                </Row>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => this.handleClose()} color="primary">
                    Close
                </Button>
            </DialogActions>
        </DialogWrapper>
    )

    render() {
        const {cord, open} = this.state;
        const {google} = this.props;
        const containerStyle = {
            position: 'inherit',  
            width: '100%',
            height: '100%'
        }

        return (
            <Wrapper reverse justify="center" initial="exit" animate="enter" exit="exit">
                {this.renderModal()}
                <Typography variant="h6">
                    Welcome to Suvidham
                </Typography>
                <Typography gutterBottom>
                    Click on the below listed markers to view live Parking Layouts.
                </Typography>
                <Map
                    google={google}
                    style={{height: '70vh', position: 'relative'}}
                    containerStyle={containerStyle}
                    initialCenter={cord}
                    zoom={13}
                >
                    <Marker
                        name={'Current location'} 
                        position={{
                            lat: 30.7673,
                            lng: 76.7870, 
                        }}
                        onClick={(e) => this.onMarkerClick(e)}
                    />
                </Map>
            </Wrapper>
        )
    }
};

export default GoogleApiWrapper({
    apiKey: process.env.MAP_API_KEY,
})(SlotView);