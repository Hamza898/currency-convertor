import React, { useState } from "react";

function DropDown({ options = [], onChange , value }) {

  const [selected, setSelected] = useState(value);

  const handleChange = (event) => {
     value = event.target.value;
    setSelected(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <select
      onChange={handleChange}
      value={value}
      className="border rounded-md p-2 w-20 text-sm"
    >
      {options.length > 0 ? (
        options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))
      ) : (
        <option value="" disabled>
          No options available
        </option>
      )}
    </select>
  );
}

export default DropDown;