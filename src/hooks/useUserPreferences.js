import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { formatDateForInput } from "../utility/formateDate";

export const useFilterData = (data) => {
  const urlParams = new URLSearchParams(window.location.search);

  const getInitialFilterValue = (param, cookieKey, defaultValue) => {
    const urlValue = urlParams.get(param);
    const cookieValue = Cookies.get(cookieKey);
    return urlValue || cookieValue || defaultValue;
  };
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

    Cookies.set("ageFilter", ageFilter, { expires: 7 });
    Cookies.set("genderFilter", genderFilter, { expires: 7 });
  }, [ageFilter, genderFilter]);

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

  useEffect(() => {
    let filtered = data;

    if (startDate && endDate) {
      filtered = filtered.filter((row) => {
        const date = new Date(formatDateForInput(row[0]));
        return date >= startDate && date <= endDate;
      });
    }

    if (ageFilter !== "all") {
      filtered = filtered.filter((row) => row[1] === ageFilter);
    }

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
