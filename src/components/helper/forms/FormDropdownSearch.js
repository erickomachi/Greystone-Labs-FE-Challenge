import React, { useState, useMemo } from "react";
import { FormControl, InputLabel, MenuItem, Select, ListSubheader, TextField, InputAdornment } from "@material-ui/core";
import { Controller } from "react-hook-form";


const emptyOptions = [
  {
    label: 'Loading...',
    value: '',
  }
];
const containsText = (text, searchText) => text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const FormDropdownSearch = ({ name, control, label, options=emptyOptions, ...props}) => {
  const [searchText, setSearchText] = useState('');
  const [displayOptions, setDisplayOptions] = useState(options)

  const displayedOptions = useMemo(
    () => displayOptions.filter((option) => containsText(option.label, searchText)),
    [searchText]
  );


  return (
    <FormControl required={props.required} style={props.style ? props.style : {}}>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value} MenuProps={{ autoFocus: false }} onClose={() => setSearchText('')} labelId="search-select-label" id="search-select" displayEmpty>
            <ListSubheader>
              <TextField
                autoFocus
                size="small"
                placeholder="Type to search..."
                fullWidth
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key !== "Escape") {
                    e.stopPropagation();
                  }
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </ListSubheader>
            {
              displayedOptions.map((option) =>(
              <MenuItem key={option.value} value={option.value} size={props.size}>
                  {`${option.label}  (User ID: ${option.value})`}
              </MenuItem>
              ))
            }
          </Select>
        )}
        control={control}
        name={name}
        rules={props.rules ? props.rules : {}}
      />
    </FormControl>
  );
};

export default FormDropdownSearch