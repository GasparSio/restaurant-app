import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { mapStyles } from "../../public/assets/map_styles";
import { toast, ToastContainer } from "react-toastify";
import { useFetch } from "../hooks/useFetch";

//Map styles
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

//Set the center of the map in Madrid
const center = { lat: 40.4363713, lng: -3.6842974 };

interface Comment {
  rating: number;
}

interface Restaurant {
  id: string;
  name: string;
  address: string;
  image: string;
  lat: number;
  lng: number;
  comments?: Comment[];
}

const Restaurants: React.FC = () => {
  const navigate = useNavigate();

  const url = `${import.meta.env.VITE_URL_FETCH_RESTAURANTS}`;
  //Uso del custom hook useFetch
  const response = useFetch(url);
  console.log(response);
  const { data: restaurants, loading, error } = response as { data: Restaurant[] | null, loading: boolean, error: string };
  
  if (error) {
    toast.error(`Error fetching restaurants: ${response.error}`, {
      autoClose: 2000,
    });
  }
  

  // Handle restaurant click to navigate to detail page
  const handleRestaurant = (restaurant: Restaurant) => {
    navigate("/restaurantdetail", { state: { restaurant } });
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white relative">
      <ToastContainer />

      {/* Spinner Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900"></div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row w-[80%] h-auto lg:h-[80%] gap-6 mt-[100px] self-start">
        {/* Map section */}
        <div className="w-full lg:w-3/5 h-[300px] lg:h-full rounded-lg overflow-hidden shadow-lg bg-gray-200 md:order-1">
          <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          >
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={15}
              center={center}
              options={{
                fullscreenControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                styles: mapStyles,
              }}
            >
              {restaurants?.map((restaurant) => (
                <Marker
                  key={restaurant.id}
                  position={{
                    lat: Number(restaurant.lat),
                    lng: Number(restaurant.lng),
                  }}
                  title={restaurant.name}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>

        {/* Restaurant List */}
        <div className="w-full lg:w-2/5 h-auto overflow-y-auto bg-white p-4 shadow-lg rounded-lg relative md:order-2">
          {restaurants?.map((restaurant) => {
            const averageRating =
              restaurant.comments && restaurant.comments.length > 0
                ? restaurant.comments.reduce(
                    (sum, comment) => sum + comment.rating,
                    0
                  ) / restaurant.comments.length
                : 0;

            return (
              // Handle restaurant click to navigate to detail page
              <div
                onClick={() => handleRestaurant(restaurant)}
                key={restaurant.id}
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100"
              >
                <img
                  src={`https://restaurant-api-ld1w.onrender.com/${restaurant.image}`}
                  alt={restaurant.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex flex-col justify-center flex-1">
                  <span className="text-lg font-semibold text-left">
                    {restaurant.name}
                  </span>
                  <span className="text-sm text-gray-600 text-left">
                    {restaurant.address}
                  </span>

                  {/* Dinamic stars */}
                  <span className="text-blue-500 flex items-center gap-1 text-left mt-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={
                          i < Math.round(averageRating)
                            ? solidStar
                            : regularStar
                        }
                        className="text-blue-500"
                      />
                    ))}
                    <span className="text-sm ml-2 text-gray-600 text-center">
                      ({restaurant.comments?.length ?? 0} comentarios)
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
