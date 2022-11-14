import React, { Dispatch, useState } from "react";

import { BsFillCaretDownFill } from "react-icons/bs";

import "./dropdown.css";

type optionProps = string[];

const Dropdown = ({ selected, setSelected, options, width, top }: any) => {
  //   const options = ["Day", "Month", "Year"];
  const [isActive, setIsActive] = useState(false);
  //   console.log(options)
  //   console.log(selected)
  return (
    <div>
      <div className="dropdown" style={{width: width}}>
        <div className={!isActive ? "dropdown-btn" : "dropdown-btn-active"} onClick={(e) => setIsActive(!isActive)}>
          <div className="dropdown-btn-content">
            {selected}{" "}
            {!isActive ? (
              <BsFillCaretDownFill className="dropdown-icon" />
            ) : (
              <BsFillCaretDownFill
                className="dropdown-icon-rotate"
              />
            )}
          </div>
        </div>
        {isActive && (
          <div className="dropdown-content" style={{width: width, top: top}}>
            {options.map((option: any) => (
              <div
                onClick={(e) => {
                  setSelected(option);
                  setIsActive(false);
                  // console.log(selected);
                }}
                className="dropdown-item"
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
