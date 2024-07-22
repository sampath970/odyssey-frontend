import React from "react";
import classNames from "classnames";
import Search from "../../public/assets/icons/search.svg";
import "./search-bar.scss";

interface SearchBarProps {
  placeHolderText: string;
  isActive: boolean;
  handleSearchBarClick: () => void;
}

const SearchBar = ({
  placeHolderText,
  isActive,
  handleSearchBarClick,
}: SearchBarProps) => {
  const inputClass = classNames({
    "search-bar__input": true,
    "search-bar__input__active": isActive === true,
  });
  return (
    <div className="search-bar" onClick={handleSearchBarClick}>
      <div>
        <input
          type="text"
          className={inputClass}
          placeholder={placeHolderText}
        />
      </div>
      <div className="search-bar__icon">
        <Search />
      </div>
    </div>
  );
};

export default SearchBar;
