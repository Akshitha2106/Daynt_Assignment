# Dashboard Application

This is a simple dashboard application built with **Next.js**. The application provides a CRUD interface to manage items, complete with a responsive table, modals for adding/updating items, and a loader for smooth UX.

---

## Features

- **Authentication**: Redirects users to the login page if not authenticated.
- **CRUD Operations**: Add, update, and delete items.
- **API Integration**: Fetches and updates data from a backend server.
- **Loader**: Displays a full-page spinner during data fetches.
- **Responsive Table**: Handles dynamic data rendering.
- **Toast Notifications**: Provides feedback on user actions.

---

## Tech Stack

- **Frontend**:  
  - Next.js  
  - React  
  - React-Toastify  
  - CSS Modules  
- **Backend**:  
  - Node.js  
  - Express.js  

---

## Dependencies

- `next`: ^12.0.0  
- `react`: ^17.0.2  
- `react-dom`: ^17.0.2  
- `axios`: ^0.24.0  
- `react-toastify`: ^9.0.0  
- `react-loading-skeleton`: ^3.0.1  
- `react-loader-spinner`: ^5.3.4  
- `uuid`: ^8.3.2  

---

## Installation

### Prerequisites

Ensure that you have the following installed on your machine:

- Node.js (v14 or higher)  
- npm or yarn  

### Steps

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/your-repo/dashboard-app.git
   cd dashboard-app
   ```

2. **Install dependencies**:  
   ```bash
   cd frontend
   npm install
   ```

3. **Run the development server**:  
   ```bash
   npm run dev
   ```

4. **Set up the backend server**:  

   ```bash
   cd backend
   npm install
   ```
   

   ```bash
   node server.js
   ```

5. **Access the application**:  
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

## File Structure

```plaintext
.  
.
├── frontend/  
│   ├── components/  
│   │   ├── TableComponent.js        # Reusable table component  
│   ├── pages/  
│   │   ├── index.js                 # Login page  
│   │   ├── dashboard.js             # Dashboard page  
│   │   ├── signup.js                # Signup page  
│   ├── styles/  
│   │   ├── Auth.module.css          # Styles for authentication pages  
│   │   ├── Dashboard.module.css     # Styles for the dashboard  
│   │   ├── global.css               # Global styles for the app  
│   │   ├── Table.module.css         # Styles for the table component  
│   ├── utils/  
│   │   ├── api.js                   # Axios instance for API calls  
│   │   ├── auth.js                  # Utility functions for authentication  
├── backend/  
│   ├── server.js                    # Backend server  

```

---

## API Endpoints

- **Fetch Items**:  
  **Method**: GET  
  **Endpoint**: `/items`  

- **Add Item**:  
  **Method**: POST  
  **Endpoint**: `/items`  
  **Body**:
  ```json
  {
    "name": "Item Name",
    "dob": "YYYY-MM-DD"
  }
  ```

- **Update Item**:  
  **Method**: PUT  
  **Endpoint**: `/items/:id`  
  **Body**:
  ```json
  {
    "name": "Updated Name",
    "dob": "YYYY-MM-DD"
  }
  ```

- **Delete Item**:  
  **Method**: DELETE  
  **Endpoint**: `/items/:id`

---

## Usage

### Login
Navigates to the login page. Log in to access the dashboard.

### Dashboard Operations
Add, update, or delete items using the interface. Notifications will appear for each action.
