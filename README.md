# nba-app

This is a web application that displays NBA game scores for a given date. The user can toggle between showing the actual game scores, the score differences, and identifying clutch games (games with a score difference of fewer than 10 points).

## Installation

1. **Clone the repository**:
   
   Open your terminal and run the following command:

   ```bash
   git clone https://github.com/idoamit8/nba-app.git
   ```

2. **Navigate into the project directory:**

   ```bash
   cd nba
   ```

3. **Install the dependencies:**

   In the project root directory, run:

   ```bash
   npm install
   ```

## Running the Application

1.Start the Backend Server:

The backend server is a simple Express server that proxies requests to the NBA data API. Make sure your backend is running.

  * Navigate to your backend directory:
    ```bash
    cd backend
    ```
  * Install backend dependencies:
  
    ```bash
    npm install
    ```
  * Run the backend server:
    ```bash
    npm start
    ```

2. Start the React Frontend App:

   * Navigate back to the ui folder of the project:
   ```bash
   cd ui
   ```

   * Run the React app:
   ```bash
    npm start
    ```
   
This will launch the React app in development mode and open http://localhost:3001 in your browser.
