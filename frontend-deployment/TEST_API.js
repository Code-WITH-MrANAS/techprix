/**
 * API Connection Test Script
 * Run this to verify the backend is working before deployment
 */

const BACKEND_URL = 'https://techprix-uun4.vercel.app/api';

async function testAPI() {
  console.log('🧪 Testing TechPrix Backend API...\n');

  const endpoints = [
    { name: 'Health Check', url: '/health', method: 'GET' },
    { name: 'Get Projects', url: '/projects', method: 'GET' },
    { name: 'Get Reviews', url: '/reviews', method: 'GET' },
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${BACKEND_URL}${endpoint.url}`, {
        method: endpoint.method,
        headers: { 'Content-Type': 'application/json' },
      });

      const status = response.ok ? '✅' : '❌';
      const statusCode = response.status;
      console.log(`${status} ${endpoint.name} (${statusCode})`);

      if (response.ok) {
        const data = await response.json();
        console.log(`   Response: ${JSON.stringify(data).substring(0, 100)}...\n`);
      } else {
        console.log(`   Error: ${response.statusText}\n`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint.name} - Error: ${error.message}\n`);
    }
  }

  // Test Contact Form (POST)
  console.log('Testing Contact Form Submission...');
  try {
    const response = await fetch(`${BACKEND_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message',
      }),
    });

    const status = response.ok ? '✅' : '⚠️';
    console.log(
      `${status} Contact Form (${response.status}) - ${response.statusText}`
    );
  } catch (error) {
    console.log(`❌ Contact Form - Error: ${error.message}`);
  }

  console.log('\n✨ API Test Complete!');
}

// Run in browser console or Node.js
if (typeof window === 'undefined') {
  testAPI();
} else {
  window.testAPI = testAPI;
  console.log('Run testAPI() in console to test the backend');
}
