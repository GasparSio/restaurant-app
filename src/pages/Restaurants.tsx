import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { mapStyles } from "../assets/map_styles";
import { toast, ToastContainer } from "react-toastify";

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
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string>("Nombre usuario");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      try {
        const decodedToken = jwtDecode<{ username: string }>(token);
        setUserName(decodedToken.username);
      } catch (error) {
        toast.error(`Error al decodificar el token: ${error}`, {
          autoClose: 2000,
        });
      }
    }

    // Fetch restaurants from API
    setTimeout(() => {
      fetch("http://localhost:5001/api/restaurants")
        .then((response) => response.json())
        .then((data) => {
          setRestaurants(data);
          setLoading(false);
        })
        .catch((error) => {
          toast.error(`Error fetching restaurants: ${error}`, {
            autoClose: 2000,
          });
          setLoading(false);
        });
    }, 1000);
  }, []);

  // Handle restaurant click to navigate to detail page
  const handleRestaurant = (restaurant: Restaurant) => {
    navigate("/restaurantdetail", { state: { restaurant } });
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white relative">
      <ToastContainer />
      {/* User Menu */}
      <div className="absolute top-4 right-4">
        <button
          className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span>{userName}</span>
          <FontAwesomeIcon icon={isMenuOpen ? faChevronUp : faChevronDown} />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-blue-600 text-white rounded-[15px_0px_15px_15px] shadow-lg p-2 z-[999]">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-blue-500 rounded"
              onClick={() => navigate("/newrestaurant")}
            >
              Añadir Restaurante
            </button>
            <button
              className="block w-full text-left px-4 py-2 mt-2 hover:bg-blue-500 rounded"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              Log Out
            </button>
          </div>
        )}
      </div>

      {/* Spinner Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900"></div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col md:flex-row w-[80%] h-auto md:h-[80%] gap-6">
        {/* Map section */}
        <div className="w-full md:w-3/5 h-[300px] md:h-full rounded-lg overflow-hidden shadow-lg bg-gray-200 md:order-1">
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
              {restaurants.map((restaurant) => (
                <Marker
                  key={restaurant.id}
                  position={{
                    lat: Number(restaurant.lat),
                    lng: Number(restaurant.lng),
                  }}
                  title={restaurant.name}
                  icon={{
                    url: "../assets/Ellipse 1.png",
                    scale: 30,
                  }}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>

        {/* Restaurant List */}
        <div className="w-full md:w-2/5 h-auto overflow-y-auto bg-white p-4 shadow-lg rounded-lg relative md:order-2">
          {restaurants.map((restaurant) => {
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
                className="flex items-center gap-4 p-4 border-b cursor-pointer hover:bg-gray-100"
              >
                <img
                  src={`http://localhost:5001/${restaurant.image}`}
                  alt={restaurant.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex flex-col items-center justify-center flex-1">
                  <span className="text-lg font-semibold text-center">
                    {restaurant.name}
                  </span>
                  <span className="text-sm text-gray-600 text-center">
                    {restaurant.address}
                  </span>

                  {/* Dinamic stars */}
                  <span className="text-blue-500 flex items-center gap-1 text-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={
                          i < Math.round(averageRating)
                            ? solidStar
                            : regularStar
                        }
                        className="text-yellow-500"
                      />
                    ))}
                    <span className="ml-2 text-gray-600 text-center">
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
