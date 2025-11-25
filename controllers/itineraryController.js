const aiService = require('../services/aiService');

// Generate AI-powered itinerary
const generateItinerary = async (req, res) => {
    try {
        const {
            destination,
            duration,
            budget,
            adults = 1,
            children = 0,
            preferences = '',
            startDate,
            endDate
        } = req.body;

        // Validate required fields
        if (!destination || !duration || !budget) {
            return res.status(400).json({
                success: false,
                message: 'Destination, duration, and budget are required'
            });
        }

        // Validate trip duration (max 15 days)
        const numDays = parseInt(duration.split(' ')[0], 10);
        if (numDays > 15) {
            return res.status(400).json({
                success: false,
                message: 'Maximum trip duration allowed is 15 days'
            });
        }

        // Validate total travelers (max 15)
        const totalTravelers = adults + children;
        if (totalTravelers > 15) {
            return res.status(400).json({
                success: false,
                message: 'Maximum 15 travelers allowed'
            });
        }

        const tripDetails = {
            destination,
            duration,
            budget,
            adults,
            children,
            preferences,
            startDate,
            endDate
        };

        const itinerary = await aiService.generateItinerary(tripDetails);

        res.status(200).json({
            success: true,
            message: 'Itinerary generated successfully',
            data: itinerary
        });

    } catch (error) {
        console.error('Error in generateItinerary:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate itinerary',
            error: error.message
        });
    }
};

// Generate customized AI itinerary
const generateCustomItinerary = async (req, res) => {
    try {
        const {
            destination,
            duration,
            budget,
            adults = 1,
            children = 0,
            preferences = '',
            startDate,
            endDate,
            customizations = {}
        } = req.body;

        // Validate required fields
        if (!destination || !duration || !budget) {
            return res.status(400).json({
                success: false,
                message: 'Destination, duration, and budget are required'
            });
        }

        // Validate trip duration (max 15 days)
        const numDays = parseInt(duration.split(' ')[0], 10);
        if (numDays > 15) {
            return res.status(400).json({
                success: false,
                message: 'Maximum trip duration allowed is 15 days'
            });
        }

        // Validate total travelers (max 15)
        const totalTravelers = adults + children;
        if (totalTravelers > 15) {
            return res.status(400).json({
                success: false,
                message: 'Maximum 15 travelers allowed'
            });
        }

        const tripDetails = {
            destination,
            duration,
            budget,
            adults,
            children,
            preferences,
            startDate,
            endDate
        };

        const itinerary = await aiService.generateCustomItinerary(tripDetails, customizations);

        res.status(200).json({
            success: true,
            message: 'Custom itinerary generated successfully',
            data: itinerary
        });

    } catch (error) {
        console.error('Error in generateCustomItinerary:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate custom itinerary',
            error: error.message
        });
    }
};

// Regenerate itinerary with modifications
const regenerateItinerary = async (req, res) => {
    try {
        const {
            originalItinerary,
            modifications = {},
            customizations = {}
        } = req.body;

        if (!originalItinerary) {
            return res.status(400).json({
                success: false,
                message: 'Original itinerary is required for regeneration'
            });
        }

        // Extract trip details from original itinerary
        const tripDetails = {
            destination: originalItinerary.destination,
            duration: originalItinerary.duration,
            budget: originalItinerary.budget,
            adults: originalItinerary.totalTravelers - (originalItinerary.children || 0),
            children: originalItinerary.children || 0,
            preferences: modifications.preferences || '',
            startDate: modifications.startDate || originalItinerary.startDate,
            endDate: modifications.endDate || originalItinerary.endDate
        };

        // Merge customizations with modifications
        const mergedCustomizations = {
            ...customizations,
            ...modifications
        };

        const itinerary = await aiService.generateCustomItinerary(tripDetails, mergedCustomizations);

        res.status(200).json({
            success: true,
            message: 'Itinerary regenerated successfully',
            data: itinerary
        });

    } catch (error) {
        console.error('Error in regenerateItinerary:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to regenerate itinerary',
            error: error.message
        });
    }
};

module.exports = {
    generateItinerary,
    generateCustomItinerary,
    regenerateItinerary
};
