import React, {PureComponent} from 'react';
import styled from 'styled-components';
import {Typography} from "@material-ui/core";

import {Container, Col, FlexView, Separator} from "../../components/layout";
import General from "./profile";
import History from "./history";
import Security from "./security";
import Theme from "../../constants/theme";


const OptionsWrapper = styled(Col)`
  padding-left: 24px;
  @media(min-width: 767px){
    border-right: 1px solid ${Theme.grey};
    padding: 90px 10px 0px 0px;
    box-shadow: 2px 2px 12px rgba(0,0,0,0.1);
  }
`;
const DetailWrapper = styled(Col)`
  background: #e0e0e059;
  padding-top: 90px;
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
  color: ${(props) => props.highlight==="true" && "rgba(0, 0, 0, 0.54)"};
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
        <OptionsWrapper xs={12} sm={2}>
          <FlexView justify="center">
            <img src="/static/images/icon_user.png"/>
          </FlexView>
          <Separator height={4}/>
          <TypographyWrapper highlight={general.toString()} align="center" variant="body1" onClick={() => this.onGeneralClick()}>Profile</TypographyWrapper>
          <TypographyWrapper highlight={security.toString()} align="center" variant="body1" onClick={() => this.onSecurityClick()}>Security</TypographyWrapper>
          <TypographyWrapper highlight={history.toString()} align="center" variant="body1" onClick={() => this.onHistoryClick()}>History</TypographyWrapper>
        </OptionsWrapper>
        <DetailWrapper xs={12} sm={10}>
          {general && <General/>}
          {history && <History/>}
          {security && <Security/>}
        </DetailWrapper>
      </ContainerWrapper>
    )
  }
}

export default Settings;