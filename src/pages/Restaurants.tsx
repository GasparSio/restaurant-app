import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { mapStyles } from "../assets/map_styles";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};
const center = { lat: 40.4363713, lng: -3.6842974 }; // Set the center of the map to Madrid

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
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      fetch("https://d5g0n9mm-5001.uks1.devtunnels.ms/api/restaurants")
        .then((response) => response.json())
        .then((data) => {
          setRestaurants(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching restaurants:", error);
          setLoading(false);
        });
    }, 1000);
  }, []);

  const handleRestaurant = (restaurant: Restaurant) => {
    navigate("/restaurantdetail", { state: { restaurant } });
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white relative">
      {/* Spinner Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900"></div>
        </div>
      )}

      <div className="flex w-[80%] h-[80%] gap-6">
        {/* Maps */}
        <div className="flex-1 h-full rounded-lg overflow-hidden shadow-lg bg-gray-200">
          <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
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
                  position={{ lat: Number(restaurant.lat), lng: Number(restaurant.lng) }}
                  title={restaurant.name}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>

        {/* Restaurants List */}
        <div className="flex-1 h-full overflow-y-auto bg-white p-4 shadow-lg rounded-lg relative">
          {restaurants.map((restaurant) => {
            // Calculate average rating
            //reduce es una función que toma una lista y la reduce a un solo valor.
            //(sum, comment) => sum + comment.rating es una función que suma las calificaciones de todos los comentarios.
            //0 es el valor inicial de sum.
            const averageRating =
              restaurant.comments && restaurant.comments.length > 0
                ? restaurant.comments.reduce((sum, comment) => sum + comment.rating, 0) /
                  restaurant.comments.length
                : 0;

            return (
              <div
                onClick={() => handleRestaurant(restaurant)}
                key={restaurant.id}
                className="flex items-center gap-4 p-4 border-b cursor-pointer hover:bg-gray-100"
              >
                <img 
                  src={`https://d5g0n9mm-5001.uks1.devtunnels.ms/${restaurant.image}`} 
                  alt={restaurant.name} 
                  className="w-20 h-20 rounded-lg object-cover" 
                />
                <div
                  className="flex flex-col items-center justify-center flex-1">
                  <span className="text-lg font-semibold text-center">{restaurant.name}</span>
                  <span className="text-sm text-gray-600 text-center">{restaurant.address}</span>
                  
                  {/* Dinamic Stars */}
                  {/* Crea un array de 5 elementos.
                  .map((_, i) => ...): Itera sobre cada elemento del array.
                  (_, i): Ignora el primer argumento (valor del elemento) y usa el índice i.
                  <FontAwesomeIcon ... />: Renderiza un componente FontAwesomeIcon para cada iteración.
                  key={i}: Asigna una clave única basada en el índice i.
                  icon={i < Math.round(averageRating) ? solidStar : regularStar}: Determina el icono a mostrar */}
                  <span className="text-blue-500 flex items-center gap-1 text-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={i < Math.round(averageRating) ? solidStar : regularStar}
                        className="text-yellow-500"
                      />
                    ))}
                    <span className="ml-2 text-gray-600 text-center">({restaurant.comments?.length ?? 0} comentarios)</span>
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
