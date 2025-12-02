// controllers/itineraryController.js — DeepSeek Version (Option A)

const aiService = require("../services/aiService");

// Generate itinerary using DeepSeek AI
exports.generateItinerary = async (req, res) => {
  try {
    const itinerary = await aiService.generateItinerary(req.body);

    return res.json({
      success: true,
      data: itinerary.itinerary
    });
  } catch (error) {
    console.error("Itinerary Generation Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate itinerary",
      error: error.message
    });
  }
};

// Generate itinerary with custom user changes (same AI call)
exports.generateCustomItinerary = async (req, res) => {
  try {
    const { tripDetails, customizations } = req.body;

    const itinerary = await aiService.generateItinerary({
      ...tripDetails,
      ...customizations
    });

    return res.json({
      success: true,
      data: itinerary.itinerary
    });
  } catch (error) {
    console.error("Custom Itinerary Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate custom itinerary",
      error: error.message
    });
  }
};

// Regenerate itinerary with modifications
exports.regenerateItinerary = async (req, res) => {
  try {
    const itinerary = await aiService.generateItinerary(req.body);

    return res.json({
      success: true,
      data: itinerary.itinerary
    });
  } catch (error) {
    console.error("Regenerate Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to regenerate itinerary",
      error: error.message
    });
  }
};
