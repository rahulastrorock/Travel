const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

let data = {}

data.users = [
  {
    username: "admin",
    email: "admin@travel.com",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin",
    favoriteGuides: [],
    groups: []
  },
  {
    username: "john_doe",
    email: "john@example.com",
    password: bcrypt.hashSync("password123", 10),
    role: "visitor",
    favoriteGuides: [],
    groups: []
  },
  {
    username: "sarah_smith",
    email: "sarah@example.com",
    password: bcrypt.hashSync("password123", 10),
    role: "visitor",
    favoriteGuides: [],
    groups: []
  },
  {
    username: "mike_wilson",
    email: "mike@example.com",
    password: bcrypt.hashSync("password123", 10),
    role: "visitor",
    favoriteGuides: [],
    groups: []
  }
];

// Sample Travel Guides Data
data.travelGuides = [
  {
    "title": "Dubai & Abu Dhabi Explorer",
    "destination": "Dubai",
    "description": "Experience the perfect blend of modern luxury and traditional Arabian culture",
    "duration": 7,
    "budget": {
      "min": 150000,
      "max": 250000,
      "currency": "INR"
    },
    "productType": "tour",
    "photos": [
      "uploads/dubai.jpg",
      "uploads/dubai2.jpg",
      "uploads/dubai3.jpg",
      "uploads/dubai4.jpg"
    ],
    "history": "Dubai's transformation from a small fishing village to a global metropolis has been extraordinary. Once known for pearl diving, it has now become one of the most luxurious destinations in the world, boasting cutting-edge architecture and grand shopping malls.",
    "culture": "Dubai offers a unique blend of traditional Emirati culture and modern cosmopolitan influences. Visitors can experience the culture through its iconic mosques, souks, and world-class restaurants, alongside its modern skyscrapers and vibrant shopping scenes.",
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival & Desert Safari",
        "description": "Welcome to Dubai! Transfer to your hotel, check-in, and relax. In the afternoon, embark on a thrilling desert safari, complete with dune bashing, camel riding, and a traditional BBQ dinner under the stars.",
        "activities": [
          "Hotel Check-in",
          "Desert Safari",
          "BBQ Dinner",
          "Belly Dancing Show",
          "Stargazing"
        ]
      },
      {
        "day": 2,
        "title": "Modern Dubai Tour",
        "description": "Discover the modern wonders of Dubai with a visit to the Burj Khalifa, the world’s tallest building. Explore the Dubai Mall, with its world-class shops, an indoor ice rink, and the Dubai Fountain Show.",
        "activities": [
          "Burj Khalifa Observation Deck",
          "Dubai Mall",
          "Dubai Fountain Show",
          "Dubai Aquarium & Underwater Zoo",
          "Dubai Marina Walk"
        ]
      },
      {
        "day": 3,
        "title": "Dubai Marina & Palm Jumeirah",
        "description": "Start the day with a scenic cruise along the Dubai Marina, followed by a visit to the luxurious Palm Jumeirah. Take a monorail ride and enjoy panoramic views of the Dubai coastline and the Atlantis Resort.",
        "activities": [
          "Dubai Marina Cruise",
          "Palm Jumeirah Monorail",
          "Atlantis The Palm Resort Visit",
          "Aquaventure Waterpark"
        ]
      },
      {
        "day": 4,
        "title": "Cultural Exploration & Dubai Museum",
        "description": "Immerse yourself in the cultural side of Dubai with a visit to the Dubai Museum and the Al Fahidi Historical District. Explore the Dubai Creek area and take a traditional abra ride.",
        "activities": [
          "Dubai Museum",
          "Al Fahidi Historical District",
          "Dubai Creek Abra Ride",
          "Visit the Gold Souk & Spice Souk"
        ]
      },
      {
        "day": 5,
        "title": "Day Trip to Abu Dhabi",
        "description": "Embark on a day trip to Abu Dhabi, the capital of the UAE. Visit the magnificent Sheikh Zayed Grand Mosque, explore the cultural district, and enjoy a scenic drive along the Corniche.",
        "activities": [
          "Sheikh Zayed Grand Mosque",
          "Emirates Palace",
          "Qasr Al Watan Palace",
          "Abu Dhabi Corniche",
          "Yas Island & Ferrari World"
        ]
      },
      {
        "day": 6,
        "title": "Shopping & Leisure in Dubai",
        "description": "Spend the day exploring the famous shopping destinations in Dubai. Visit the Mall of the Emirates, enjoy some time at the Dubai Miracle Garden, and relax with a leisure evening at the Dubai Opera.",
        "activities": [
          "Mall of the Emirates Shopping",
          "Dubai Miracle Garden",
          "Dubai Opera Tour",
          "Global Village (optional)"
        ]
      },
      {
        "day": 7,
        "title": "Beach Day & Departure",
        "description": "Relax on the stunning Jumeirah Beach before you prepare for your departure. Enjoy a final swim, or take a stroll along the iconic beach walk, before heading back to the airport.",
        "activities": [
          "Jumeirah Beach Relaxation",
          "Beachfront Lunch",
          "Shopping for Souvenirs",
          "Departure Transfer to Airport"
        ]
      }
    ],
    "recommendations": {
      "lodging": [
        {
          "name": "Burj Al Arab",
          "description": "Luxury 7-star hotel with stunning views of the Arabian Gulf.",
          "priceRange": "High"
        },
        {
          "name": "Atlantis The Palm",
          "description": "Iconic luxury resort located on the Palm Jumeirah.",
          "priceRange": "High"
        }
      ],
      "dining": [
        {
          "name": "Al Hadheerah",
          "cuisine": "Arabic",
          "priceRange": "High"
        },
        {
          "name": "Pierchic",
          "cuisine": "Seafood",
          "priceRange": "High"
        }
      ]
    },
    "tags": ["luxury", "desert", "shopping", "architecture", "adventure"],
    "averageRating": 4.7,
    "totalReviews": 1250,
    "isPublic": true
  },
  {
    "title": "Japan Cherry Blossom Tour",
    "destination": "Japan",
    "description": "Experience Japan during the magical cherry blossom season",
    "duration": 10,
    "budget": {
      "min": 200000,
      "max": 300000,
      "currency": "INR"
    },
    "productType": "tour",
    "photos": [
      "uploads/japan.jpg"
    ],
    "history": "Japan's rich cultural heritage spans thousands of years, from ancient traditions of tea ceremonies and samurai culture to its rapid modernization after World War II. The cherry blossom season (Sakura) is one of Japan's most iconic symbols, celebrated across the country during spring.",
    "culture": "Japan offers a unique blend of traditional and modern culture, where ancient shrines and temples coexist with towering skyscrapers and cutting-edge technology. The cherry blossom season is a special time when Japanese people celebrate nature, beauty, and renewal.",
    "itinerary": [
      {
        "day": 1,
        "title": "Tokyo Arrival",
        "description": "Welcome to Tokyo! Transfer to hotel and evening city orientation. Stroll around the famous Shibuya Crossing and enjoy a welcome dinner.",
        "activities": [
          "Hotel Check-in",
          "Shibuya Crossing",
          "Welcome Dinner"
        ]
      },
      {
        "day": 2,
        "title": "Tokyo Exploration",
        "description": "Discover Tokyo's highlights, including the historic Senso-ji Temple, Ueno Park for cherry blossoms, and the electric district of Akihabara. End the day with a spectacular Robot Restaurant show.",
        "activities": [
          "Senso-ji Temple",
          "Ueno Park Cherry Blossoms",
          "Akihabara (Electronics and Anime Shopping)",
          "Robot Restaurant Show"
        ]
      },
      {
        "day": 3,
        "title": "Tokyo's Modern Side",
        "description": "Explore Tokyo’s modern side, visiting landmarks like the Tokyo Skytree and Roppongi Hills. Enjoy panoramic views of the city, followed by shopping in upscale districts like Ginza.",
        "activities": [
          "Tokyo Skytree Observation Deck",
          "Roppongi Hills Mori Tower",
          "Ginza Shopping District",
          "Visit Meiji Shrine"
        ]
      },
      {
        "day": 4,
        "title": "Day Trip to Nikko",
        "description": "Take a day trip to Nikko, a UNESCO World Heritage Site known for its beautiful temples, shrines, and natural beauty. Visit the sacred Toshogu Shrine and enjoy the picturesque surroundings.",
        "activities": [
          "Toshogu Shrine",
          "Kegon Falls",
          "Lake Chuzenji",
          "Explore Nikko National Park"
        ]
      },
      {
        "day": 5,
        "title": "Kyoto Arrival",
        "description": "Travel to Kyoto, the cultural capital of Japan. Explore the iconic Fushimi Inari Shrine and its thousands of red torii gates, followed by a traditional tea ceremony.",
        "activities": [
          "Hotel Check-in",
          "Fushimi Inari Shrine",
          "Traditional Tea Ceremony"
        ]
      },
      {
        "day": 6,
        "title": "Kyoto Exploration",
        "description": "Visit Kyoto's famous temples and gardens, including Kinkaku-ji (Golden Pavilion) and the serene Arashiyama Bamboo Grove. Experience the beauty of cherry blossoms at Maruyama Park.",
        "activities": [
          "Kinkaku-ji (Golden Pavilion)",
          "Arashiyama Bamboo Grove",
          "Maruyama Park Cherry Blossoms",
          "Gion District (Geisha Culture)"
        ]
      },
      {
        "day": 7,
        "title": "Nara Day Trip",
        "description": "Take a day trip to Nara, Japan's first permanent capital. Explore Todai-ji Temple, home to the Great Buddha, and wander around Nara Park, where friendly deer roam freely.",
        "activities": [
          "Todai-ji Temple",
          "Nara Park (Deer Feeding)",
          "Kasuga Taisha Shrine",
          "Nara National Museum"
        ]
      },
      {
        "day": 8,
        "title": "Hiroshima & Miyajima Island",
        "description": "Travel to Hiroshima and visit the Peace Memorial Park and Museum, which commemorate the tragic events of World War II. Then, take a ferry to Miyajima Island to see the iconic floating torii gate of Itsukushima Shrine.",
        "activities": [
          "Hiroshima Peace Memorial Park",
          "Hiroshima Peace Memorial Museum",
          "Miyajima Island Ferry",
          "Itsukushima Shrine Floating Torii Gate"
        ]
      },
      {
        "day": 9,
        "title": "Osaka Exploration",
        "description": "Visit Osaka, famous for its vibrant street food scene. Explore Osaka Castle, the Umeda Sky Building, and the bustling Dotonbori district.",
        "activities": [
          "Osaka Castle",
          "Umeda Sky Building Observation Deck",
          "Dotonbori Street (Street Food)",
          "Shinsaibashi Shopping Street"
        ]
      },
      {
        "day": 10,
        "title": "Departure",
        "description": "On your last day in Japan, spend some time shopping for souvenirs and enjoying a final stroll in Osaka's vibrant streets before transferring to the airport for your departure.",
        "activities": [
          "Final Souvenir Shopping",
          "Visit Osaka Aquarium Kaiyukan",
          "Departure Transfer to Airport"
        ]
      }
    ],
    "recommendations": {
      "lodging": [
        {
          "name": "Park Hyatt Tokyo",
          "description": "A luxury hotel in Shinjuku offering exceptional service and stunning views of the city.",
          "priceRange": "High"
        },
        {
          "name": "The Ritz-Carlton, Kyoto",
          "description": "A beautiful hotel located along the Kamo River, perfect for enjoying Kyoto’s natural beauty.",
          "priceRange": "High"
        }
      ],
      "dining": [
        {
          "name": "Sukiyabashi Jiro",
          "cuisine": "Sushi",
          "priceRange": "High"
        },
        {
          "name": "Kikunoi",
          "cuisine": "Kaiseki (Traditional Japanese Cuisine)",
          "priceRange": "High"
        }
      ]
    },
    "tags": ["culture", "spring", "nature", "food", "history", "cherry blossom", "adventure"],
    "averageRating": 4.9,
    "totalReviews": 850,
    "isPublic": true
  },
  {
    "title": "Maldives Paradise Escape",
    "destination": "Maldives",
    "description": "Luxury beach vacation in paradise",
    "duration": 5,
    "budget": {
      "min": 180000,
      "max": 350000,
      "currency": "INR"
    },
    "productType": "activity",
    "photos": ["uploads/maldives.jpg"],
    "history": "The Maldives is an island nation in the Indian Ocean, known for its overwater bungalows, crystal-clear waters, and abundant marine life. A popular destination for honeymooners and luxury seekers, the Maldives offers an unparalleled tropical experience.",
    "culture": "Maldivian culture is deeply influenced by Indian, Arab, and African traditions. The island's distinct beauty is complemented by the hospitality of the Maldivian people, making it one of the world's most sought-after travel destinations.",
    "itinerary": [
      {
        "day": 1,
        "title": "Paradise Welcome",
        "description": "Arrive at the Maldives and take a scenic seaplane transfer to your luxurious resort. Enjoy a relaxing afternoon with a sunset cruise to kick off your dream beach vacation.",
        "activities": [
          "Seaplane Transfer to Resort",
          "Resort Check-in",
          "Sunset Cruise"
        ]
      },
      {
        "day": 2,
        "title": "Relax and Rejuvenate",
        "description": "Start your day with a spa treatment at the resort. Spend the afternoon lounging on the pristine beaches or indulge in water activities such as snorkeling and kayaking.",
        "activities": [
          "Morning Spa Treatment",
          "Beach Relaxation",
          "Snorkeling",
          "Kayaking"
        ]
      },
      {
        "day": 3,
        "title": "Explore the Ocean",
        "description": "Go for a guided diving excursion to explore the vibrant coral reefs and marine life. Afterward, enjoy a beachside dinner under the stars.",
        "activities": [
          "Guided Scuba Diving Excursion",
          "Coral Reef Exploration",
          "Beachside Dinner"
        ]
      },
      {
        "day": 4,
        "title": "Private Island Escape",
        "description": "Take a private boat trip to a secluded island, where you can relax on the untouched sands and enjoy a beach picnic. In the evening, enjoy a private candlelit dinner on the beach.",
        "activities": [
          "Private Island Boat Trip",
          "Beach Picnic on Secluded Island",
          "Private Candlelit Dinner"
        ]
      },
      {
        "day": 5,
        "title": "Departure",
        "description": "Enjoy a leisurely morning and check out from the resort. Afterward, take a seaplane transfer back to the airport for your return journey.",
        "activities": [
          "Leisure Morning",
          "Check-out from Resort",
          "Seaplane Transfer to Airport"
        ]
      }
    ],
    "recommendations": {
      "lodging": [
        {
          "name": "Anantara Veli Maldives Resort",
          "description": "A luxury resort offering overwater bungalows and beachfront villas, renowned for its stunning views and private beach experiences.",
          "priceRange": "High"
        },
        {
          "name": "Conrad Maldives Rangali Island",
          "description": "This upscale resort is known for its underwater dining experience and luxurious overwater villas, offering unparalleled relaxation and privacy.",
          "priceRange": "High"
        }
      ],
      "dining": [
        {
          "name": "Ithaa Undersea Restaurant",
          "cuisine": "International",
          "priceRange": "High"
        },
        {
          "name": "Mandhoo Spa Restaurant",
          "cuisine": "Healthy, Organic",
          "priceRange": "High"
        }
      ]
    },
    "tags": ["beach", "luxury", "romantic", "water_sports", "relaxation", "honeymoon", "seaplane", "coral reefs"],
    "averageRating": 4.8,
    "totalReviews": 620,
    "isPublic": true
  },
  {
    "title": "Egypt Pyramids Explorer",
    "destination": "Egypt",
    "description": "Ancient wonders and Nile cruise",
    "duration": 8,
    "budget": {
      "min": 120000,
      "max": 200000,
      "currency": "INR"
    },
    "productType": "tour",
    "photos": ["uploads/egypt.jpg"],
    "history": "Egypt, known as the cradle of civilization, is famous for its ancient monuments, including the pyramids, the Sphinx, and the majestic Nile River. The journey through Egypt's history is like stepping into a time machine that takes you back thousands of years.",
    "culture": "Egyptian culture has been influenced by over 5,000 years of history, from the time of the Pharaohs to modern-day Egypt. The culture is rich in traditions, including ancient festivals, food, and music, blending ancient and modern elements.",
    "itinerary": [
      {
        "day": 1,
        "title": "Cairo Arrival",
        "description": "Welcome to Egypt, the land of Pharaohs. Arrive in Cairo, where you'll be transferred to your hotel with a stunning view of the Nile. Enjoy a delicious Nile-view dinner to start your journey.",
        "activities": [
          "Airport Transfer",
          "Hotel Check-in",
          "Nile View Dinner"
        ]
      },
      {
        "day": 2,
        "title": "Pyramids of Giza and Sphinx",
        "description": "Visit the iconic Pyramids of Giza, one of the Seven Wonders of the Ancient World. Marvel at the Sphinx, the gigantic stone statue, and learn about the fascinating history of ancient Egypt.",
        "activities": [
          "Visit Pyramids of Giza",
          "Explore the Sphinx",
          "Camel Ride near the Pyramids"
        ]
      },
      {
        "day": 3,
        "title": "Egyptian Museum & Old Cairo",
        "description": "Explore the treasures of the Egyptian Museum, home to some of the most famous artifacts from ancient Egypt, including the treasures of Tutankhamun. Visit Old Cairo and the Hanging Church.",
        "activities": [
          "Visit Egyptian Museum",
          "Explore Old Cairo",
          "Visit the Hanging Church"
        ]
      },
      {
        "day": 4,
        "title": "Aswan - The Nile Cruise",
        "description": "Fly to Aswan and board your luxurious Nile cruise ship. Explore Aswan's historic sites, including the Philae Temple, and enjoy an evening aboard the cruise.",
        "activities": [
          "Fly to Aswan",
          "Check-in to Nile Cruise",
          "Visit Philae Temple"
        ]
      },
      {
        "day": 5,
        "title": "Kom Ombo & Edfu Temples",
        "description": "While cruising along the Nile, stop at the unique Kom Ombo Temple, dedicated to the crocodile god Sobek, and the Edfu Temple, one of the best-preserved ancient temples in Egypt.",
        "activities": [
          "Visit Kom Ombo Temple",
          "Explore Edfu Temple",
          "Nile Cruise Relaxation"
        ]
      },
      {
        "day": 6,
        "title": "Luxor - Valley of the Kings",
        "description": "Arrive in Luxor and visit the Valley of the Kings, the burial site of many Pharaohs, including Tutankhamun. Explore the impressive Karnak Temple and Luxor Temple.",
        "activities": [
          "Visit Valley of the Kings",
          "Explore Karnak Temple",
          "Visit Luxor Temple"
        ]
      },
      {
        "day": 7,
        "title": "Temple of Hatshepsut & Colossi of Memnon",
        "description": "Visit the magnificent Temple of Hatshepsut, dedicated to Egypt’s only female Pharaoh, and see the Colossi of Memnon, the towering statues guarding the entrance to the Theban Necropolis.",
        "activities": [
          "Visit Temple of Hatshepsut",
          "Explore Colossi of Memnon",
          "Nile Cruise Relaxation"
        ]
      },
      {
        "day": 8,
        "title": "Cairo - Departure",
        "description": "Return to Cairo for a free day to explore or shop before your departure. Transfer to Cairo International Airport for your flight home.",
        "activities": [
          "Leisure Day in Cairo",
          "Transfer to Cairo Airport"
        ]
      }
    ],
    "recommendations": {
      "lodging": [
        {
          "name": "Four Seasons Hotel Cairo at Nile Plaza",
          "description": "A luxurious hotel overlooking the Nile, offering world-class amenities and breathtaking views of Cairo.",
          "priceRange": "High"
        },
        {
          "name": "Mena House Hotel",
          "description": "Located near the Pyramids, this hotel offers incredible views of the Giza Pyramids, providing a perfect base for exploring ancient Egypt.",
          "priceRange": "High"
        }
      ],
      "dining": [
        {
          "name": "Abou El Sid",
          "cuisine": "Egyptian",
          "priceRange": "Medium"
        },
        {
          "name": "Sequoia",
          "cuisine": "Mediterranean",
          "priceRange": "High"
        }
      ]
    },
    "tags": ["history", "culture", "archaeology", "desert", "river_cruise", "pyramids", "Nile", "pharaohs"],
    "averageRating": 4.6,
    "totalReviews": 780,
    "isPublic": true
  },
  {
    "title": "Swiss Alps Adventure",
    "destination": "Switzerland",
    "description": "Mountain adventures and scenic beauty",
    "duration": 6,
    "budget": {
      "min": 250000,
      "max": 400000,
      "currency": "INR"
    },
    "productType": "activity",
    "photos": ["uploads/swiss.jpg"],
    "history": "Switzerland’s history is deeply intertwined with its mountain culture. Known for its majestic Alps, Switzerland has long been a haven for explorers, mountaineers, and adventurers. The Alps have shaped Swiss culture and tourism for centuries, making it a top destination for nature lovers.",
    "culture": "Swiss culture is a unique blend of German, French, and Italian influences, reflected in the country's food, architecture, and traditions. From skiing in the winter to hiking in the summer, Swiss culture celebrates outdoor activities and breathtaking landscapes.",
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Zurich",
        "description": "Arrive in Zurich, Switzerland’s largest city, and explore its beautiful old town. Enjoy a relaxing evening with Swiss cuisine and a stroll along the scenic Lake Zurich.",
        "activities": [
          "Airport Transfer",
          "Hotel Check-in",
          "Stroll along Lake Zurich",
          "Dinner at a Swiss restaurant"
        ]
      },
      {
        "day": 2,
        "title": "Zurich City Tour & Swiss Museum of Transport",
        "description": "Explore Zurich’s famous landmarks, including the Old Town, and visit the Swiss Museum of Transport to learn about Switzerland's connection to adventure and transport innovation.",
        "activities": [
          "Zurich Old Town Tour",
          "Visit the Swiss Museum of Transport",
          "Explore Bahnhofstrasse for shopping"
        ]
      },
      {
        "day": 3,
        "title": "Train to Zermatt",
        "description": "Travel by the scenic Glacier Express train to Zermatt, a town nestled beneath the iconic Matterhorn Mountain. Enjoy breathtaking views along the way.",
        "activities": [
          "Scenic Train Journey via Glacier Express",
          "Hotel Check-in in Zermatt",
          "Relax and Explore Zermatt"
        ]
      },
      {
        "day": 4,
        "title": "Matterhorn Glacier Paradise",
        "description": "Take a cable car ride to the Matterhorn Glacier Paradise for panoramic views of the Alps. Enjoy skiing, snowboarding, or simply soaking in the spectacular mountain views.",
        "activities": [
          "Cable Car to Matterhorn Glacier Paradise",
          "Skiing or Snowboarding",
          "Scenic Viewpoints"
        ]
      },
      {
        "day": 5,
        "title": "Mountain Hiking & Gornergrat Railway",
        "description": "Experience a thrilling hike through the Swiss Alps, then ride the Gornergrat Railway for one of the most scenic mountain journeys in Europe. Explore nearby glaciers and valleys.",
        "activities": [
          "Mountain Hiking",
          "Gornergrat Railway Ride",
          "Visit Glaciers and Alpine Valleys"
        ]
      },
      {
        "day": 6,
        "title": "Return to Zurich & Departure",
        "description": "Take the scenic train back to Zurich for a final day of shopping and leisure. Explore Zurich’s famous landmarks or visit the Swiss Alps Museum before your flight home.",
        "activities": [
          "Return Scenic Train to Zurich",
          "Leisure day in Zurich",
          "Transfer to Zurich Airport"
        ]
      }
    ],
    "recommendations": {
      "lodging": [
        {
          "name": "Badrutt's Palace Hotel",
          "description": "A luxury hotel offering stunning views of the Alps, located in St. Moritz, famous for its ski resorts.",
          "priceRange": "High"
        },
        {
          "name": "The Chedi Andermatt",
          "description": "A luxurious alpine retreat offering a blend of modern and traditional Swiss architecture.",
          "priceRange": "High"
        }
      ],
      "dining": [
        {
          "name": "Restaurant Sonnenberg",
          "cuisine": "Swiss",
          "priceRange": "Medium"
        },
        {
          "name": "La Vue des Alpes",
          "cuisine": "Swiss/French",
          "priceRange": "High"
        }
      ]
    },
    "tags": ["mountains", "adventure", "scenic", "winter_sports", "luxury", "hiking", "skiing", "alpine"],
    "averageRating": 4.7,
    "totalReviews": 540,
    "isPublic": true
  },
  {
    "title": "Thailand Beach & Culture",
    "destination": "Thailand",
    "description": "Best of Thai beaches and culture",
    "duration": 7,
    "budget": {
      "min": 80000,
      "max": 150000,
      "currency": "INR"
    },
    "productType": "tour",
    "photos": ["uploads/thailand.jpg"],
    "history": "Thailand has a rich cultural history, deeply influenced by Buddhism, its royal family, and its centuries-old traditions. Known for its ancient temples, palaces, and long coastline, Thailand offers an exciting mix of cultural heritage and tropical beauty. Its beaches, islands, and vibrant nightlife make it one of the most sought-after travel destinations.",
    "culture": "Thailand’s culture is centered around Buddhism, family values, and hospitality. Thai food is globally famous for its balance of sweet, sour, salty, and spicy flavors. The country's festivals, traditional dances, and art are deeply tied to its spiritual practices and the natural environment, making it a beautiful fusion of tradition and modernity.",
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Bangkok",
        "description": "Welcome to Bangkok, Thailand’s bustling capital! Transfer to your hotel and explore the vibrant markets and street food stalls.",
        "activities": [
          "Airport Transfer",
          "Hotel Check-in",
          "Explore Khao San Road",
          "Evening Street Food Tour"
        ]
      },
      {
        "day": 2,
        "title": "Bangkok City Tour",
        "description": "Discover Bangkok's major cultural landmarks, including the Grand Palace, Wat Pho, and Wat Arun.",
        "activities": [
          "Visit the Grand Palace",
          "Explore Wat Pho (Temple of the Reclining Buddha)",
          "Take a boat ride along the Chao Phraya River",
          "Dinner at a Rooftop Restaurant"
        ]
      },
      {
        "day": 3,
        "title": "Ayutthaya Day Trip",
        "description": "Take a day trip to the ancient city of Ayutthaya, a UNESCO World Heritage Site, to explore the historic temples and ruins.",
        "activities": [
          "Visit Ayutthaya Historical Park",
          "Explore Wat Mahathat and Wat Phra Si Sanphet",
          "Lunch by the River"
        ]
      },
      {
        "day": 4,
        "title": "Flight to Phuket",
        "description": "Fly to the beautiful island of Phuket and enjoy a relaxing day at the beach. Visit Patong Beach for some fun and relaxation.",
        "activities": [
          "Flight to Phuket",
          "Hotel Check-in",
          "Relax at Patong Beach",
          "Sunset View at Promthep Cape"
        ]
      },
      {
        "day": 5,
        "title": "Phi Phi Islands Tour",
        "description": "Take a boat tour to the stunning Phi Phi Islands. Explore Maya Bay, go snorkeling, and enjoy the clear turquoise waters.",
        "activities": [
          "Boat Tour to Phi Phi Islands",
          "Snorkeling and Swimming",
          "Visit Maya Bay",
          "Beachside Lunch"
        ]
      },
      {
        "day": 6,
        "title": "Phuket Beach Day & Nightlife",
        "description": "Enjoy a relaxing day at the beach followed by a night out in Phuket’s famous nightlife scene.",
        "activities": [
          "Relax at Kata or Karon Beach",
          "Explore Phuket Old Town",
          "Nightlife at Bangla Road"
        ]
      },
      {
        "day": 7,
        "title": "Return to Bangkok & Departure",
        "description": "Fly back to Bangkok for some last-minute shopping and exploration before your departure.",
        "activities": [
          "Return Flight to Bangkok",
          "Visit Chatuchak Market",
          "Departure Transfer to Suvarnabhumi Airport"
        ]
      }
    ],
    "recommendations": {
      "lodging": [
        {
          "name": "Mandarin Oriental Bangkok",
          "description": "A luxurious riverside hotel offering exceptional service and stunning views of the Chao Phraya River.",
          "priceRange": "High"
        },
        {
          "name": "The Shore at Katathani",
          "description": "An exclusive beach resort in Phuket offering private villas and stunning sea views.",
          "priceRange": "High"
        }
      ],
      "dining": [
        {
          "name": "Sirocco",
          "cuisine": "Mediterranean/Thai Fusion",
          "priceRange": "High"
        },
        {
          "name": "Raan Jay Fai",
          "cuisine": "Thai Street Food",
          "priceRange": "Medium"
        }
      ]
    },
    "tags": ["beach", "culture", "food", "temples", "nightlife"],
    "averageRating": 4.5,
    "totalReviews": 920,
    "isPublic": true
  },
  {
    "title": "New Zealand Adventure",
    "destination": "New Zealand",
    "description": "Ultimate adventure in nature's playground",
    "duration": 12,
    "budget": {
      "min": 300000,
      "max": 450000,
      "currency": "INR"
    },
    "productType": "activity",
    "photos": ["uploads/newZealand.jpg"],
    "history": "New Zealand is known for its rich Maori heritage, stunning landscapes, and diverse wildlife. The country is famous for being the backdrop of the 'Lord of the Rings' films and for offering some of the world's most incredible outdoor adventures, from mountain treks to glacier hikes.",
    "culture": "New Zealand's culture is heavily influenced by its indigenous Maori population and its British colonial history. The blend of these two cultures creates a unique atmosphere, evident in New Zealand’s music, art, food, and festivals. The country’s outdoor lifestyle is central to the local culture, with a strong focus on environmental preservation and respect for nature.",
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Auckland",
        "description": "Arrive in Auckland, New Zealand’s largest city, known for its vibrant culture and stunning harbors.",
        "activities": [
          "Airport Transfer",
          "Hotel Check-in",
          "Sky Tower Visit",
          "Explore Auckland Harbour"
        ]
      },
      {
        "day": 2,
        "title": "Auckland City Exploration",
        "description": "Discover Auckland’s highlights, including the Auckland War Memorial Museum and the Auckland Domain park.",
        "activities": [
          "Visit Auckland War Memorial Museum",
          "Explore Auckland Domain",
          "Shopping at Queen Street",
          "Dinner at Viaduct Harbour"
        ]
      },
      {
        "day": 3,
        "title": "Drive to Rotorua",
        "description": "Travel to Rotorua, known for its geothermal activity and Maori culture.",
        "activities": [
          "Drive to Rotorua",
          "Visit Te Puia Geothermal Reserve",
          "Maori Cultural Performance and Hangi Dinner"
        ]
      },
      {
        "day": 4,
        "title": "Rotorua Adventure",
        "description": "Explore Rotorua’s geysers, hot springs, and lakes, and enjoy a thrilling experience at the Skyline Rotorua Luge.",
        "activities": [
          "Visit Wai-O-Tapu Thermal Wonderland",
          "Skyline Rotorua Luge",
          "Relax at Polynesian Spa"
        ]
      },
      {
        "day": 5,
        "title": "Drive to Taupo",
        "description": "Travel to Taupo and explore the beautiful lake and the nearby Huka Falls.",
        "activities": [
          "Drive to Taupo",
          "Visit Huka Falls",
          "Relax at Lake Taupo"
        ]
      },
      {
        "day": 6,
        "title": "Tongariro National Park",
        "description": "Hike the famous Tongariro Alpine Crossing, one of the most spectacular day hikes in the world.",
        "activities": [
          "Tongariro Alpine Crossing",
          "Explore Mount Ngauruhoe",
          "Return to Taupo"
        ]
      },
      {
        "day": 7,
        "title": "Drive to Wellington",
        "description": "Travel to New Zealand’s capital, Wellington, known for its vibrant arts scene.",
        "activities": [
          "Drive to Wellington",
          "Visit Te Papa Museum",
          "Explore Wellington’s Waterfront"
        ]
      },
      {
        "day": 8,
        "title": "Wellington Adventure",
        "description": "Enjoy a cable car ride, visit the Wellington Botanic Garden, and explore the city’s cafes and restaurants.",
        "activities": [
          "Wellington Cable Car Ride",
          "Visit Wellington Botanic Garden",
          "Explore Cuba Street"
        ]
      },
      {
        "day": 9,
        "title": "Ferry to South Island & Drive to Nelson",
        "description": "Take a ferry to the South Island and drive to Nelson, a city known for its art and food.",
        "activities": [
          "Ferry from Wellington to Picton",
          "Drive to Nelson",
          "Explore Nelson’s Art Scene"
        ]
      },
      {
        "day": 10,
        "title": "Abel Tasman National Park",
        "description": "Spend a day in Abel Tasman National Park, enjoying the beaches and hiking trails.",
        "activities": [
          "Hike in Abel Tasman National Park",
          "Kayak in the Crystal Clear Waters",
          "Relax on the Beach"
        ]
      },
      {
        "day": 11,
        "title": "Drive to Queenstown",
        "description": "Head to Queenstown, the adventure capital of New Zealand, offering bungee jumping, jet boating, and scenic views.",
        "activities": [
          "Drive to Queenstown",
          "Visit Lake Wakatipu",
          "Explore Queenstown’s Adventure Activities"
        ]
      },
      {
        "day": 12,
        "title": "Departure from Queenstown",
        "description": "Relax in Queenstown before your flight home.",
        "activities": [
          "Relax at Lake Wakatipu",
          "Visit the Skyline Gondola",
          "Airport Transfer"
        ]
      }
    ],
    "recommendations": {
      "lodging": [
        {
          "name": "The Langham Auckland",
          "description": "A luxury hotel with stunning views of Auckland Harbour and premium amenities.",
          "priceRange": "High"
        },
        {
          "name": "QT Wellington",
          "description": "A stylish hotel with modern amenities and a central location in Wellington.",
          "priceRange": "Medium"
        }
      ],
      "dining": [
        {
          "name": "The Grove Auckland",
          "cuisine": "Contemporary New Zealand",
          "priceRange": "High"
        },
        {
          "name": "Rasa Rasa Wellington",
          "cuisine": "Southeast Asian",
          "priceRange": "Medium"
        }
      ]
    },
    "tags": ["adventure", "nature", "lord_of_the_rings", "hiking", "scenic"],
    "averageRating": 4.9,
    "totalReviews": 480,
    "isPublic": true
  },
  {
    "title": "Italian Romance",
    "destination": "Italy",
    "description": "Romance through Rome, Florence, and Venice",
    "duration": 5,
    "budget": {
      "min": 200000,
      "max": 350000,
      "currency": "INR"
    },
    "productType": "tour",
    "photos": ["uploads/italy.jpg"],
    "history": "Italy is the birthplace of Western culture, art, and cuisine, and is home to an unparalleled mix of ancient ruins, Renaissance art, and vibrant cities. From the Roman Colosseum to the canals of Venice, Italy offers a unique and timeless experience for travelers.",
    "culture": "Italy's culture is rich in art, history, and culinary traditions. From the Renaissance in Florence to the history of the Roman Empire in Rome, Italy offers a captivating blend of the ancient and modern. Italian cuisine is famous worldwide for its regional specialties, from pizza and pasta to world-renowned wines.",
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Rome",
        "description": "Arrive in Rome, the Eternal City, known for its ancient ruins and vibrant culture.",
        "activities": [
          "Airport Transfer",
          "Hotel Check-in",
          "Evening Stroll at Trevi Fountain",
          "Welcome Dinner in Trastevere"
        ]
      },
      {
        "day": 2,
        "title": "Explore Ancient Rome",
        "description": "Visit the iconic landmarks of Rome, including the Colosseum, Roman Forum, and Pantheon.",
        "activities": [
          "Colosseum Tour",
          "Visit Roman Forum",
          "Explore Pantheon",
          "Piazza Navona and Spanish Steps"
        ]
      },
      {
        "day": 3,
        "title": "Travel to Florence",
        "description": "Take a train to Florence, the heart of the Renaissance.",
        "activities": [
          "Train to Florence",
          "Visit the Uffizi Gallery",
          "Explore Ponte Vecchio Bridge",
          "Evening Wine Tasting"
        ]
      },
      {
        "day": 4,
        "title": "Florence Exploration",
        "description": "Explore Florence's stunning architecture, including the Florence Cathedral and Michelangelo's David.",
        "activities": [
          "Visit Florence Cathedral (Duomo)",
          "Michelangelo's David at Galleria dell'Accademia",
          "Piazzale Michelangelo for a panoramic view",
          "Dinner in Piazza della Signoria"
        ]
      },
      {
        "day": 5,
        "title": "Travel to Venice & Departure",
        "description": "Travel to Venice and enjoy a romantic gondola ride through the canals before departure.",
        "activities": [
          "Train to Venice",
          "Gondola Ride through the Canals",
          "St. Mark's Square and Basilica",
          "Departure"
        ]
      }
    ],
    "recommendations": {
      "lodging": [
        {
          "name": "Hotel Artemide",
          "description": "Luxury hotel in Rome with elegant rooms and excellent service.",
          "priceRange": "High"
        },
        {
          "name": "Hotel Savoy Florence",
          "description": "Elegant 5-star hotel in the heart of Florence, offering stunning views.",
          "priceRange": "High"
        }
      ],
      "dining": [
        {
          "name": "La Pergola Rome",
          "cuisine": "Italian Fine Dining",
          "priceRange": "High"
        },
        {
          "name": "Osteria All'Antico Vinaio Florence",
          "cuisine": "Traditional Tuscan",
          "priceRange": "Medium"
        }
      ]
    },
    "tags": ["romance", "culture", "food", "history", "art"],
    "averageRating": 4.8,
    "totalReviews": 890,
    "isPublic": true
  },
  {
    "title": "Amazon Rainforest Explorer",
    "destination": "Brazil",
    "description": "Adventure in the world's largest rainforest",
    "duration": 5,
    "budget": {
      "min": 180000,
      "max": 280000,
      "currency": "INR"
    },
    "productType": "activity",
    "photos": ["uploads/amazonRainforest.jpg"],
    "history": "The Amazon Rainforest, covering much of northern Brazil, is the world's largest tropical rainforest. It is home to an incredibly diverse ecosystem, with millions of species of flora and fauna, many of which are not found anywhere else on Earth. The Amazon plays a crucial role in the global climate, and its preservation is vital for the future of our planet.",
    "culture": "The Amazon is home to various indigenous tribes, each with their unique customs, languages, and lifestyles. This region has been a source of mystery and fascination, offering unique opportunities to learn about the indigenous cultures and their relationship with the rainforest. The eco-tourism movement has allowed travelers to engage with the rainforest while preserving its delicate ecosystems.",
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Manaus & Transfer to Jungle Lodge",
        "description": "Arrive in Manaus and take a boat transfer to a jungle lodge deep within the rainforest.",
        "activities": ["Arrival in Manaus", "Boat Transfer to Lodge", "Jungle Introduction Walk", "Welcome Dinner"]
      },
      {
        "day": 2,
        "title": "Jungle Trekking & Wildlife Spotting",
        "description": "Embark on a guided jungle trek, spotting wildlife and learning about the flora and fauna.",
        "activities": ["Jungle Trekking", "Wildlife Spotting", "Visit to Indigenous Village", "Night Safari"]
      },
      {
        "day": 3,
        "title": "River Cruise & Fishing with Locals",
        "description": "Take a boat cruise along the Amazon River and learn traditional fishing techniques with the locals.",
        "activities": ["Amazon River Cruise", "Fishing with Locals", "Piranha Fishing", "Cultural Exchange with Local Tribe"]
      },
      {
        "day": 4,
        "title": "Canopy Walk & Bird Watching",
        "description": "Experience the rainforest from above with a canopy walk and enjoy birdwatching in the morning light.",
        "activities": ["Canopy Walk", "Bird Watching", "Lunch at Lodge", "Free Time for Relaxation"]
      },
      {
        "day": 5,
        "title": "Return to Manaus & Departure",
        "description": "Return to Manaus for your flight back home after an unforgettable rainforest adventure.",
        "activities": ["Boat Transfer Back to Manaus", "Departure from Manaus"]
      }
    ],
    "recommendations": {
      "lodging": [
        {
          "name": "Juma Lodge",
          "description": "Eco-friendly jungle lodge offering a comfortable stay in the heart of the rainforest.",
          "priceRange": "Medium"
        },
        {
          "name": "Anavilhanas Jungle Lodge",
          "description": "Luxury lodge situated on the banks of the Rio Negro, offering a unique immersion into the Amazon rainforest.",
          "priceRange": "High"
        }
      ],
      "dining": [
        {
          "name": "Local Amazon Cuisine",
          "cuisine": "Traditional Brazilian",
          "priceRange": "Medium"
        }
      ]
    },
    "tags": ["nature", "adventure", "wildlife", "eco_tourism", "indigenous"],
    "averageRating": 4.6,
    "totalReviews": 320,
    "isPublic": true
  },
  {
    "title": "Iceland Northern Lights",
    "destination": "Iceland",
    "description": "Chase the Aurora Borealis",
    "duration": 5,
    "budget": {
      "min": 220000,
      "max": 350000,
      "currency": "INR"
    },
    "productType": "tour",
    "photos": ["uploads/northernLights.jpg"],
    "history": "Iceland, known as the land of fire and ice, has a rich history shaped by volcanic activity, glaciers, and Viking settlers. The Northern Lights, or Aurora Borealis, are a natural light display primarily seen in high-latitude regions near the Arctic and Antarctic. The best time to view the Northern Lights in Iceland is from September to April, during the dark winter months when the skies are clear.",
    "culture": "Icelandic culture is deeply rooted in its Viking heritage. The country has a rich literary tradition, including the famous Sagas. Icelanders are known for their love of nature, and much of their culture revolves around their dramatic landscapes. Visitors can experience the warmth of Icelandic hospitality while exploring the stark contrasts of volcanoes, glaciers, and hot springs.",
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Reykjavik & Blue Lagoon",
        "description": "Arrive in Reykjavik and transfer to your accommodation. Relax at the famous Blue Lagoon geothermal spa.",
        "activities": ["Arrival in Reykjavik", "Transfer to Accommodation", "Visit to Blue Lagoon", "Dinner at Local Restaurant"]
      },
      {
        "day": 2,
        "title": "Golden Circle Tour",
        "description": "Explore Iceland’s iconic Golden Circle, including the Geysir geothermal area, Gullfoss waterfall, and Thingvellir National Park.",
        "activities": ["Thingvellir National Park", "Geysir Geothermal Area", "Gullfoss Waterfall", "Visit to Local Farm for Icelandic Cuisine"]
      },
      {
        "day": 3,
        "title": "South Coast & Black Sand Beaches",
        "description": "Discover Iceland's stunning south coast, including waterfalls, black sand beaches, and the famous Seljalandsfoss waterfall.",
        "activities": ["Visit to Seljalandsfoss Waterfall", "Skogafoss Waterfall", "Black Sand Beaches of Reynisfjara", "Return to Reykjavik"]
      },
      {
        "day": 4,
        "title": "Chase the Northern Lights",
        "description": "Head out on an unforgettable journey to catch a glimpse of the Northern Lights in the wilderness outside Reykjavik.",
        "activities": ["Northern Lights Viewing", "Photography Tips for Northern Lights", "Dinner in the Wilderness", "Stargazing"]
      },
      {
        "day": 5,
        "title": "Relaxation & Departure",
        "description": "Spend your final day at leisure before transferring to the airport for your flight back home.",
        "activities": ["Leisure Time in Reykjavik", "Visit to Local Cafes or Museums", "Transfer to Airport", "Departure"]
      }
    ],
    "recommendations": {
      "lodging": [
        {
          "name": "Hotel Borg",
          "description": "A historic 4-star hotel located in the heart of Reykjavik, offering luxurious amenities and a great view of the city.",
          "priceRange": "High"
        },
        {
          "name": "Fosshotel Glacier Lagoon",
          "description": "A contemporary hotel situated close to Vatnajökull Glacier, ideal for travelers looking for a relaxing getaway in nature.",
          "priceRange": "Medium"
        }
      ],
      "dining": [
        {
          "name": "Dill Restaurant",
          "cuisine": "Modern Icelandic",
          "priceRange": "High"
        },
        {
          "name": "Grillmarkadurinn",
          "cuisine": "Icelandic Grill",
          "priceRange": "Medium"
        }
      ]
    },
    "tags": ["northern_lights", "nature", "winter", "hot_springs", "adventure"],
    "averageRating": 4.7,
    "totalReviews": 410,
    "isPublic": true
  }
  
];

module.exports = data;