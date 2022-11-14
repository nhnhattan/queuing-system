import React from "react";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";

import "./addButton.css";
const AddButon = ({location, name}: any) => {
  return (
    <Link to={location} className="add-btn-wrap">
      <div className="add-btn-icon-wrap">
        <GoPlus className="add-btn-icon" />
      </div>
      <p>{name}</p>
    </Link>
  );
};

export default AddButon;
