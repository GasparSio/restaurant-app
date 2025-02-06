import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar  as solidStar} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { jwtDecode } from "jwt-decode";


interface Comment {
  id: string;
  user: User;
  text: string;
  rating: number;
}
interface User {
  id?: string;
  email?: string;
  username?: string;
  password?: string;
}

const RestaurantDetail: React.FC = () => {
  const location = useLocation();
  const restaurant = location.state?.restaurant;
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState(restaurant?.comments || []);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<{ username: string }>(token);
        console.log('decodedToken', decodedToken);
        setUser({
          username: decodedToken.username, 
        });
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, []);
  console.log('user', user);
  
  if (!restaurant) {
    return <p className="text-center mt-10 text-red-500">No se encontró información del restaurante.</p>;
  }

  // Function to handle the click on the stars
  const handleStarClick = (index: number) => {
    setRating(index + 1); // Las estrellas comienzan en 1 (no en 0)
  };

  // Function to POST comment
  const handleSubmit = async () => {
    if (!comment.trim()) return;
  
    const token = localStorage.getItem("token");
    console.log('token antes del POST al comment', token);
  
    const newComment = {
      text: comment,
      rating,
      user: {
        username: user?.username,
        id: user?.id,
      },
    };
  
    try {
      const url = `https://d5g0n9mm-5001.uks1.devtunnels.ms/api/comments`;
      const response = await fetch(`${url}/${restaurant.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newComment),
      });
  
      console.log('response', response);
  
      //Handle the response
      if (response.ok) {
        setComments((prevComments: Comment[]) => [...prevComments, newComment]); // Add the new comment to the list
        setComment(""); // Limpiamos el textarea
        setRating(5); // Resetemos las estrellas
      } else {
        console.error("Error al enviar el comentario");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-screen min-h-screen bg-white">
      <div className="w-full max-w-[1440px] mx-auto">

        {/* Image restaurant */}
        <div className="w-[90%] h-80 my-6 relative mx-auto">
          <img
            src={`https://d5g0n9mm-5001.uks1.devtunnels.ms/${restaurant.image}`} 
            alt={restaurant.name}
            className="w-full h-full object-cover rounded-lg shadow-lg opacity-80"
            />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white rounded-lg">
            <h1 className="text-4xl font-bold">{restaurant.name}</h1>
            <p className="text-lg">{restaurant.address}</p>
          </div>
        </div>
    
        {/* Main Content */}
        <div className="flex w-[80%] gap-6 mx-auto">
          {/* Description and list of comments */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
            {/* Descripción */}
            <p className="text-gray-700 text-lg leading-relaxed">{restaurant.description}</p>
    
            {/* Comments */}
            <div className="mt-6">
              <div className="space-y-4 overflow-y-auto">
                {comments.length > 0 ? (
                  comments.map((comment: Comment, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg shadow-sm"
                    >
                      {/* Estrellas según el rating del comentario */}
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={i < comment.rating ? solidStar : regularStar}
                            className="text-yellow-500 text-lg"
                          />
                        ))}
                      </div>
                      <div className="text-black-600 font-semibold text-lg w-1/3">
                        {comment.user.username}
                      </div>
                      <div className="text-gray-600 w-2/3">{comment.text}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No hay comentarios aún.</p>
                )}
              </div>
            </div>
          </div>
    
          {/* Add comment */}
          <div className="border border-black p-6 rounded-lg shadow-lg max-h-[500px]">
            
            {/* Interactive stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={i < rating ? solidStar : regularStar}
                  className="text-yellow-500 cursor-pointer text-2xl"
                  onClick={() => handleStarClick(i)}
                />
              ))}
            </div>

            {/* Comment input */}
            <textarea
              className="w-full p-3 border border-black rounded-lg text-black placeholder-black focus:outline-none"
              rows={3}
              placeholder="Escribe tu comentario aquí..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              />
    
            {/* Botón de enviar */}
            <button
              onClick={handleSubmit}
              className="mt-4 w-full border border-black text-black py-2 rounded-lg hover:bg-gray-200 transition cursor-pointer"
              >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default RestaurantDetail;
