import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

const FormTextField = ({ name, control, label, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          label={label}
          required={props.required}
        />
      )}
    />
  );
};

export default FormTextField