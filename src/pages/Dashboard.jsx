import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import "./Dashboard.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFilterData } from "../hooks/useUserPreferences";
import CustomBar from "../component/CustomBar";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [ageOptions, setAgeOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null); // For tracking selected bar
  const [lineChartData, setLineChartData] = useState([]); // Data for LineChart

  const {
    filteredData,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    ageFilter,
    setAgeFilter,
    genderFilter,
    setGenderFilter,
  } = useFilterData(data);

  // Fetch data from API on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://nest-data-visualization-backend-6wwt.onrender.com/sheet/1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0/Sheet3"
        );
        const result = await response.json();
        console.log("result ", result);
        // Process and store unique age and gender options
        const [, ...otherRows] = result;
        const ages = [...new Set(otherRows.map((row) => row[1]))];
        const genders = [...new Set(otherRows.map((row) => row[2]))];

        setAgeOptions(ages);
        setGenderOptions(genders);
        setData(result);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const aggregatedData = [
    {
      feature: "A",
      time: filteredData.reduce((acc, row) => acc + parseInt(row[3]), 0),
      color: "#8884d8",
    },
    {
      feature: "B",
      time: filteredData.reduce((acc, row) => acc + parseInt(row[4]), 0),
      color: "#82ca9d",
    },
    {
      feature: "C",
      time: filteredData.reduce((acc, row) => acc + parseInt(row[5]), 0),
      color: "#83a6ed",
    },
    {
      feature: "D",
      time: filteredData.reduce((acc, row) => acc + parseInt(row[6]), 0),
      color: "#8dd1e1",
    },
    {
      feature: "E",
      time: filteredData.reduce((acc, row) => acc + parseInt(row[7]), 0),
      color: "#d84d84",
    },
    {
      feature: "F",
      time: filteredData.reduce((acc, row) => acc + parseInt(row[8]), 0),
      color: "#ffc393",
    },
  ];

  // Event handler for bar click
  const handleBarClick = (handleData) => {
    console.log(handleData, data);
    setSelectedFeature(handleData.feature);
    const [header] = data;
    const featureRow = header.findIndex((feat) => feat === handleData.feature);
    const lineData = filteredData.map((row) => ({
      date: row[0],
      time: parseInt(row[featureRow], 10),
    }));
    setLineChartData(lineData);
  };

  // 1. Update URL whenever filters change
  const updateURL = () => {
    const url = new URL(window.location.href);

    // Set URL search params
    if (startDate) {
      url.searchParams.set("startDate", startDate.toISOString());
    } else {
      url.searchParams.delete("startDate");
    }

    if (endDate) {
      url.searchParams.set("endDate", endDate.toISOString());
    } else {
      url.searchParams.delete("endDate");
    }

    url.searchParams.set("ageFilter", ageFilter);
    url.searchParams.set("genderFilter", genderFilter);

    // Push the updated URL to the browser history
    window.history.pushState({}, "", url.toString());
  };

  // Trigger the URL update whenever filters change
  useEffect(() => {
    updateURL();
  }, [startDate, endDate, ageFilter, genderFilter]);

  // 2. Extract the filters from the URL on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    // Get filters from the URL
    const startDateParam = urlParams.get("startDate");
    const endDateParam = urlParams.get("endDate");
    const ageFilterParam = urlParams.get("ageFilter");
    const genderFilterParam = urlParams.get("genderFilter");

    // Restore filters from the URL if they exist
    if (startDateParam) {
      setStartDate(new Date(startDateParam));
    }
    if (endDateParam) {
      setEndDate(new Date(endDateParam));
    }
    if (ageFilterParam) {
      setAgeFilter(ageFilterParam);
    }
    if (genderFilterParam) {
      setGenderFilter(genderFilterParam);
    }
  }, []);

  return (
    <div className="p-6 w-full bg-red-300" style={{ width: "90%" }}>
      <h1
        className="text-2xl mb-4 text-red-500"
        style={{ width: "100%", textAlign: "center" }}
      >
        Feature Time Spent Analysis
      </h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6 filter-row">
        <div>
          <label className="block mb-1 filter-item">Select Date Range</label>
          <div className="flex gap-2 date-picker-wrapper">
            <DatePicker
              selected={startDate}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => {
                if (date) {
                  setStartDate(date);
                  if (endDate && date > endDate) {
                    setEndDate(date);
                  }
                }
              }}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="border p-2"
            />
            <DatePicker
              selected={endDate}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => date && setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              className="border p-2"
            />
          </div>
        </div>

        {/* Age Filter */}
        <div className="filter-item">
          <label className="block mb-1">Select Age Group</label>
          <select
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
            className="border p-2"
          >
            <option value="all">All Ages</option>
            {ageOptions.map((age, idx) => (
              <option key={idx} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>

        {/* Gender Filter */}
        <div className="filter-item">
          <label className="block mb-1">Select Gender</label>
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="border p-2"
          >
            <option value="all">All Genders</option>
            {genderOptions.map((gender, idx) => (
              <option key={idx} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={aggregatedData} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey="feature" type="category" />
          <Tooltip />
          <Bar
            dataKey="time"
            shape={(props) => (
              <CustomBar {...props} fill={props.payload.color} />
            )}
            onClick={(data) => handleBarClick(data)}
          >
            <LabelList dataKey="time" position="right" offset={10} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Line Chart */}
      {selectedFeature && (
        <div className="mt-6">
          <h2 className="text-xl mb-4">Time Trend for {selectedFeature}</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={lineChartData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, (dataMax) => Math.ceil(dataMax * 1.1)]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="time" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
