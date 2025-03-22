const axios = require('axios');
// API endpoint
const API_URL = 'http://localhost:3000/api/get_lesson';

// Function to add users to the database
async function addCourse() {
    try {
        const response = await axios.post(API_URL, user);
        console.log(`User ${user.email} added successfully:`, response.data);
    } catch (error) {
        console.error(`Failed to add user ${user.email}:`, error.response ? error.response.data : error.message);
    }
}

// Execute the script
addCourse();
