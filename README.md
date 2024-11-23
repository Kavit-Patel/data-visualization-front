# Interactive Data Visualization Dashboard

Front-end Deployed at - [link](https://data-visualization-front.vercel.app/)

## Introduction

The **Interactive Data Visualization Dashboard** is a platform that provides real-time analytics on sales, user engagement, and more. Built with React.js for the frontend and NestJS for the backend, it features secure API integration with Google Sheets for fetching analytics data. This ensures safe and efficient data processing while enabling dynamic visualization.

## Features

### Interactive Data Visualization

- **Bar Chart**: Displays total time spent on different features (A, B, C, etc.) for a selected date range.
- **Line Chart**: Shows time trends of a category when clicked in the bar chart, with pan, zoom-in, and zoom-out functionalities.

### Advanced Filtering

- **Filters**:
  - Age: `15-25`, `>25`
  - Gender: `Male`, `Female`
- **Date Range Selector**: Choose a custom date range for analytics, updating graphs dynamically.

### Cookie Management

- Stores user preferences for filters and date ranges.
- Automatically applies stored preferences on revisits.
- Provides an option to reset or clear preferences.

### URL Sharing

- Share filtered chart views via URLs.
- Authenticated users can view shared charts directly by accessing the URL.

### Responsiveness

- Fully responsive interface that adapts to desktops, tablets, and mobile devices.

### User Authentication

- Signup, Login functionalities ensure secure access to the platform.

---

## Technologies Used

### Frontend

- **React.js**: For building the interactive user interface.
- **Chart.js**: For rendering bar and line charts.
- **React-Router**: For managing URL sharing and navigation.

### Backend

- **NestJS**: For building a secure API integration layer.
- **Google Sheets API**: For fetching analytics data securely.

### Database

- **Postgresql**: For storing user authentication and preferences.

---

## Getting Started

### Prerequisites

1. Node.js (v16 or later)
2. npm or yarn package manager
3. Postgre setup
4. Google API credentials for Sheets access

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Kavit-Patel/data-visualization-front.git
   cd data-visualization-front
   Install dependencies:
   npm install
   ```

env

VITE_API=<Deployed Backend url>

VITE_GSHEET_API=https://nest-backend-data-visualization.onrender.com/sheet/1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0/Sheet3

Frontend Functionality
Fetches and visualizes analytics data dynamically.
Provides advanced filtering and date range selection.
Cookie Management
Uses cookies to store user preferences securely.
Automatically applies stored settings upon revisits.
User Authentication
nestjs session based authentication
URL Sharing
Encodes selected filters and date range in the URL.
Allows users to share specific chart views.
Responsiveness
The application is designed to work seamlessly on devices of all sizes, from desktops to mobiles.

Dataset
The project uses the dataset available here.
[text](https://nest-backend-data-visualization.onrender.com/sheet/1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0/Sheet3)

Future Enhancements
Add support for exporting charts as images or PDFs.
Introduce role-based access control for advanced analytics.
Implement real-time data updates using WebSocket.
Contributing
Contributions are welcome! Please create an issue or submit a pull request for any improvements or bug fixes.

License
This project is licensed under the MIT License.
