import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

const FormTextField = ({ name, control, label, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={props.rules ? props.rules : {}}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : props.helperText}
          error={!!error}
          onChange={onChange}
          value={value}
          label={label}
          required={props.required}
          type={props.type ? props.type : 'text'}
        />
      )}
    />
  );
};

export default FormTextField