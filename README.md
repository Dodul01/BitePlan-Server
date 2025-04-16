# Mealbox Server

Mealbox Server is a backend application designed to manage meal-related data and provide RESTful APIs for a meal delivery or management system. This server handles user authentication, meal management, order processing, and more. It is built using Node.js and Express, and connects to a database (e.g., MongoDB) to store and retrieve data.

## Features

- User registration and authentication
- Meal listing and management (CRUD operations)
- Order placement and tracking
- Secure API endpoints
- Error handling and validation

## How It Works

1. **User Authentication:**  
   Users can register and log in. Authentication tokens (JWT) are used to secure protected routes.

1. **Profile Management:**  
   Register User can update there information and addresses.

1. **Meal Management:**  
   Meal Provider can add, update, or delete meals. Users can view available meals.

1. **Order Processing:**  
   Authenticated users can place orders for meals. Orders are stored and can be tracked.

1. **API Endpoints:**  
   The server exposes RESTful endpoints for all operations. Middleware ensures security and data validation.

1. **Database Integration:**  
   All data (users, meals, orders) is stored in a database. Models define the structure and relationships.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/mealbox-server.git
   cd mealbox-server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**  
   Create a `.env` file with your database URI, JWT secret, and other settings.

4. **Run the server:**
   ```bash
   npm  run dev
   ```

## API Routes

| Route                               | Description                       |
| ----------------------------------- | --------------------------------- |
| `POST /api/users/create-user`       | Register a new user               |
| `GET /api/get-user/:email`          | Get the spesific User             |
| `PUT /api/update-user/:email`       | To update the user info           |
| `POST /api/auth/sign-in`            | User login                        |
| `POST /api/create-meal`             | Create Meal (Meal Provider only)  |
| `GET /api/meals`                    | Get All the meals                 |
| `PUT /api/update-meal/:id`          | Update Meal (Meal Provider only)  |
| `POST /api/order-meal`              | Order meal (Customer only)        |
| `GET /api/get-orders/:email`        | Get ordered Meals                 |
| `PUT /api/order-status/:id`         | Update order                      |
| `GET /api/create-preference`        | Create preference (Customer only) |
| `GET /api/get-preference/:email`    | Get Preference                    |
| `PUT /api/update-preference/:email` | Update Preference (Customer only) |
