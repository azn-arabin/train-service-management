# Train Service Management Project

## Overview

This project is a Train Service Management System built with Node.js, Express, MongoDB, node-corn, typeScripts and more. It allows users to manage trains, stations, fares, and tickets efficiently. The system includes features like train scheduling, fare management, ticket purchasing, and more.

## Prerequisites

- Node.js (Ensure Node.js is installed on your machine)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/azn-arabin/train-service-management.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd train-service-management
   ```

3. **Install the dependencies:**
   ```bash
   npm install
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

5. The server will start at `http://localhost:5000`.

## API Documentation

You can find the complete API documentation and endpoints for testing in the following Postman collection:

[Train System Management Postman Collection](https://www.postman.com/azn-arabin/workspace/train-system-management/collection/30963995-ecda1f89-5691-4fe6-a415-d6617dcda133?action=share&creator=30963995&active-environment=30963995-f0d18a19-17b8-423c-ad11-939b0cc73dbd)

## Features

- **Train Management**: Add, update, and delete trains with their respective stops and schedules.
- **Station Management**: Manage train stations.
- **Fare Management**: Define and manage fares between different stations.
- **Ticket Management**: Purchase and manage tickets, including wallet balance check and transaction records.
- **User Authentication**: Secure user authentication for ticket purchases.
- **Scheduled Tasks**: Automatically delete expired tickets using scheduled tasks with `node-cron`.

## Contributing

Feel free to fork the repository and make contributions. Pull requests are welcome!

---

