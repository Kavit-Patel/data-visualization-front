import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { formatDateForInput } from "../utility/formateDate";

export const useFilterData = (data) => {
  const urlParams = new URLSearchParams(window.location.search);

  // Helper function to get initial filter values
  const getInitialFilterValue = (param, cookieKey, defaultValue) => {
    const urlValue = urlParams.get(param);
    const cookieValue = Cookies.get(cookieKey);
    return urlValue || cookieValue || defaultValue;
  };

  // Set initial values by checking URL params, then cookies, and fall back to 'all' or undefined for dates
  const [startDate, setStartDate] = useState(
    getInitialFilterValue("startDate", "startDate", undefined)
      ? new Date(getInitialFilterValue("startDate", "startDate", undefined))
      : undefined
  );
  const [endDate, setEndDate] = useState(
    getInitialFilterValue("endDate", "endDate", undefined)
      ? new Date(getInitialFilterValue("endDate", "endDate", undefined))
      : undefined
  );
  const [ageFilter, setAgeFilter] = useState(
    getInitialFilterValue("ageFilter", "ageFilter", "all")
  );
  const [genderFilter, setGenderFilter] = useState(
    getInitialFilterValue("genderFilter", "genderFilter", "all")
  );

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const startDateParam = urlParams.get("startDate");
    const endDateParam = urlParams.get("endDate");

    // If URL params for date exist, update the states and set cookies
    if (startDateParam) {
      const startDateFromUrl = new Date(startDateParam);
      setStartDate(startDateFromUrl);
      Cookies.set("startDate", startDateParam, { expires: 7 });
    }

    if (endDateParam) {
      const endDateFromUrl = new Date(endDateParam);
      setEndDate(endDateFromUrl);
      Cookies.set("endDate", endDateParam, { expires: 7 });
    }

    // Always update cookies when age or gender filters change
    Cookies.set("ageFilter", ageFilter, { expires: 7 });
    Cookies.set("genderFilter", genderFilter, { expires: 7 });
  }, [ageFilter, genderFilter]);

  // Sync start and end date from data (only if cookies/URL are not set)
  useEffect(() => {
    if (
      data.length &&
      !Cookies.get("startDate") &&
      !Cookies.get("endDate") &&
      !urlParams.get("startDate") &&
      !urlParams.get("endDate")
    ) {
      setStartDate(new Date(formatDateForInput(data[1][0])));
      setEndDate(new Date(formatDateForInput(data[data.length - 1][0])));
    }
  }, [data]);

  // Apply filters whenever filters or dates change
  useEffect(() => {
    let filtered = data;

    // Apply date range filter if both start and end date are selected
    if (startDate && endDate) {
      filtered = filtered.filter((row) => {
        const date = new Date(formatDateForInput(row[0]));
        return date >= startDate && date <= endDate;
      });
    }

    // Apply age filter if selected
    if (ageFilter !== "all") {
      filtered = filtered.filter((row) => row[1] === ageFilter);
    }

    // Apply gender filter if selected
    if (genderFilter !== "all") {
      filtered = filtered.filter((row) => row[2] === genderFilter);
    }

    setFilteredData(filtered);
  }, [startDate, endDate, ageFilter, genderFilter, data]);

  return {
    filteredData,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    ageFilter,
    setAgeFilter,
    genderFilter,
    setGenderFilter,
  };
};
