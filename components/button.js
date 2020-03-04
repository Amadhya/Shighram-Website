import styled from 'styled-components';

import Theme from "../constants/theme";
import { Button } from '@material-ui/core';

export const ButtonLayout = styled(Button)`
    background-color: ${Theme.primaryColor} !important;
`;