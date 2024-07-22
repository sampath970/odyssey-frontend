import React, { CSSProperties, FunctionComponent, useState } from 'react';
import Select, { ClearIndicatorProps } from 'react-select';
import { CSSObject } from '@emotion/serialize';
import { ColourOption, colourOptions } from './docs/data';

const CustomClearText: FunctionComponent = () => <>clear all</>;
const ClearIndicator = (props: ClearIndicatorProps<ColourOption, true>) => {
  const {
    children = <CustomClearText />,
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;

  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props) as CSSProperties}
    >
      {/* <div style={{ padding: '0px 5px' }}>{children}</div> */}
    </div>
  );
};

const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      zIndex: 500,
    }),
    control: (provided, state) => ({
        ...provided,
        overflowY:"auto",
      maxHeight: "38px",
      fontSize: "0.9rem",
      fontWeight: "200",
      display:"flex"
    }),
  };

export default function CustomClearIndicator(props) {

  const handleSelectAll = () => {
    props.setSelectedOptions(props.options);
  };

  const handleClearAll = () => {
    props.setSelectedOptions([]);
  };

  return (
    <div>
        <div style={{display:"flex",justifyContent:"flex-end",gap:"4px"}}>

      <button onClick={handleSelectAll}>Select All</button>
      <button onClick={handleClearAll}>Clear All</button>
        </div>
      <Select
        closeMenuOnSelect={props.options.length === 0}
        components={{ ClearIndicator }}
        styles={ customStyles }
        defaultValue={[]}
        onChange={(selectedOptions) => {
          console.log(selectedOptions);
          props.setSelectedOptions(selectedOptions);
        }}
        isMulti
        options={props.options || colourOptions}
        value={props.selectedOptions}
      />
      
    </div>
  );
}
