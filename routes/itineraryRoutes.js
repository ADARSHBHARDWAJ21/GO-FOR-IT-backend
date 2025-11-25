const express = require('express');
const router = express.Router();
const {
    generateItinerary,
    generateCustomItinerary,
    regenerateItinerary
} = require('../controllers/itineraryController');

// Generate AI-powered itinerary
router.post('/generate', generateItinerary);

// Generate customized AI itinerary
router.post('/generate-custom', generateCustomItinerary);

// Regenerate itinerary with modifications
router.post('/regenerate', regenerateItinerary);

module.exports = router;
