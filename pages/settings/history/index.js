import React, {PureComponent} from "react";
import {Box, Typography} from "@material-ui/core";
import styled from "styled-components";

import {Row, Col} from "../../../components/layout";

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
const payment = [
  {
    area: 'Elante Mall',
    duration: '1 hour',
    charged: 'Rs 100',
    date: '29th December 2019'
  },
  {
    area: 'Sector 17',
    duration: '1 hour',
    charged: 'Rs 100',
    date: '29th December 2019'
  },
  {
    area: 'Sector 35',
    duration: '1 hour',
    charged: 'Rs 100',
    date: '29th December 2019'
  },
  {
    area: 'Sector 22',
    duration: '1 hour',
    charged: 'Rs 100',
    date: '29th December 2019'
  },
  {
    area: 'Sector 8',
    duration: '1 hour',
    charged: 'Rs 100',
    date: '29th December 2019'
  },
  {
    area: 'Sector 15',
    duration: '1 hour',
    charged: 'Rs 100',
    date: '29th December 2019'
  }
];
class History extends PureComponent{

  render() {
    return(
        <div>
          <HeaderWrapper fontSize={20} mb={1} ml={0.5}>Parking & Payment History</HeaderWrapper>
          <hr/>
          {payment.map(obj => (
              <Wrapper key={obj.date}>
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
        </div>
    )
  }
}

export default History;