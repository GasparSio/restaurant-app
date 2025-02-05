import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";


const mapContainerStyle = {
  width: "100%",
  height: "100%",
};
const center = { lat: 40.4363713, lng: -3.6842974 }; // Madrid

interface Restaurant {
  id: string;
  name: string;
  address: string;
  image: string;
  lat: number;
  lng: number;
}

const Restaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://d5g0n9mm-5001.uks1.devtunnels.ms/api/restaurants")
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
    });
  }, []);

  const handleRestaurant = (restaurant: Restaurant) => {
    navigate("/restaurantdetail", { state: { restaurant } });
  };
  
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white">
      <div className="flex w-[80%] h-[80%] gap-6">
        {/* Maps */}
        <div className="flex-1 h-full rounded-lg overflow-hidden shadow-lg bg-gray-200">
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={13} center={center}>
              {restaurants.map((restaurant) => (
                <Marker
                  key={restaurant.id}
                  position={{ lat: Number(restaurant.lat), lng: Number(restaurant.lng) }}
                  title={restaurant.name}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>

        {/* Restaurants List */}
        <div className="flex-1 h-full overflow-y-auto bg-white p-4 shadow-lg rounded-lg">
          {restaurants.map((restaurant) => (
            <div
              onClick={() => handleRestaurant(restaurant)}
              key={restaurant.id}
              className="flex items-center gap-4 p-4 border-b cursor-pointer hover:bg-gray-100"
            >
              <img src={restaurant.image} alt={restaurant.name} className="w-20 h-20 rounded-lg object-cover" />
              <div>
                <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                <p className="text-sm text-gray-600">{restaurant.address}</p>
                <p className="text-blue-500">★★★★★ (8 comentarios)</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;