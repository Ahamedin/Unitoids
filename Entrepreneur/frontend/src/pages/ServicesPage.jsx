import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// shadcn
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NonTechnicalServices() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationDenied, setLocationDenied] = useState(false);
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const fetchFreelancers = async (userCity, userPincode) => {
    try {
      setLoading(true);
      let url = `http://localhost:5000/api/freelancers/location?city=${encodeURIComponent(userCity)}`;
      if (userPincode) url += `&pincode=${encodeURIComponent(userPincode)}`;

      const res = await fetch(url);
      const data = await res.json();
      setFreelancers(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const fetchCityAndPincode = async (lat, lng) => {
    const API_KEY = "YOUR_GOOGLE_API_KEY";
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?lat=${lat}&lng=${lng}&key=${API_KEY}`
      );
      const data = await res.json();

      if (data.results.length > 0) {
        const comps = data.results[0].address_components;
        const cityComp = comps.find(c => c.types.includes("locality"));
        const pinComp = comps.find(c => c.types.includes("postal_code"));

        return {
          city: cityComp?.long_name || "",
          pincode: pinComp?.long_name || "",
        };
      }
    } catch (err) {
      console.error(err);
    }
    return { city: "", pincode: "" };
  };

  useEffect(() => {
    const detectLocation = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const loc = await fetchCityAndPincode(
              pos.coords.latitude,
              pos.coords.longitude
            );

            if (loc.city) {
              setCity(loc.city);
              setPincode(loc.pincode);
              fetchFreelancers(loc.city, loc.pincode);
            } else {
              setLocationDenied(true);
              setLoading(false);
            }
          },
          () => {
            setLocationDenied(true);
            setLoading(false);
          }
        );
      } else {
        setLocationDenied(true);
        setLoading(false);
      }
    };

    detectLocation();
  }, []);

  const handleSearch = () => {
    if (city) fetchFreelancers(city, pincode);
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-foreground">

      {/* 🔥 GRID */}
      <div className="grid-background"></div>

      {/* 🔥 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/90 -z-10"></div>

      {/* ================= HERO ================= */}
      <section className="relative z-10 text-center py-20 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          Find{" "}
          <span className="bg-gradient-to-r from-gray-200 via-gray-400 to-gray-500 bg-clip-text text-transparent">
            Freelancers
          </span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-xl mx-auto">
          Discover skilled professionals near you for any task.
        </p>
      </section>

      {/* ================= SEARCH ================= */}
      {locationDenied && (
        <div className="relative z-10 max-w-xl mx-auto px-6 mb-10">
          <Card className="bg-white/5 border border-white/10 backdrop-blur">
            <CardContent className="pt-6 space-y-4">
              <Input
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
              <Input
                placeholder="Pincode (Optional)"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
              <Button onClick={handleSearch} className="w-full text-white">
                Find Freelancers
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ================= CARDS ================= */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 pb-16">

        {loading ? (
          <p className="text-center text-gray-400 col-span-3">
            Loading freelancers...
          </p>
        ) : freelancers.length > 0 ? (
          freelancers.map((f) => (
            <Link key={f._id} to={`/freelancer/${f._id}`}>
              <Card className="bg-white/5 border border-white/10 backdrop-blur hover:border-white/30 transition hover:-translate-y-1">
                <CardContent className="p-6">

                  <h2 className="text-xl font-semibold text-white">
                    {f.name}
                  </h2>

                  <p className="text-gray-400 text-sm mt-1">
                    {f.category}
                  </p>

                  {/* ❌ LOCATION REMOVED */}

                  {f.rating && (
                    <p className="text-yellow-400 text-sm mt-2">
                      ⭐ {f.rating}
                    </p>
                  )}

                  <p className="text-lg font-bold mt-3 text-white">
                    ₹{f.price}
                  </p>

                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-3">
            No freelancers found nearby.
          </p>
        )}
      </div>
    </div>
  );
}