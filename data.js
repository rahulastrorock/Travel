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
    title: "Dubai & Abu Dhabi Explorer",
    destination: "Dubai",
    description: "Experience the perfect blend of modern luxury and traditional Arabian culture",
    duration: 7,
    budget: {
      min: 150000,
      max: 250000,
      currency: "INR"
    },
    productType: "tour",
    photos: [
      "uploads/dubai.jpg"
    ],
    history: "Dubai's transformation from a small fishing village to a global metropolis...",
    culture: "Experience the rich Emirati culture and traditional hospitality...",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Desert Safari",
        description: "Welcome to Dubai! Transfer to hotel and evening desert safari",
        activities: ["Hotel Check-in", "Desert Safari", "BBQ Dinner", "Belly Dancing Show"]
      },
      {
        day: 2,
        title: "Modern Dubai Tour",
        description: "Explore the magnificent modern attractions of Dubai",
        activities: ["Burj Khalifa", "Dubai Mall", "Dubai Fountain Show", "Dubai Marina"]
      }
    ],
    recommendations: {
      lodging: [
        {
          name: "Burj Al Arab",
          description: "Luxury 7-star hotel",
          priceRange: "High"
        },
        {
          name: "Atlantis The Palm",
          description: "Luxury beach resort",
          priceRange: "High"
        }
      ],
      dining: [
        {
          name: "Al Hadheerah",
          cuisine: "Arabic",
          priceRange: "High"
        },
        {
          name: "Pierchic",
          cuisine: "Seafood",
          priceRange: "High"
        }
      ]
    },
    tags: ["luxury", "desert", "shopping", "architecture", "adventure"],
    averageRating: 4.7,
    totalReviews: 1250,
    isPublic: true
  },
  {
    title: "Japan Cherry Blossom Tour",
    destination: "Japan",
    description: "Experience Japan during the magical cherry blossom season",
    duration: 10,
    budget: {
      min: 200000,
      max: 300000,
      currency: "INR"
    },
    productType: "tour",
    photos: [
      "uploads/japan.jpg"
    ],
    history: "Japan's rich cultural heritage spanning thousands of years...",
    culture: "Experience the unique blend of traditional and modern Japanese culture...",
    itinerary: [
      {
        day: 1,
        title: "Tokyo Arrival",
        description: "Welcome to Tokyo! Transfer to hotel and evening city orientation",
        activities: ["Hotel Check-in", "Shibuya Crossing", "Welcome Dinner"]
      },
      {
        day: 2,
        title: "Tokyo Exploration",
        description: "Discover Tokyo's highlights",
        activities: ["Senso-ji Temple", "Ueno Park", "Akihabara", "Robot Restaurant"]
      }
    ],
    recommendations: {
      lodging: [
        {
          name: "Park Hyatt Tokyo",
          description: "Luxury hotel in Shinjuku",
          priceRange: "High"
        }
      ],
      dining: [
        {
          name: "Sukiyabashi Jiro",
          cuisine: "Sushi",
          priceRange: "High"
        }
      ]
    },
    tags: ["culture", "spring", "nature", "food", "history"],
    averageRating: 4.9,
    totalReviews: 850
  },
  {
    title: "Maldives Paradise Escape",
    destination: "Maldives",
    description: "Luxury beach vacation in paradise",
    duration: 5,
    budget: {
      min: 180000,
      max: 350000,
      currency: "INR"
    },
    productType: "activity",
    photos: ["uploads/maldives.jpg"],
    itinerary: [
      {
        day: 1,
        title: "Paradise Welcome",
        description: "Arrival and resort transfer by seaplane",
        activities: ["Seaplane Transfer", "Resort Check-in", "Sunset Cruise"]
      }
    ],
    tags: ["beach", "luxury", "romantic", "water_sports", "relaxation"],
    averageRating: 4.8,
    totalReviews: 620
  },
  {
    title: "Egypt Pyramids Explorer",
    destination: "Egypt",
    description: "Ancient wonders and Nile cruise",
    duration: 8,
    budget: {
      min: 120000,
      max: 200000,
      currency: "INR"
    },
    productType: "tour",
    photos: ["uploads/egypt.jpg"],
    itinerary: [
      {
        day: 1,
        title: "Cairo Arrival",
        description: "Welcome to the land of Pharaohs",
        activities: ["Airport Transfer", "Hotel Check-in", "Nile View Dinner"]
      }
    ],
    tags: ["history", "culture", "archaeology", "desert", "river_cruise"],
    averageRating: 4.6,
    totalReviews: 780
  },
  {
    title: "Swiss Alps Adventure",
    destination: "Switzerland",
    description: "Mountain adventures and scenic beauty",
    duration: 6,
    budget: {
      min: 250000,
      max: 400000,
      currency: "INR"
    },
    productType: "activity",
    photos: ["uploads/swiss.jpg"],
    tags: ["mountains", "adventure", "scenic", "winter_sports", "luxury"],
    averageRating: 4.7,
    totalReviews: 540
  },
  {
    title: "Thailand Beach & Culture",
    destination: "Thailand",
    description: "Best of Thai beaches and culture",
    duration: 7,
    budget: {
      min: 80000,
      max: 150000,
      currency: "INR"
    },
    productType: "tour",
    photos: ["uploads/thailand.jpg"],
    tags: ["beach", "culture", "food", "temples", "nightlife"],
    averageRating: 4.5,
    totalReviews: 920
  },
  {
    title: "New Zealand Adventure",
    destination: "New Zealand",
    description: "Ultimate adventure in nature's playground",
    duration: 12,
    budget: {
      min: 300000,
      max: 450000,
      currency: "INR"
    },
    productType: "activity",
    photos: ["uploads/newZealand.jpg"],
    tags: ["adventure", "nature", "lord_of_the_rings", "hiking", "scenic"],
    averageRating: 4.9,
    totalReviews: 480
  },
  {
    title: "Italian Romance",
    destination: "Italy",
    description: "Romance through Rome, Florence, and Venice",
    duration: 9,
    budget: {
      min: 200000,
      max: 350000,
      currency: "INR"
    },
    productType: "tour",
    photos: ["uploads/italy.jpg"],
    tags: ["romance", "culture", "food", "history", "art"],
    averageRating: 4.8,
    totalReviews: 890
  },
  {
    title: "Amazon Rainforest Explorer",
    destination: "Brazil",
    description: "Adventure in the world's largest rainforest",
    duration: 6,
    budget: {
      min: 180000,
      max: 280000,
      currency: "INR"
    },
    productType: "activity",
    photos: ["uploads/amazonRainforest.jpg"],
    tags: ["nature", "adventure", "wildlife", "eco_tourism", "indigenous"],
    averageRating: 4.6,
    totalReviews: 320
  },
  {
    title: "Iceland Northern Lights",
    destination: "Iceland",
    description: "Chase the Aurora Borealis",
    duration: 5,
    budget: {
      min: 220000,
      max: 350000,
      currency: "INR"
    },
    productType: "tour",
    photos: ["uploads/northernLights.jpg"],
    tags: ["northern_lights", "nature", "winter", "hot_springs", "adventure"],
    averageRating: 4.7,
    totalReviews: 410
  }
];

module.exports = data;