import React, {PureComponent} from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import {Typography} from "@material-ui/core";

import {Container, Col, FlexView, Separator} from "../../components/layout";
import General from "./profile";
import History from "./history";
import Security from "./security";
import Theme from "../../constants/theme";


const OptionsWrapper = styled(Col)`
  padding-left: 8px;
  @media(min-width: 767px){
    border-right: 1px solid ${Theme.grey};
    padding: 90px 10px 0px 0px;
    box-shadow: 2px 2px 12px rgba(0,0,0,0.1);
  }
`;
const DetailWrapper = styled(Col)`
  background: #e0e0e059;
  padding-top: 90px;
  @media(max-width: 767px){
    display: none !important;
  }
`;
const DetailMobileWrapper = styled(Col)`
  background: #e0e0e059;
  @media(min-width: 767px){
    display: none !important;
  }
`;
const ContainerWrapper = styled(Container)`
  min-height: 100vh;
  padding: 0px;
`;

const TypographyWrapper = styled(Typography)`
  background: ${(props) => props.highlight==="true" && Theme.lightGrey};
  color: ${(props) => props.highlight==="true" && 'white'};
  border-left: ${(props) => props.highlight==="true" && "5px solid #1488CC"};
  border-bottom: 1px solid ${Theme.lightGrey};
  padding: 4px 0px;
  color: ${(props) => props.highlight==="true" && "black"};
  font-weight: ${(props) => props.highlight==="true" && "600 !important"};
  &: hover{
    cursor: pointer;
  }
`;

class Settings extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      general: true,
      security: false,
      history: false,
    }
  }

  onGeneralClick = () => {
    this.setState({
      general: true,
      security: false,
      history: false,
    })
  };

  onSecurityClick = () => {
    this.setState({
      general: false,
      security: true,
      history: false,
    })
  };

  onHistoryClick = () => {
    this.setState({
      general: false,
      security: false,
      history: true,
    })
  };

  render() {
    const {general, history, security} = this.state;
    return(
      <ContainerWrapper initial="exit" animate="enter" exit="exit">
        <Head>
          <title>Settings</title>
        </Head>
        <OptionsWrapper xs={12} sm={2}>
          <FlexView justify="center">
            <img src="/static/images/icon_user.png" alt="profile"/>
          </FlexView>
          <Separator height={4}/>
          <TypographyWrapper highlight={general.toString()} align="center" variant="body1" onClick={() => this.onGeneralClick()}>Profile</TypographyWrapper>
          {general && (
            <DetailMobileWrapper>
              <General/>
            </DetailMobileWrapper>
          )}
          <TypographyWrapper highlight={security.toString()} align="center" variant="body1" onClick={() => this.onSecurityClick()}>Security</TypographyWrapper>
          {security && (
            <DetailMobileWrapper>
              <Security/>
            </DetailMobileWrapper>
          )}
          <TypographyWrapper highlight={history.toString()} align="center" variant="body1" onClick={() => this.onHistoryClick()}>History</TypographyWrapper>
          {history && (
            <DetailMobileWrapper>
              <History/>
            </DetailMobileWrapper>
          )}
        </OptionsWrapper>
        <DetailWrapper xs={12} sm={10}>
          {general && <General screen="Desktop"/>}
          {history && <History screen="Desktop"/>}
          {security && <Security screen="Desktop"/>}
        </DetailWrapper>
      </ContainerWrapper>
    )
  }
}

export default Settings;