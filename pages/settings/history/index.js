import React, {PureComponent} from "react";
import {Box, Typography} from "@material-ui/core";
import styled from "styled-components";

import {Row, Col, Separator} from "../../../components/layout";

const Wrapper = styled.div`
  padding: 0px 20px;
`;
const RowWrapper = styled(Row)`
  padding-bottom: 5.66px;
  justify-content: space-between;
`;
const HeaderWrapper = styled(Box)`
  @media(max-width: 767px){
    margin-top: 64px;
  }
`;
const TitleWrapper = styled(Typography)`
  font-weight: 600 !important;
`;

const payment = [
  {
    id: '1',
    area: 'Elante Mall',
    duration: '1 hour',
    charged: 'Rs 100',
    date: '29th December 2019'
  },
  {
    id: '2',
    area: 'Sector 17',
    duration: '1 hour',
    charged: 'Rs 100',
    date: '29th December 2019'
  },
  {
    id: '3',
    area: 'Sector 35',
    duration: '1 hour',
    charged: 'Rs 100',
    date: '29th December 2019'
  },
  {
    id: '4',
    area: 'Sector 22',
    duration: '1 hour',
    charged: 'Rs 100',
    date: '29th December 2019'
  },
  {
    id: '5',
    area: 'Sector 8',
    duration: '1 hour',
    charged: 'Rs 100',
    date: '29th December 2019'
  },
  {
    id: '6',
    area: 'Sector 15',
    duration: '1 hour',
    charged: 'Rs 100',
    date: '29th December 2019'
  }
];
class History extends PureComponent{

  render() {
    const {screen=""} = this.props;
    return(
      <Col smOffset={2} sm={6}>
        <TitleWrapper variant="h4" color="textSecondary">Parking History</TitleWrapper>
        <Separator height={4}/>
        {payment.map(obj => (
              <Wrapper key={obj.id+screen}>
                <RowWrapper>
                  <Col sm={6}>
                    <Typography variant="body1"><Typography variant="body1" component="spam" color="textSecondary">Location:&nbsp;</Typography>{obj.area}</Typography>
                  </Col>
                  <Col sm={6}>
                    <Typography variant="body1" color="textSecondary" align="right">{obj.date}</Typography>
                  </Col>
                </RowWrapper>
                <Typography variant="body1" gutterBottom={true}><Typography variant="body1" component="spam" color="textSecondary">Charged:&nbsp;</Typography>{obj.charged}</Typography>
                <Typography variant="body1" gutterBottom={true}><Typography variant="body1" component="spam" color="textSecondary">Duration:&nbsp;</Typography>{obj.duration}</Typography>
                <hr/>
              </Wrapper>
          ))}
      </Col>
    )
  }
}

export default History;