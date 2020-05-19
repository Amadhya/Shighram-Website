import React from "react";
import styled from "styled-components";
import {Dialog, DialogContent, DialogActions, Typography, Button} from "@material-ui/core";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import {FlexView, Container} from "../../components/layout";
import SlotsModel from "./slotsModel";

const SlotWrapper = styled(FlexView)`
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 2px 2px 12px;
    padding: 60px 40px;
`;
const Wrapper = styled(Container)`
    margin: 0 2rem;
`;

class SlotView extends React.Component  {
    constructor(props){
        super(props);
        this.state = {
            cord: {
                lat: 30.7673,
                lng: 76.7870,
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
        <Dialog open={this.state.open} onClose={() => this.handleClose()} aria-labelledby="form-dialog-title">
            <DialogContent>
                <Typography variant="h4" component="h2" align="center" color="textSecondary" gutterBottom>
                    Arduino Offline
                </Typography>
                <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
                    To view other features of the website login with tony@avengers.com and the password is tony.
                    For payment feature use RFID Number: 10101010.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => this.handleClose()} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
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
                    center={cord}
                    zoom={12}
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
    apiKey: 'AIzaSyDvicC6UYMCuGvWO21mfW7R0YQWCmgV_hs',
})(SlotView);