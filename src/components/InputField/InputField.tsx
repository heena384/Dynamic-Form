import React, { useState } from "react";
import { AutoComplete, Input } from "antd";
import type { AutoCompleteProps } from "antd";
import { InputSearchContainer } from "./InputField.styles";
import { FieldValues } from "../DynamicForm/DynamicForm.types";

interface InputSearchProps {
  options: { id: number; name: string }[];
  value?: string;
  onChange: (value: string) => void;
  type: string;
  field: FieldValues;
}

const InputSearch: React.FC<InputSearchProps> = ({
  options: propOptions,
  value,
  onChange,
  type,
  field,
}) => {
  const [filteredOptions, setFilteredOptions] = useState<
    AutoCompleteProps["options"]
  >([]);

  const handleSearch = (inputValue: string) => {
    if (inputValue) {
      const matchedOptions = propOptions.filter((option) =>
        option.name.toLowerCase().includes(inputValue.toLowerCase())
      );

      setFilteredOptions(
        matchedOptions.map((option) => ({
          value: option.name,
          label: option.name,
        }))
      );
    } else {
      setFilteredOptions([]);
    }
  };

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
  };

  return (
    <InputSearchContainer className="test">
      <AutoComplete
        popupMatchSelectWidth={252}
        style={{ width: 300 }}
        options={filteredOptions}
        onSearch={handleSearch}
        onSelect={handleSelect}
        value={value}
        size="large"
      >
        {type == "searchable" ? (
          <Input.Search
            size="large"
            placeholder={`Search ${field.label}`}
            enterButton
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <Input
            size="large"
            placeholder={`Enter ${field.label}`}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </AutoComplete>
    </InputSearchContainer>
  );
};

export default InputSearch;
