import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const emptyOptions = [
  {
    label: "Loading...",
    value: "",
  }
];

const FormDropdown = ({ name, control, label, options=emptyOptions, ...props}) => {
  const generateSingleOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value} size={props.size}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl required={props.required} style={props.style ? props.style : {}}>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value}>
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
        rules={props.rules ? props.rules : {}}
      />
    </FormControl>
  );
};

export default FormDropdown