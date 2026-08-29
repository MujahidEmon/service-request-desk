import React from 'react';

const FilterSelect = ({ value, onChange, options, placeholder, valueKey, labelKey }) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="srd-dropdown-select"
        >
            <option value="">
                {placeholder}
            </option>

            {options.map((option) => {
                const optionValue = valueKey
                    ? option[valueKey]
                    : option;

                const optionLabel = labelKey
                    ? option[labelKey]
                    : option;

                return (
                    <option
                        key={optionValue}
                        value={optionValue}
                    >
                        {optionLabel}
                    </option>
                );
            })}
        </select>
    );
};

export default FilterSelect;