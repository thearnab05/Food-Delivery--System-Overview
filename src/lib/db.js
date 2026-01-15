// MOCK DATABASE CONNECTION
// Since no valid MongoDB URI was provided, we are mocking the connection
// to allow the application to run.

if (!global.mockUsers) {
    global.mockUsers = [];
    console.log('Initialized mock user storage');
}

async function connectDB() {
    console.log('MOCK DB: Connected successfully');
    return true;
}

export default connectDB;
