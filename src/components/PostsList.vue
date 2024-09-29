<template>
    <div v-if="zodiacSigns">
      <div v-for="sign in zodiacSigns" :key="sign.id">
        <h3>{{ sign.name }} ({{ sign.symbol }})</h3>
        <p><strong>Element:</strong> {{ sign.element }}</p>
        <p><strong>Dates:</strong> {{ sign.dates }}</p>
        <p><strong>Ruling Planet:</strong> {{ sign.ruling_planet }}</p>
      </div>
    </div>
    <div v-else>
      Loading zodiac signs...
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  // Step 1: Get the Directus URL from environment variable
  const directusUrl = process.env.VUE_APP_DIRECTUS_URL; // Ensure this is set in your .env file
  
  // Step 2: Get credentials
  const credentials = {
  email: process.env.VUE_APP_DIRECTUS_EMAIL,
  password: process.env.VUE_APP_DIRECTUS_PASSWORD
};

  const zodiacSigns = ref(null);
  
  // Step 3: Function to authenticate and get the access token
  const authenticate = async () => {
    try {
      const response = await axios.post(`${directusUrl}/auth/login`, {
        email: credentials.email,
        password: credentials.password
      });
      return response.data.data.access_token; // Get the access token
    } catch (error) {
      console.error('Error during authentication:', error);
      throw new Error('Authentication failed');
    }
  };
  
  // Step 4: Function to fetch zodiac signs
  const fetchZodiacSigns = async (token) => {
    try {
      const response = await axios.get(`${directusUrl}/items/zodiac_signs?limit=12`, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the headers
        }
      });
      zodiacSigns.value = response.data.data; // Assign fetched data to zodiacSigns
    } catch (error) {
      console.error('Error fetching zodiac signs:', error);
    }
  };
  
  // Fetch data on component mount
  onMounted(async () => {
    try {
      const token = await authenticate(); // Authenticate to get the token
      await fetchZodiacSigns(token); // Fetch zodiac signs using the token
    } catch (error) {
      console.error('Failed to fetch zodiac signs:', error);
    }
  });
  </script>
  