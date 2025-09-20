
# SugarCraft

A full-stack Sweet Shop Management System for managing sweets, users, orders, and more. Built with Node.js, Express, MongoDB, React, and Vite.

---

## Project Overview
SugarCraft is a modern web application for sweet shop management. It features:
- Dynamic sweets catalog with carousel
- User authentication (JWT)
- Admin and customer dashboards
- Cart and order management
- Responsive UI with Framer Motion and Tailwind CSS

---


## Cloudinary

SugarCraft uses [Cloudinary](https://cloudinary.com/) for image upload and storage. You need a Cloudinary account and API credentials to enable sweet image uploads.



### Backend
1. Navigate to the backend folder:
   ```sh
   cd .. # if in /client
   cd SugarCraft
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `config` folder:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```
5. Run backend tests:
   ```sh
   npm test
   ```

### Frontend
1. Navigate to the frontend folder:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend (Vite dev server):
   ```sh
   npm run dev
   ```

---


## Screenshots

> Add screenshots of your running application here:
>
> ![Home Page](https://github.com/Avishkant/SugarCraft/blob/main/Images/Screenshot%20(861).png?raw=true)
> ![Carousel](screenshots/carousel.png)
> ![Admin Dashboard](screenshots/admin_dashboard.png)
> ![User Dashboard](screenshots/user_dashboard.png)
> ![Sweets](screenshots/sweets.png)
> ![Cart](screenshots/cart.png)

---

## Test Report

- **Statements Coverage:** 69.28% (106/153)
- **Branches Coverage:** 53.44% (31/58)
- **Functions Coverage:** 61.53% (8/13)
- **Lines Coverage:** 75.17% (106/141)

See full coverage report in `coverage/lcov-report/index.html`.

---

## My AI Usage

- **Gemini:** Used for color palette suggestions and design inspiration.
- **ChatGPT:** Used for UI/UX improvements, prompt generation, and code review.
- **GitHub Copilot:** Used for functionality development, error solutions, and code generation.

---


## Deployment

This app will be deployed soon. Platform and live link will be updated here:

> **Deployed on:** [Platform Name]
> **Live Link:** [To be updated]

---

