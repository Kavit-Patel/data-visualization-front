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
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [lineChartData, setLineChartData] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_GSHEET_API}`);
        const result = await response.json();
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

  const handleBarClick = (handleData) => {
    setSelectedFeature(handleData.feature);
    const [header] = data;
    const featureRow = header.findIndex((feat) => feat === handleData.feature);
    const lineData = filteredData.map((row) => ({
      date: row[0],
      time: parseInt(row[featureRow], 10),
    }));
    setLineChartData(lineData);
  };

  const updateURL = () => {
    const url = new URL(window.location.href);

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

    window.history.pushState({}, "", url.toString());
  };

  useEffect(() => {
    updateURL();
  }, [startDate, endDate, ageFilter, genderFilter]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const startDateParam = urlParams.get("startDate");
    const endDateParam = urlParams.get("endDate");
    const ageFilterParam = urlParams.get("ageFilter");
    const genderFilterParam = urlParams.get("genderFilter");

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
    <div style={{ width: "90%" }}>
      <h1 className="" style={{ width: "100%", textAlign: "center" }}>
        Feature Time Spent Analysis
      </h1>

      <div className="filter-row">
        <div>
          <label className="filter-item">Select Date Range</label>
          <div className=" date-picker-wrapper">
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
              className=""
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

        <div className="filter-item">
          <label className="block mb-1">Select Age Group</label>
          <select
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
            className=""
          >
            <option value="all">All Ages</option>
            {ageOptions.map((age, idx) => (
              <option key={idx} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label className="-">Select Gender</label>
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="-"
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

      {selectedFeature && (
        <div className="">
          <h2 className="" style={{ width: "100%", textAlign: "center" }}>
            Time Trend for {selectedFeature}
          </h2>
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
