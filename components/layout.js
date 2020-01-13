import styled, { css } from 'styled-components';
import {Row as FlexRow, Col as FlexCol} from 'react-styled-flexboxgrid';

export const Col=styled(FlexCol)`
    text-align: ${({align})=> align};
    ${({auto})=> auto && css `
        flex: 1;
    `};
    ${({margin})=> margin && css `
        margin: auto;
    `};
`;

export const Row=styled(FlexRow)`
    text-align: ${({align})=> align};
    ${({auto})=> auto && css `
        flex: 1;
    `};
    ${({alignItems})=> alignItems && css `
        align-items: ${alignItems};
    `};
    ${({justify})=> justify && css `
        justify-content: ${justify};
    `};
    flex-direction: ${({reverse})=> (reverse ? 'row-reverse' : 'row')};
    width: 100%;
`;

export const FlexView=styled.div`
    display: flex;
    flex-direction: ${({reverse})=> (reverse ? 'column' : 'row')};
    ${({wrap})=> wrap && css `
        flex-wrap: wrap;
    `};
    ${({alignItems})=> alignItems && css `
        align-items: ${alignItems};
    `};
    ${({justify})=> justify && css `
        justify-content: ${justify};
    `};
`;

export const Card = styled(FlexView)`
  background: white;
  border-radius: 4px;
  box-shadow: 2px 2px 12px rgba(0,0,0,0.1);
  overflow: unset;
  padding: 15px;
  @media(max-width: 767px){
    min-width: 75%;
  }
`;

export const Container = styled(FlexView)`
    padding-top: 100px;
    @media(max-width: 767px){
        padding-top: 120px;
    }
`;