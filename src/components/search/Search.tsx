import React from "react";
import { FiSearch } from "react-icons/fi";
import "./search.css"
const Search = ({width, inputSearch, setInputSearch}: any) => {
  return (
    <>
      <div>
        <p className="filter-content">Từ khóa</p>
        <div className="search" style={{width: width}}>
          <div className="search-wrap">
            <input
              type="text"
              placeholder="Nhập từ khóa"
              className="search-input"
              onChange={(e)=> {setInputSearch(e.target.value)}}
            />
            <FiSearch className="search-icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
