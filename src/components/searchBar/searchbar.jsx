import React, { useState, useEffect } from 'react';
import {
  TextField,
  InputAdornment,
  Popper,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from "./searchbar.module.css";
import LatestTrends from '../latestTrends/latestTrends'; // Import the LatestTrends component
import TrendsData from "../../data/LatestTrends.json";


export default function SearchBar({ handleSearchInputChange, handleSearchIconClick }) {
  const [searchText, setSearchText] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState(0);
  const [latestTrends, setLatestTrends] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);


  const debounceSearch = (event) => {
    const value = event.target.value;

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      handleSearchInputChange(value);
      setDropdownOpen(false); // Close the dropdown after search
    }, 500);
    setDebounceTimeout(timeout);
  };

  const handleSearchBarClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setDropdownOpen(!isDropdownOpen);
  };

  const handleIconClick = () => {
    handleSearchIconClick(searchText);
    setDropdownOpen(false); // Close the dropdown after search icon click
  };

  const handleCardClick = (trend) => {
    handleSearchInputChange(trend.title)
    setDropdownOpen(false); // Close the dropdown after card click
  };

  const handleSuggestionClick = (suggestion) => {
    handleSearchInputChange(suggestion);
    setDropdownOpen(false); // Close the dropdown after suggestion click
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchInputChange(searchText);
      setDropdownOpen(false); // Close the dropdown after pressing Enter
    }
  };

  useEffect(() => {
    setLatestTrends(TrendsData);
  }, []);

  return (
    <div className={styles.searchBar}>
      <TextField
        className="search-desktop"
        size="small"
        fullWidth
        onClick={handleSearchBarClick}
        InputProps={{
          className: 'search',
          endAdornment: (
            <InputAdornment position="end" onClick={handleIconClick}>
              <SearchIcon className={styles.icon} />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items"
        name="search"
        autoComplete="off"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          debounceSearch(e);
        }}
        onKeyDown={handleKeyDown}
      />

      <Popper open={isDropdownOpen} anchorEl={anchorEl}>
        <Paper>
          <LatestTrends
            latestTrends={latestTrends}
            handleCardClick={handleCardClick}
            handleSuggestionClick={handleSuggestionClick}
          />
        </Paper>
      </Popper>
    </div>
  );
}

