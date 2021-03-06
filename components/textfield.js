import React from "react";
import {TextField} from '@material-ui/core';

class TextFieldInput extends React.PureComponent{

  handleChange = (e) => {
    const {onChange, id} = this.props;
    if(onChange){

      if(id==="phone"){
        const len= e.target.value.length;
        if(len===0 || (len<=10 && len>0 && e.target.value[len-1] >='0' && e.target.value[len-1]<='9')){
          onChange(id,e.target.value);
        }
      }else{
        onChange(id,e.target.value);
      }
    }
  };

  render() {
    const {id, label, type, name, autoComplete, value, autoFocus, variant="outlined", fullWidth=false} = this.props;

    return(
        <TextField
            id={id}
            label={label}
            type={type}
            value={value}
            name={name}
            autoComplete={autoComplete}
            margin="normal"
            autoFocus={autoFocus}
            required
            onChange={this.handleChange}
            variant={variant}
            fullWidth={fullWidth}
        />
    )
  }
}

export default TextFieldInput;