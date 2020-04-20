import React, {PureComponent} from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import {Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {Container, Col, Separator} from "../../components/layout";
import General from "./profile";
import History from "./history";
import Security from "./security";

const ContainerWrapper = styled(Container)`
  padding-top: 6rem;
`;

class Settings extends PureComponent{

  render() {

    return(
      <Container initial="exit" animate="enter" exit="exit">
        <Head>
          <title>Settings</title>
          <meta
            name="description"
            content="Suvidham is a web application to ease and enhance your parking experience. Through Suvidham, users can reserve a parking slot and pay parking fee online through our website and android app."
          />
        </Head>
        <Col smOffset={1} sm={9} xs={12}>
          <Typography variant="h5">Settings</Typography>
          <hr/>
          <Separator height={4}/>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="general-header"
            >
              <Typography>General</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <General/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="security-header"
            >
              <Typography>Security</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Security/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="history-header"
            >
              <Typography>Parking History</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <History/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Col>
      </Container>
    )
  }
}

export default Settings;