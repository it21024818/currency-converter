# Currency Converter

## Technologies Used
- React.js
- Next.js
- Node.js
- Express.js
- MongoDB Atlas
- Material UI
- ExchangeRate-API

## Project Structure
- `/components`: React components
- `/pages/api`: API routes for server-side functionality
- `server.js`: Express server setup

## Run Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd currency-converter

2. Install dependencies:
   ```bash
   npm install

3. Create a .env file and add the following:
    ```bash
    PORT=3000
    MONGO_URI=mongodb+srv://it21024818:YLYjJEZ8AwCuvBlU@currency-converter-clus.bcmx6yf.mongodb.net/?retryWrites=true&w=majority&appName=currency-converter-cluster
    EXCHANGE_RATE_API=https://v6.exchangerate-api.com/v6/4d72f497a38a1606751b17ee
    SERVER_URL=http://localhost:5000

4. Start the development server:
    ```bash
    npm run dev

5. Start the backend server:
    ```bash
    node server.js

6. Open http://localhost:3000 to view the application.

## Live Demo

