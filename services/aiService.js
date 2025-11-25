const crypto = require('crypto');

const destinationTemplates = {
    delhi: {
        city: 'Delhi',
        dailyBudget: '₹4,000',
        highlights: [
            'UNESCO heritage sites',
            'Street food trails',
            'Museums & galleries',
            'Night markets'
        ],
        slots: {
            morning: [
                {
                    title: 'Historic Red Fort & Chandni Chowk Walk',
                    location: 'Lal Qila • Old Delhi',
                    description: 'Guided walk through Red Fort followed by rickshaw ride across Chandni Chowk lanes.',
                    type: 'sightseeing',
                    cost: '₹1,200',
                    duration: '3 hours'
                },
                {
                    title: 'Humayun’s Tomb & Lodhi Art District',
                    location: 'Nizamuddin & Lodhi Garden',
                    description: 'Marvel Indo-Persian architecture and stroll through India’s first open-air art district.',
                    type: 'sightseeing',
                    cost: '₹900',
                    duration: '2.5 hours'
                }
            ],
            afternoon: [
                {
                    title: 'Food Crawl in Connaught Place',
                    location: 'Connaught Place',
                    description: 'Taste iconic dishes at Bengali Market, Wenger’s and Haldiram’s.',
                    type: 'dining',
                    cost: '₹800',
                    duration: '2 hours'
                },
                {
                    title: 'National Museum & Rajpath Drive',
                    location: 'Janpath & Kartavya Path',
                    description: 'Explore 2,000 years of history followed by photo stops at India Gate & Parliament.',
                    type: 'sightseeing',
                    cost: '₹500',
                    duration: '2 hours'
                }
            ],
            evening: [
                {
                    title: 'Akshardham Light & Water Show',
                    location: 'Akshardham Temple',
                    description: 'Watch Sahaj Anand multimedia fountain with synchronized lights.',
                    type: 'entertainment',
                    cost: '₹200',
                    duration: '1.5 hours'
                },
                {
                    title: 'Qutub Minar Sunset & Mehrauli Village',
                    location: 'Mehrauli Archaeological Park',
                    description: 'Golden hour at Qutub Minar followed by cafes in Mehrauli village.',
                    type: 'sightseeing',
                    cost: '₹600',
                    duration: '2 hours'
                }
            ],
            alternatives: [
                { title: 'Dilli Haat handicraft bazaar', type: 'shopping' },
                { title: 'Kingdom of Dreams Broadway show (Gurugram)', type: 'entertainment' },
                { title: 'Yamuna Arti at Nigambodh Ghat', type: 'cultural' }
            ]
        }
    },
    goa: {
        city: 'Goa',
        dailyBudget: '₹3,200',
        highlights: ['Beach hopping', 'Water sports', 'Heritage churches', 'Night markets'],
        slots: {
            morning: [
                {
                    title: 'Calangute & Baga Beach Water Sports',
                    location: 'North Goa',
                    description: 'Parasailing, bumper ride and banana boat combo.',
                    type: 'adventure',
                    cost: '₹1,800',
                    duration: '3 hours'
                },
                {
                    title: 'Old Goa UNESCO Heritage Trail',
                    location: 'Old Goa',
                    description: 'Visit Basilica of Bom Jesus, Se Cathedral and the Latin Quarter Fontainhas.',
                    type: 'sightseeing',
                    cost: '₹400',
                    duration: '3 hours'
                }
            ],
            afternoon: [
                {
                    title: 'Spice Plantation Lunch Experience',
                    location: 'Ponda',
                    description: 'Guided plantation tour with Goan buffet and feni tasting.',
                    type: 'dining',
                    cost: '₹1,000',
                    duration: '2.5 hours'
                },
                {
                    title: 'Chapora Fort & Vagator Sunset',
                    location: 'Vagator',
                    description: 'Hike to Dil Chahta Hai fort followed by beach cafes.',
                    type: 'sightseeing',
                    cost: '₹300',
                    duration: '2 hours'
                }
            ],
            evening: [
                {
                    title: 'Sunset Cruise on Mandovi',
                    location: 'Panjim Jetty',
                    description: 'Live music, folk performances and river views.',
                    type: 'entertainment',
                    cost: '₹600',
                    duration: '1.5 hours'
                },
                {
                    title: 'Saturday Night Market & Club Hopping',
                    location: 'Arpora & Anjuna',
                    description: 'Shop indie brands, followed by nightlife at Tito’s lane.',
                    type: 'entertainment',
                    cost: '₹1,200',
                    duration: '3 hours'
                }
            ],
            alternatives: [
                { title: 'Dudhsagar waterfall jeep safari', type: 'adventure' },
                { title: 'Butterfly Beach private boat', type: 'leisure' },
                { title: 'Artjuna wellness workshops', type: 'activity' }
            ]
        }
    },
    kerala: {
        city: 'Kerala',
        dailyBudget: '₹3,800',
        highlights: ['Backwater cruises', 'Spice trails', 'Tea plantations', 'Ayurvedic therapies'],
        slots: {
            morning: [
                {
                    title: 'Houseboat Check-in & Alleppey Cruise',
                    location: 'Punnamada Lake',
                    description: 'Sail through coconut lagoons with onboard chef.',
                    type: 'leisure',
                    cost: '₹2,500',
                    duration: '4 hours'
                },
                {
                    title: 'Munnar Tea Estate Trek',
                    location: 'Kolukkumalai / Lockhart',
                    description: 'Sunrise trek plus factory tasting session.',
                    type: 'adventure',
                    cost: '₹1,200',
                    duration: '4 hours'
                }
            ],
            afternoon: [
                {
                    title: 'Periyar Wildlife Boat Safari',
                    location: 'Thekkady',
                    description: 'Spot elephants and gaur around the lake.',
                    type: 'adventure',
                    cost: '₹500',
                    duration: '2 hours'
                },
                {
                    title: 'Kathakali & Kalaripayattu Showcase',
                    location: 'Fort Kochi',
                    description: 'Backstage makeup tour followed by performances.',
                    type: 'cultural',
                    cost: '₹700',
                    duration: '2 hours'
                }
            ],
            evening: [
                {
                    title: 'Sunset at Marine Drive Walkway',
                    location: 'Kochi',
                    description: 'Chinese fishing nets and cafe hopping.',
                    type: 'leisure',
                    cost: '₹300',
                    duration: '1.5 hours'
                },
                {
                    title: 'Sarovaram Ayurveda & Spa Session',
                    location: 'Kumarakom',
                    description: 'Traditional Abhyangam massage with medicated oils.',
                    type: 'wellness',
                    cost: '₹1,500',
                    duration: '1 hour'
                }
            ],
            alternatives: [
                { title: 'Poovar mangrove canoe ride', type: 'nature' },
                { title: 'Athirappilly waterfalls excursion', type: 'sightseeing' },
                { title: 'Vypeen island cycling circuit', type: 'activity' }
            ]
        }
    }
};

const getDestinationTemplate = (destination = '') => {
    const normalized = destination.toLowerCase().trim();
    const direct = destinationTemplates[normalized];
    if (direct) return direct;

    return Object.values(destinationTemplates).find(template =>
        normalized.includes(template.city.toLowerCase())
    ) || {
        city: destination || 'Your Destination',
        dailyBudget: '₹2,500',
        highlights: [
            'Morning sightseeing',
            'Local dining spots',
            'Evening cultural walk'
        ],
        slots: {
            morning: [{
                title: 'Guided heritage walk',
                location: destination,
                description: 'Discover local monuments with a certified guide.',
                type: 'sightseeing',
                cost: '₹900',
                duration: '3 hours'
            }],
            afternoon: [{
                title: 'Regional cuisine tasting',
                location: 'City centre',
                description: 'Sample famous dishes at century-old eateries.',
                type: 'dining',
                cost: '₹700',
                duration: '2 hours'
            }],
            evening: [{
                title: 'Night bazaar & performances',
                location: 'Popular market',
                description: 'Shop handicrafts and enjoy street music.',
                type: 'cultural',
                cost: '₹500',
                duration: '2 hours'
            }],
            alternatives: [{ title: 'Local handicraft workshop', type: 'activity' }]
        }
    };
};

const pickSlotActivity = (list = [], index = 0, fallback) => {
    if (!list.length) return fallback;
    return list[index % list.length];
};

class AIService {
    constructor() {
        this.apiKey = process.env.GEMINI_API_KEY;
        this.modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
        this.model = null;
        this.modelInitPromise = null;
        this.aiAvailable = Boolean(this.apiKey);

        if (!this.aiAvailable) {
            console.warn('[AI Service] GEMINI_API_KEY not configured. Using mock itineraries.');
        }
    }

    async ensureModel() {
        if (!this.aiAvailable || this.model) {
            return this.model;
        }

        if (!this.modelInitPromise) {
            this.modelInitPromise = (async () => {
                try {
                    const { GoogleGenerativeAI } = await import('@google/generative-ai');
                    const client = new GoogleGenerativeAI(this.apiKey);
                    
                    // Try the configured model first
                    const modelsToTry = [
                        this.modelName,
                        'gemini-1.5-flash',
                        'gemini-1.5-pro',
                        'gemini-pro'
                    ];
                    
                    let initialized = false;
                    for (const modelName of modelsToTry) {
                        try {
                            this.model = client.getGenerativeModel({ model: modelName });
                            // Test the model by checking if it's accessible
                            this.modelName = modelName;
                            console.log(`[AI Service] Gemini model '${modelName}' initialized successfully.`);
                            initialized = true;
                            break;
                        } catch (modelError) {
                            // Try next model
                            continue;
                        }
                    }
                    
                    if (!initialized) {
                        throw new Error('Failed to initialize any Gemini model. Please check your API key and ensure it has access to Gemini models.');
                    }
                } catch (error) {
                    this.aiAvailable = false;
                    console.error('[AI Service] Failed to initialize Gemini:', error.message);
                    console.error('[AI Service] Please verify your GEMINI_API_KEY in the .env file is correct and has proper permissions.');
                }
                return this.model;
            })();
        }

        return this.modelInitPromise;
    }

    async generateItinerary(tripDetails) {
        return this.generateWithFallback(tripDetails);
    }

    async generateCustomItinerary(tripDetails, customizations = {}) {
        return this.generateWithFallback(tripDetails, customizations);
    }

    async generateWithFallback(tripDetails, customizations = {}) {
        await this.ensureModel();

        if (this.model) {
            try {
                const prompt = this.buildPrompt(tripDetails, customizations);
                const result = await this.model.generateContent(prompt);
                const text = result?.response?.text?.();

                const cleaned = this.extractJson(text);
                if (cleaned) {
                    const parsed = JSON.parse(cleaned);
                    return this.normalizeItinerary(parsed, tripDetails);
                }
            } catch (error) {
                console.error('[AI Service] Gemini generation failed:', error.message);
            }
        }

        return this.generateMockItinerary(tripDetails, customizations);
    }

    buildPrompt(tripDetails, customizations) {
        const {
            destination,
            duration,
            budget,
            adults = 1,
            children = 0,
            preferences = '',
            startDate = '',
            endDate = '',
            departureAirport = '',
            departureStation = ''
        } = tripDetails;

        return `
You are an expert Indian travel planner. Create a JSON itinerary with the following structure (no prose, JSON only):
{
  "destination": string,
  "duration": string,
  "budget": string,
  "totalTravelers": number,
  "children": number,
  "startDate": string,
  "endDate": string,
  "days": [
    {
      "day": number,
      "date": string,
      "city": string,
      "theme": string,
      "dailyBudget": string,
      "highlights": string[],
      "activities": [
        {
          "time": string,
          "title": string,
          "type": string,
          "location": string,
          "description": string,
          "duration": string,
          "cost": string
        }
      ],
      "alternatives": [
        {
          "title": string,
          "type": string,
          "description": string
        }
      ]
    }
  ],
  "transportation": {
    "flights": [],
    "trains": []
  },
  "accommodation": {
    "budget": [],
    "midRange": [],
    "luxury": []
  },
  "tips": string[],
  "emergencyContacts": {
    "localHelpline": string,
    "emergencyServices": string
  }
}

Trip Details:
- Destination: ${destination}
- Duration: ${duration}
- Budget: ${budget}
- Adults: ${adults}
- Children: ${children}
- Preferences: ${preferences}
- Start Date: ${startDate}
- End Date: ${endDate}

Customizations: ${JSON.stringify(customizations)}

Constraints:
1. Keep maximum 15 days.
2. Costs in INR with symbol.
3. Include family-friendly options when children > 0.
4. Suggest realistic activities for the destination.
5. DO NOT repeat any place/attraction across different days. Each place should appear only once in the entire itinerary.
6. Each day must have minimum 4 unique activities/places to visit (excluding transport).
7. Day 1 must start with pickup from airport or railway station (based on user's departureAirport or departureStation selection).
8. Last day must end with drop at airport or railway station.
9. Each day must include hotel pickup at the start and hotel drop at the end.
10. Use real, specific place names for the destination (e.g., for Delhi: Red Fort, India Gate, Qutub Minar, etc.).

Departure Info:
- Departure Airport: ${departureAirport || 'Not specified'}
- Departure Station: ${departureStation || 'Not specified'}
`;
    }

    extractJson(text = '') {
        if (!text) {
            return null;
        }

        // Try to find the first JSON object in the response
        const start = text.indexOf('{');
        const end = text.lastIndexOf('}');

        if (start === -1 || end === -1) {
            return null;
        }

        return text.slice(start, end + 1);
    }

    enhanceDaysWithTransport(days, tripDetails) {
        if (!Array.isArray(days) || days.length === 0) return days;

        const getTransportPoint = () => {
            if (tripDetails.departureAirport) {
                const airportName = tripDetails.departureAirport.split(' - ')[1] || tripDetails.departureAirport;
                return airportName;
            }
            if (tripDetails.departureStation) {
                const stationName = tripDetails.departureStation.split(' - ')[1] || tripDetails.departureStation;
                return stationName;
            }
            return 'Airport/Railway Station';
        };
        const transportPoint = getTransportPoint();

        return days.map((day, index) => {
            const isFirstDay = index === 0;
            const isLastDay = index === days.length - 1;
            const activities = Array.isArray(day.activities) ? [...day.activities] : [];

            // Check if transport activities already exist
            const hasAirportPickup = activities.some(a => 
                a.title?.toLowerCase().includes('pickup') && 
                (a.location?.toLowerCase().includes('airport') || a.location?.toLowerCase().includes('station'))
            );
            const hasHotelPickup = activities.some(a => 
                a.title?.toLowerCase().includes('hotel pickup')
            );
            const hasHotelDrop = activities.some(a => 
                a.title?.toLowerCase().includes('hotel drop')
            );
            const hasAirportDrop = activities.some(a => 
                a.title?.toLowerCase().includes('drop') && 
                (a.location?.toLowerCase().includes('airport') || a.location?.toLowerCase().includes('station'))
            );

            // Add airport/station pickup on day 1 if missing
            if (isFirstDay && !hasAirportPickup) {
                activities.unshift({
                    time: '09:00 AM',
                    title: `Pickup from ${transportPoint}`,
                    type: 'transport',
                    location: transportPoint,
                    description: `Meet and greet at ${transportPoint}. Transfer to hotel.`,
                    duration: '1 hour',
                    cost: '₹500'
                });
            }

            // Add hotel pickup if not first day and missing
            if (!isFirstDay && !hasHotelPickup) {
                activities.unshift({
                    time: '09:00 AM',
                    title: 'Hotel Pickup',
                    type: 'transport',
                    location: 'Hotel',
                    description: 'Pickup from hotel for day\'s activities.',
                    duration: '15 minutes',
                    cost: 'Included'
                });
            }

            // Add airport/station drop on last day if missing
            if (isLastDay && !hasAirportDrop) {
                activities.push({
                    time: activities.length > 0 ? '08:00 PM' : '06:00 PM',
                    title: `Drop at ${transportPoint}`,
                    type: 'transport',
                    location: transportPoint,
                    description: `Transfer to ${transportPoint} for departure.`,
                    duration: '1 hour',
                    cost: '₹500'
                });
            }

            // Add hotel drop if not last day and missing
            if (!isLastDay && !hasHotelDrop) {
                activities.push({
                    time: activities.length > 0 ? '09:00 PM' : '08:00 PM',
                    title: 'Hotel Drop',
                    type: 'transport',
                    location: 'Hotel',
                    description: 'Return to hotel after day\'s activities.',
                    duration: '15 minutes',
                    cost: 'Included'
                });
            }

            return {
                ...day,
                activities
            };
        });
    }

    normalizeItinerary(itinerary, tripDetails) {
        if (!itinerary || typeof itinerary !== 'object') {
            return this.generateMockItinerary(tripDetails);
        }

        const days = Array.isArray(itinerary.days) && itinerary.days.length > 0
            ? this.enhanceDaysWithTransport(itinerary.days, tripDetails)
            : this.buildMockDays(tripDetails);

        return {
            destination: itinerary.destination || tripDetails.destination,
            duration: itinerary.duration || tripDetails.duration,
            budget: itinerary.budget || tripDetails.budget,
            totalTravelers: itinerary.totalTravelers || (tripDetails.adults || 1) + (tripDetails.children || 0),
            children: itinerary.children ?? tripDetails.children ?? 0,
            startDate: itinerary.startDate || tripDetails.startDate || '',
            endDate: itinerary.endDate || tripDetails.endDate || '',
            days,
            transportation: itinerary.transportation || this.buildMockTransportation(tripDetails.destination),
            accommodation: itinerary.accommodation || this.buildMockAccommodation(tripDetails.destination),
            tips: itinerary.tips || [
                'Carry a reusable water bottle to stay hydrated.',
                'Keep digital copies of important documents.'
            ],
            emergencyContacts: itinerary.emergencyContacts || {
                localHelpline: '112',
                emergencyServices: '100'
            }
        };
    }

    generateMockItinerary(tripDetails = {}, customizations = {}) {
        const days = this.buildMockDays(tripDetails, customizations);

        return {
            destination: tripDetails.destination || 'Unknown Destination',
            duration: tripDetails.duration || `${days.length} days`,
            budget: tripDetails.budget || '₹25,000',
            totalTravelers: (tripDetails.adults || 1) + (tripDetails.children || 0),
            children: tripDetails.children || 0,
            startDate: tripDetails.startDate || '',
            endDate: tripDetails.endDate || '',
            days,
            transportation: this.buildMockTransportation(tripDetails.destination),
            accommodation: this.buildMockAccommodation(tripDetails.destination),
            totalEstimatedCost: tripDetails.budget || '₹25,000',
            tips: [
                'Book popular activities in advance during peak season.',
                'Keep some cash handy for local markets.',
                'Try local cuisine at trusted eateries.'
            ],
            emergencyContacts: {
                localHelpline: '112',
                emergencyServices: '100',
                tourismHelpline: '1363'
            },
            debug: {
                id: crypto.randomUUID(),
                source: 'mock',
                generatedAt: new Date().toISOString()
            }
        };
    }

    buildMockDays(tripDetails = {}, customizations = {}) {
        const durationString = tripDetails.duration || '3 days';
        const numDays = Math.min(parseInt(durationString, 10) || 3, 15);
        const destination = tripDetails.destination || 'Your Destination';
        const baseDate = tripDetails.startDate ? new Date(tripDetails.startDate) : null;
        const template = getDestinationTemplate(destination);

        // Track used places to avoid repetition
        const usedPlaces = new Set();
        const getTransportPoint = () => {
            if (tripDetails.departureAirport) {
                const airportName = tripDetails.departureAirport.split(' - ')[1] || tripDetails.departureAirport;
                return airportName;
            }
            if (tripDetails.departureStation) {
                const stationName = tripDetails.departureStation.split(' - ')[1] || tripDetails.departureStation;
                return stationName;
            }
            return 'Airport/Railway Station';
        };
        const transportPoint = getTransportPoint();

        // Collect all available activities from template
        const allActivities = [
            ...(template.slots.morning || []),
            ...(template.slots.afternoon || []),
            ...(template.slots.evening || []),
            ...(template.slots.lateNight || [])
        ];

        // Helper to get next unused activity
        const getNextUnusedActivity = (slotList, fallback) => {
            if (!slotList || slotList.length === 0) return fallback;
            
            // Try to find an unused activity
            for (const activity of slotList) {
                const placeKey = `${activity.title}|${activity.location}`.toLowerCase();
                if (!usedPlaces.has(placeKey)) {
                    usedPlaces.add(placeKey);
                    return activity;
                }
            }
            
            // If all are used, try from all activities
            for (const activity of allActivities) {
                const placeKey = `${activity.title}|${activity.location}`.toLowerCase();
                if (!usedPlaces.has(placeKey)) {
                    usedPlaces.add(placeKey);
                    return activity;
                }
            }
            
            // Last resort: use fallback but mark it
            const fallbackKey = `${fallback.title}|${fallback.location}`.toLowerCase();
            if (!usedPlaces.has(fallbackKey)) {
                usedPlaces.add(fallbackKey);
            }
            return fallback;
        };

        return Array.from({ length: numDays }).map((_, index) => {
            const dayNumber = index + 1;
            const isFirstDay = dayNumber === 1;
            const isLastDay = dayNumber === numDays;
            const date = baseDate
                ? new Date(baseDate.getTime() + index * 86400000).toISOString().split('T')[0]
                : `Day ${dayNumber}`;

            const activities = [];

            // Day 1: Start with airport/station pickup
            if (isFirstDay) {
                activities.push({
                    time: '09:00 AM',
                    title: `Pickup from ${transportPoint}`,
                    type: 'transport',
                    location: transportPoint,
                    description: `Meet and greet at ${transportPoint}. Transfer to hotel.`,
                    duration: '1 hour',
                    cost: '₹500'
                });
            }

            // Hotel pickup for all days (except day 1 which already has airport pickup)
            if (!isFirstDay) {
                activities.push({
                    time: '09:00 AM',
                    title: 'Hotel Pickup',
                    type: 'transport',
                    location: 'Hotel',
                    description: 'Pickup from hotel for day\'s activities.',
                    duration: '15 minutes',
                    cost: 'Included'
                });
            }

            // Get activities ensuring no repetition and minimum 4 per day
            const morning = getNextUnusedActivity(
                template.slots.morning,
                {
                    title: `${destination} heritage walk`,
                    location: destination,
                    description: `Explore historic landmarks of ${destination}.`,
                    type: 'sightseeing',
                    cost: '₹900',
                    duration: '3 hours'
                }
            );

            const midMorning = getNextUnusedActivity(
                template.slots.morning?.slice(1) || [],
                {
                    title: `${destination} cultural site`,
                    location: destination,
                    description: `Visit a significant cultural attraction.`,
                    type: 'sightseeing',
                    cost: '₹600',
                    duration: '2 hours'
                }
            );

            const afternoon = getNextUnusedActivity(
                template.slots.afternoon,
                {
                    title: 'Local cuisine experience',
                    location: 'City centre',
                    description: 'Enjoy authentic regional dishes.',
                    type: 'dining',
                    cost: '₹700',
                    duration: '2 hours'
                }
            );

            const lateAfternoon = getNextUnusedActivity(
                template.slots.afternoon?.slice(1) || [],
                {
                    title: 'Market exploration',
                    location: 'Local market',
                    description: 'Shop for souvenirs and local crafts.',
                    type: 'shopping',
                    cost: '₹500',
                    duration: '1.5 hours'
                }
            );

            const evening = getNextUnusedActivity(
                template.slots.evening,
                {
                    title: 'Evening cultural experience',
                    location: 'City centre',
                    description: 'Enjoy local performances and nightlife.',
                    type: 'entertainment',
                    cost: '₹600',
                    duration: '2 hours'
                }
            );

            // Add activities with proper timing
            if (morning) {
                activities.push({
                    time: isFirstDay ? '10:30 AM' : '10:00 AM',
                    ...morning
                });
            }

            if (midMorning) {
                activities.push({
                    time: '12:00 PM',
                    ...midMorning
                });
            }

            if (afternoon) {
                activities.push({
                    time: '01:30 PM',
                    ...afternoon
                });
            }

            if (lateAfternoon) {
                activities.push({
                    time: '04:00 PM',
                    ...lateAfternoon
                });
            }

            if (evening) {
                activities.push({
                    time: '07:00 PM',
                    ...evening
                });
            }

            // Last day: Add airport/station drop before hotel drop
            if (isLastDay) {
                activities.push({
                    time: '08:00 PM',
                    title: `Drop at ${transportPoint}`,
                    type: 'transport',
                    location: transportPoint,
                    description: `Transfer to ${transportPoint} for departure.`,
                    duration: '1 hour',
                    cost: '₹500'
                });
            } else {
                // Hotel drop for all days except last
                activities.push({
                    time: '09:00 PM',
                    title: 'Hotel Drop',
                    type: 'transport',
                    location: 'Hotel',
                    description: 'Return to hotel after day\'s activities.',
                    duration: '15 minutes',
                    cost: 'Included'
                });
            }

            const alternatives = (template.slots.alternatives || []).slice(0, 3).map((alt) => ({
                ...alt,
                description: alt.description || `Optional plan around ${template.city}`
            }));

            return {
                day: dayNumber,
                date,
                city: template.city,
                theme: customizations.theme || (tripDetails.preferences || template.highlights[0] || 'Exploration'),
                dailyBudget: template.dailyBudget,
                highlights: template.highlights,
                activities,
                alternatives
            };
        });
    }

    buildMockTransportation(destination = 'Destination') {
        return {
            flights: [
                {
                    airline: 'GoAir',
                    from: 'Your City',
                    to: destination,
                    price: '₹5,500',
                    notes: 'Book 3 weeks in advance for best fares.'
                }
            ],
            trains: [
                {
                    train: 'Express 12345',
                    class: 'AC 3 Tier',
                    price: '₹1,800',
                    notes: 'Recommended for budget-friendly travel.'
                }
            ]
        };
    }

    buildMockAccommodation(destination = 'Destination') {
        return {
            budget: [
                {
                    name: `${destination} Budget Inn`,
                    pricePerNight: '₹1,200',
                    amenities: ['Wi-Fi', 'Breakfast', 'Central location']
                }
            ],
            midRange: [
                {
                    name: `${destination} Comfort Suites`,
                    pricePerNight: '₹2,800',
                    amenities: ['Pool', 'Restaurant', 'Airport pickup']
                }
            ],
            luxury: [
                {
                    name: `${destination} Palace Retreat`,
                    pricePerNight: '₹6,500',
                    amenities: ['Spa', 'Fine dining', 'City views']
                }
            ]
        };
    }
}

module.exports = new AIService();

