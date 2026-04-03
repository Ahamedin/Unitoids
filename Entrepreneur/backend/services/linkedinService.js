import axios from "axios";

export const fetchLinkedinPeople = async (city) => {
  try {
    const response = await axios.get(
      "https://linkedin-data-api.p.rapidapi.com/search-people",
      {
        params: {
          keywords: "freelancer",
          location: city,
          limit: 5,
        },
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "linkedin-data-api.p.rapidapi.com",
        },
      }
    );

    const items = response.data?.data?.items || [];

    return items.map((p, index) => ({
      _id: `linkedin-${index}`,
      name: p.fullName,
      category: p.headline,
      city: p.location,
      price: "Negotiable",
      profileURL: p.profileURL,
      profilePicture: p.profilePicture,
      external: true,
    }));
  } catch (error) {
    console.error("LinkedIn API error:", error.message);
    return [];
  }
};