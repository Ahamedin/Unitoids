import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import freelancersData from "../datas/freelancers.json"; // ✅ ADD THIS

export default function Flproductcard() {
  const { categoryName } = useParams();
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchFreelancers = async () => {
    try {
      const decodedCategory = decodeURIComponent(categoryName).toLowerCase();

      // ✅ 1. Existing backend (KEEP THIS)
      const res = await fetch(
        `http://localhost:5000/api/freelancers/category/${encodeURIComponent(categoryName)}`
      );
      const dbData = await res.json();

      // ✅ 2. Dummy JSON (ADD THIS ONLY)
      const jsonData = freelancersData;

      // ✅ 3. Filter JSON data
const normalize = (str) =>
  str.toLowerCase().replace(/\s+/g, "");

const filteredJson = jsonData.filter((f) => {
  const sub = normalize(f.subcategory || "");
  const skills = (f.skills || []).map(normalize);
  const cat = normalize(decodedCategory);

  return (
    sub.includes(cat) ||
    cat.includes(sub) ||
    skills.some((skill) => skill.includes(cat))
  );
});
console.log("Clicked category:", decodedCategory);
console.log("Sample JSON:", jsonData[0]);
console.log("Filtered JSON:", filteredJson);

      // ✅ 4. Merge both
      const finalData = [
        ...(Array.isArray(dbData) ? dbData : []),
        ...filteredJson,
      ];

      setFreelancers(finalData);
      setLoading(false);

    } catch (error) {
      console.error("Error:", error);
      setFreelancers([]);
      setLoading(false);
    }
  };

  fetchFreelancers();
}, [categoryName]);

  return (
    <div className="min-h-screen relative px-6 py-16">

      {/* 🔥 GRID */}
      <div className="grid-background"></div>

      {/* 🔥 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/90 -z-10"></div>

      {/* 🔥 TITLE */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">
          {categoryName} Freelancers
        </h1>
        <p className="text-gray-400 mt-2">
          Explore top professionals in this category
        </p>
      </div>

      {/* 🔥 CONTENT */}
      <div className="max-w-6xl mx-auto">

        {loading ? (
          <p className="text-center text-gray-400">
            Loading freelancers...
          </p>
        ) : freelancers.length === 0 ? (
          <p className="text-center text-gray-500">
            No freelancers found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

            {freelancers.map((freelancer) => (
              <div
                key={freelancer._id || freelancer.id}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 
                           hover:scale-105 hover:shadow-2xl transition duration-300 flex flex-col justify-between"
              >
                {/* 🔝 TOP */}
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {freelancer.name}
                  </h2>

                  <p className="text-gray-400 text-sm">
                    {freelancer.category}
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    📍 {freelancer.location?.city || freelancer.city} - 
{freelancer.location?.pincode || freelancer.pincode || "N/A"}
                  </p>
                </div>

                {/* 🔻 BOTTOM */}
                <div className="mt-6 flex items-center justify-between">

                  <p className="text-lg font-bold text-primary text-white">
                    ₹{freelancer.pricing?.amount || freelancer.price}
                  </p>

                  <Link to={`/freelancer/${freelancer._id || freelancer.id}`}>
                    <Button size="sm" className="text-white">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}