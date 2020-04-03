import styled, { css } from 'styled-components';
import {Row as FlexRow, Col as FlexCol} from 'react-styled-flexboxgrid';
import { motion } from 'framer-motion';

import Theme from "../constants/theme";

export const Col=styled(FlexCol)`
    text-align: ${({align})=> align};
    ${({auto})=> auto && css `
        flex: 1;
    `};
    ${({margin})=> margin && css `
        margin: auto;
    `};
    ${({flex})=> flex && css `
        display: flex !important;
    `};
    flex-direction: ${({reverse})=> (reverse ? 'column' : 'row')};
    ${({alignItems})=> alignItems && css `
        align-items: ${alignItems};
    `};
    ${({justify})=> justify && css `
        justify-content: ${justify};
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
    margin: 0px;
    flex-direction: ${({reverse})=> (reverse ? 'row-reverse' : 'row')};
    width: 100%;
`;

export const FlexView=styled(motion.div)`
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
  @media(max-width: 769px){
    min-width: 75%;
  }
`;

export const Container = styled(FlexView)`
    padding-top: 7rem;
    @media(min-width: 767px && max-width: 1026px){
        padding-top: 140px;
    }
`;

export const Separator = styled.div`
    padding-bottom: ${({height})=> height*8}px;
`;

export const MotionCol = styled(motion.div)`
    background: ${({reverse})=> (reverse ? Theme.bgColor : Theme.revBgColor)};
    height: 100%;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    text-align: center !important;
    color: white;
    width: 100%;
    padding: 0px 25px;
    @media(max-width: 767px){
        display: none !important;
    }
`;

export const MotionRow = styled(motion.div)`
  height: 100vh;
  display: flex;
`;