import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import data from "../../data/faker.json";
import Products from "../products/products";
import SearchBar from "../searchBar/searchbar";
import CheckBoxFilter from "../checkBoxFilter/checkBoxFilte";
import styles from "./mainPage.module.css";

export default function MainPage() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [priceRangeFilter, setPriceRangeFilter] = useState([]);
  const [ratingRangeFilter, setRatingRangeFilter] = useState([]);
  const [categoriesFilter, setCategoriesFilter] = useState([]);

  const handleSearchInputChange = (query) => {
    setSearchQuery(query);
    setShowTryAgain(false);
  filterProducts(query, categoriesFilter, priceRangeFilter, ratingRangeFilter);
  };

  const handleSearchIconClick = () => {
    filterProducts(searchQuery, categoriesFilter, priceRangeFilter, ratingRangeFilter);
  };

  const handleCategoriesFilterChange = (event) => {
    const value = event.target.value;
    const updatedCategories = event.target.checked
      ? [...categoriesFilter, value]
      : categoriesFilter.filter((category) => category !== value);

    setCategoriesFilter(updatedCategories);
    filterProducts(searchQuery, updatedCategories, priceRangeFilter, ratingRangeFilter);
  };

  const handlePriceRangeFilterChange = (event) => {
    const value = event.target.value;
    const updatedPriceRanges = event.target.checked
      ? [...priceRangeFilter, value]
      : priceRangeFilter.filter((priceRange) => priceRange !== value);

    setPriceRangeFilter(updatedPriceRanges);
    filterProducts(searchQuery, categoriesFilter, updatedPriceRanges, ratingRangeFilter);
  };

  const handleRatingFilterChange = (event) => {
    const value = event.target.value;
    const updatedRatings = event.target.checked
      ? [...ratingRangeFilter, value]
      : ratingRangeFilter.filter((rating) => rating !== value);
    setRatingRangeFilter(updatedRatings);
    const numericRatings = updatedRatings.map((rating) => parseInt(rating));
    filterProducts(searchQuery, categoriesFilter, priceRangeFilter, numericRatings);
  };
  const filterProductsByTrend = (trend) => {
    const filtered = products.filter((product) => product.trend === trend);
    setFilteredProducts(filtered);
  };
  const filterProducts = (query, categories, priceRanges, ratings) => {
    console.log(query);
    const lowercaseQuery = query.toLowerCase();
    const filtered = products.filter((product) => {
      console.log("Product Trend:", product.trend);
      const titleMatches = product.title.toLowerCase().includes(lowercaseQuery);
      const categoryMatches = categories.length === 0 || categories.includes(product.category.toLowerCase());
      const priceRangeMatches =
        priceRanges.length === 0 ||
        priceRanges.some((range) => {
          const [rangeLow, rangeHigh] = range.split("-").map(Number);
          return rangeLow <= product.price && product.price <= rangeHigh;
        });
      const ratingMatches = ratings.length === 0 || !!ratings.find((rating) => rating === Math.round(product.rating));
      
      return titleMatches && categoryMatches && priceRangeMatches && ratingMatches;
    });
  
    console.log(filtered);
  
    if (filtered.length === 0) {
      setShowTryAgain(true);
    } else {
      setShowTryAgain(false);
    }
  
    setFilteredProducts(filtered);
  };
  
  

  useEffect(() => {
    setProducts(data);
    setFilteredProducts(data);
  }, []);

  return (
    <div>
      <SearchBar handleSearchInputChange={handleSearchInputChange} handleSearchIconClick={handleSearchIconClick} filterProductsByTrend={filterProductsByTrend}/>
      <Grid container spacing={2} className={styles.container}>
        <Grid item xs={2}>
          <CheckBoxFilter
            categoriesFilter={categoriesFilter}
            priceRangeFilter={priceRangeFilter}
            ratingRangeFilter={ratingRangeFilter}
            handleCategoriesFilterChange={handleCategoriesFilterChange}
            handlePriceRangeFilterChange={handlePriceRangeFilterChange}
            handleRatingFilterChange={handleRatingFilterChange}
          />
        </Grid>
        {showTryAgain ? (
          <h6 className={styles.text}>No products found. Please try again.</h6>
        ) : (
          <Grid item xs={10}>
            <Products products={filteredProducts} />
          </Grid>
        )}
      </Grid>
    </div>
  );
}
