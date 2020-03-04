import React, {PureComponent} from 'react';
import styled from 'styled-components';
import {Typography} from "@material-ui/core";

import {Container, Col, Row} from "../../components/layout";
import General from "./profile";
import History from "./history";
import Security from "./security";
import Theme from "../../constants/theme";


const OptionsWrapper = styled(Col)`
  padding-left: 24px;
  @media(min-width: 767px){
    border-right: 1px solid ${Theme.grey};
    padding: 10px;
  }
`;
const ContainerWrapper = styled(Container)`
  min-height: 80vh;
`;

const TypographyWrapper = styled(Typography)`
  background: ${(props) => props.highlight==="true" && Theme.bgColor};
  color: ${(props) => props.highlight==="true" && 'white'};
  border-radius: 4px;
  &: hover{
    cursor: pointer;
    border: 1px solid inherit;
    border-radius: 4px;
    @media(min-width: 767px){
      color: black;
      background: ${Theme.lightGrey};
    }
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
        <Row>
          <OptionsWrapper xs={12} sm={2} smOffset={2}>
            <TypographyWrapper highlight={general.toString()} gutterBottom align="center" variant="body1" onClick={() => this.onGeneralClick()}>General</TypographyWrapper>
            <TypographyWrapper highlight={security.toString()} gutterBottom align="center" variant="body1" onClick={() => this.onSecurityClick()}>Security</TypographyWrapper>
            <TypographyWrapper highlight={history.toString()} gutterBottom align="center" variant="body1" onClick={() => this.onHistoryClick()}>History</TypographyWrapper>
          </OptionsWrapper>
          <OptionsWrapper xs={12} sm={6}>
            {general && <General/>}
            {history && <History/>}
            {security && <Security/>}
          </OptionsWrapper>
        </Row>
      </ContainerWrapper>
    )
  }
}

export default Settings;