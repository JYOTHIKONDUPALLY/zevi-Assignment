const faker = require('@faker-js/faker');
const { createApi } = require('unsplash-js');

// Create an instance of the Unsplash API
const unsplash = createApi({
  accessKey: 'YOUR_UNSPLASH_ACCESS_KEY', // Replace with your Unsplash access key
});

// Function to fetch a random image URL from Unsplash
const getRandomImageUrl = async () => {
  try {
    const response = await unsplash.photos.getRandom({});
    
    // Log the entire response to identify any issues
    console.log('Unsplash API Response:', response);

    const imageUrl = response.data.urls.small; // Use response.data instead of response.response
    return imageUrl;
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error.message);
    return null;
  }
};

// Function to generate random product data with images
const generateRandomProduct = async () => {
  const imageUrl = await getRandomImageUrl();

  return {
    name: faker.commerce.productName(),
    image: imageUrl,
    size: faker.random.arrayElement(['S', 'M', 'L', 'XL']),
    color: faker.commerce.color(),
    category: faker.random.arrayElement(['Clothing', 'Electronics', 'Accessories']),
    rating: faker.datatype.number({ min: 1, max: 5, precision: 0.1 }), // Use faker.datatype.number
  };
};

// Function to generate data
const generateData = async () => {
  const randomProducts = Array.from({ length: 50 }, await generateRandomProduct);
  console.log(JSON.stringify(randomProducts, null, 2));
};

// Call the function to generate data
generateData();
