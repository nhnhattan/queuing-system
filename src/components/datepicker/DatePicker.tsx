import React, {useState} from "react";
import { IoCalendarClearOutline } from "react-icons/io5";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";
import "./datepicker.css";
const DatePicker = ({width, dateStart, setDateStart, dateEnd, setDateEnd}: any) => {
  return (
    <div>
      <p className="filter-content">Chọn thời gian</p>
      <div className="date-picker-container"></div>
      <div className="date-picker">
        <div className="input-pick-wrap" style={{ width: width }}>
          <IoCalendarClearOutline className="calendar-icon" />
          <input type="date" className="date-input" style={{ maxWidth: width }} onChange={(e)=> {
            setDateStart(e.target.value)
          }} />
        </div>
        <AiOutlineCaretRight className="date-pick-icon" />
        <div className="input-pick-wrap" style={{ maxWidth: width }}>
          <IoCalendarClearOutline className="calendar-icon" />
          <input type="date" className="date-input" style={{ maxWidth: width }} onChange={(e)=> {
            setDateEnd(e.target.value)
          }}/>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
