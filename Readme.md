# GPU Auction Platform (MERN Stack)

## Overview

GPU Auction Platform is a web-based marketplace where auctioneers can list GPUs for auction, set starting prices, and close bids. Buyers can place different bids, and the highest bidder at the time of auction closing wins. The platform provides individual dashboards for both auctioneers and buyers to track their auctions and bids.

## Features

### Auctioneer Features:

- Create GPU auctions with a starting price.

- View all bids placed on their auction.

- Close the auction when desired.

- Declare the highest bidder as the winner.

### Buyer Features:

- Browse available GPU auctions.

- Place bids with custom amounts.

- View bid history and auction results in the dashboard.

### General Features:

- Authentication (Sign Up/Login).

- Real-time bidding updates.

- User dashboard to track auctions and bids.

- Responsive UI.

## Tech Stack

- Frontend: React.js, Tailwind CSS

- Backend: Node.js, Express.js

- Database: MongoDB

- Authentication: JWT (JSON Web Tokens)

- Real-Time Updates: WebSockets (Socket.io)

- Deployment: Vercel (Frontend), Render (Backend)

## Installation & Setup

### Prerequisites

- Node.js 

- MongoDB 

- npm or yarn

### Clone Repository
```bash
git clone https://github.com/yourusername/gpu-auction.git
cd gpu-auction
```
### Backend Setup
```bash
cd backend
npm install
cp .env.example .env  # Configure environment variables
npm start
```
### Frontend Setup
```bash
cd frontend
npm install
npm start
```
### Environment Variables

Create a .env file in the backend directory and configure the following:
```bash
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
## API Endpoints (Example)

- POST /api/signup - User registration

- POST /api/signin - User login

- POST /api/addgpu - Create a new GPU auction

- POST /api/fetchallGPUs - Retrieve all listed GPUs

- POST /api/updateGPU/:id - Update GPU details

- POST /api/fetchGPUById/:id - Fetch GPU details by ID

- POST /api/updateGPUStatus/:gpuId - Update GPU status (Close auction)

- POST /api/placeBid - Place a bid

- GET /api/fetchBids - Fetch all bids

- GET /api/fetchBids/:gpuId - Fetch bids by GPU ID

- GET /api/getDashboardData - Get data of GPU and Auction information in dashboard


## License

- This project is licensed under a restrictive policy:

- Others may view and use the code for personal or educational purposes.

- Modification, redistribution, or contributions are not allowed.

- The project remains solely maintained by the original author.

