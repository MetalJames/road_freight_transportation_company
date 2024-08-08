# RoadLink Freight Services

## Database Group Project

This app was developed by **RYSS Technologies**.

**R** - Reliable  
**Y** - Yours  
**S** - Secure  
**S** - Solutions

## Dev Team:
- Shikha
- Shiji 
- Yash Parekh
- Volodymyr Ruzhak

---

## Project Objectives

### Database Design and Implementation
**Objective:** Design and implement a robust and scalable database that efficiently stores and manages information about trucks, employees, repairs, customers, shipments, and trips.

**Details:**
- Track details for trucks, including brand, load, capacity, year, and number of repairs.
- Monitor employee information, distinguishing between drivers and mechanics with relevant attributes.
- Record repair details, including the mechanic responsible and estimated repair times.
- Maintain comprehensive customer records with contact information.
- Document shipment details and their associated truck trips, including routes and drivers.

### CRUD Operations
**Objective:** Implement full CRUD functionality for all tables to ensure comprehensive data management.

**Details:**
- Create operations for adding new records.
- Read operations for fetching records.
- Update operations for modifying existing records.
- Delete operations for removing records.

### Testing
**Objective:** Ensure the reliability and correctness of our system through extensive testing.

**Details:**
- Develop unit tests to cover all CRUD operations, including happy paths, edge cases, and negative tests.
- Create integration tests to validate the interactions between different parts of the system.

### Entity Relationship Diagram
**Objective:** Provide a clear visual representation of the database structure.

**Details:**
- Create an ER diagram to illustrate the relationships between tables and the overall database schema.

### Project Technical Requirements
**Objective:** Utilize modern development practices and tools to ensure maintainability and scalability.

**Details:**
- Use React/Vite and TypeScript for the entire project.
- Use comprehensive Tailwind CSS for styling the app.
- For the backend, use Node.js with TypeScript (for hot updates).
- Implement an ODM for database interactions.
- Ensure the project is ready for deployment and testing.

---

## Setup Instructions

### Backend
1. Download the zip file.
2. Unzip it in the desired folder.
3. Open the unzipped folder with VS Code.
4. Open an external terminal with a right-click on the backend folder.
5. Navigate to the terminal and run `npm i` (i for install).
6. Create a `.env` file in the backend directory and place the following content in it:
    ```env
    PORT=5000
    MONGODB_URI=mongodb+srv://shijithajp1993:zN6JENS9CCXTw7w3@cfb-project.ag9dnyi.mongodb.net/road_freight_transportation_company?retryWrites=true&w=majority&appName=CFB-Project
    ```
7. For tests, run the command `npm test` or `npm test -- --coverage` (this will show code coverage).
8. To run the backend server, use the `npm run dev` command. This will run the server and show a green notification indicating that you are connected to MongoDB.

### Frontend
1. Navigate to the frontend folder and right-click on it to choose the external terminal.
2. Navigate to the terminal and run `npm i` (i for install).
3. Now you can use the `npm run dev` command to start the application.
4. In the terminal, you will see your port running, usually on `Local: http://localhost:5173/`.
5. Either hold `Ctrl` (on Windows) or `Command` (on Mac) and click on the `http://localhost:5173/` link, or open your browser and type it into the URL bar.
6. Your application is ready to be used. Navigate to various links and use it as you wish.

---

## Application Overview
The application represents a clear and intuitive display with a navbar, company name, and logo. In the main body, the first tab represents Trucks. Navigate through the menu links to open trips, shipments, customers, employees, and repair records. CRUD functionality is properly implemented, and the application is connected to MongoDB using Mongoose. To properly use the database (collections) and tables, we have used specific models to ensure the database is updated based on these models. We have used TypeScript interfaces (types) to reflect the proper use of variables.

---

## Technologies Used

### Frontend
- React
- Vite
- TypeScript
- Tailwind CSS
- AXIOS
- UUID(for random ID)

### Backend
- Node.js
- TypeScript
- Mongoose (OdM for MongoDB)
- AXIOS
- Express
- Cors
- dotenv
- mongodb
- mongoose

### Additional Tools
- Axios (for HTTP requests)
- UUID (for generating unique identifiers)
- ESLint (for linting)
- PostCSS and Autoprefixer (for CSS processing)
- Jest (for testing)

---

## Package.json Overview FronEnd
```json
{
  "name": "road_freight_transportation_company",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.7.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.25.1",
    "uuid": "^10.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@types/uuid": "^10.0.0",
    "@typescript-eslint/eslint-plugin": "^7.15.0",
    "@typescript-eslint/parser": "^7.15.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.7",
    "postcss": "^8.4.40",
    "tailwindcss": "^3.4.7",
    "typescript": "^5.2.2",
    "vite": "^5.3.4"
  }
}
```

## Package.json Overview BackEnd
```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "clean": "rimraf dist",
    "build": "npm run clean && npx tsc",
    "start": "ts-node ./server.ts",
    "dev": "nodemon --exec ts-node server.ts",
    "test": "jest --runInBand"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^1.7.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "mongodb": "^6.8.0",
    "mongoose": "^8.5.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/jest": "^29.5.12",
    "@types/node": "^20.14.13",
    "@types/supertest": "^6.0.2",
    "autoprefixer": "^10.4.19",
    "jest": "^29.7.0",
    "mongodb-memory-server": "^10.0.0",
    "nodemon": "^3.1.4",
    "postcss": "^8.4.40",
    "rimraf": "^6.0.1",
    "supertest": "^7.0.0",
    "tailwindcss": "^3.4.7",
    "ts-jest": "^29.2.3",
    "ts-node": "^10.9.2",
    "typescript": "^5.5.4"
  },
  "directories": {
    "test": "tests"
  },
  "description": ""
}
```

## Contact
### For any questions or issues, please reach out to the development team:

- Shikha@ryss.com
- Shiji@ryss.com
- Yash Parekh@ryss.com
- Volodymyr Ruzhak@ryss.com