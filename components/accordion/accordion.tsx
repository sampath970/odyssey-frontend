import React from 'react';
import { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import './accordion.scss';
const Accordion = (props) => {
    const {data} = props;
  const [selected, setSelected] = useState(0);

  const toggle = (index) => {
    if (selected === index) {
      setSelected(null)
    }else{
      setSelected(index);
    }
  };
  return (
    <div className="accordion">
      {data && data.map((item, index) => (
        <div
          className={
            selected === index
              ? 'accordion__item item-show '
              : 'accordion__item'
          }
          key={index}>
          <div
            className={
              selected === index
                ? 'accordion__title title-show '
                : 'accordion__title'
            }
            onClick={() => toggle(index)}>
            <h2>{item.title}</h2>
            <span>
              {selected === index ? <FaMinus style={{cursor:"pointer"}} /> : <FaPlus style={{cursor:"pointer"}}/>}
            </span>
          </div>
          <div
            className={
              selected === index
                ? 'accordion__content content-show '
                : 'accordion__content'
            }>
            <div className="accordion__content-section-one">
              <label className="accordion__content-data">{item.content}</label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
