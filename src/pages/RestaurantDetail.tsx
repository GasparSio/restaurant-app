import React, { useState } from "react";
import { useLocation } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
// import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";


interface Comment {
  id: string;
  user: User;
  text: string;
}
interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  favorites: string[];
}

const RestaurantDetail: React.FC = () => {
  const location = useLocation();
  const restaurant = location.state?.restaurant;
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState(restaurant?.comments || []);

  if (!restaurant) {
    return <p className="text-center mt-10 text-red-500">No se encontró información del restaurante.</p>;
  }

  // Function to POST comment
  const handleSubmit = async () => {
    if (!comment.trim()) return;
  
    const token = localStorage.getItem("token");
    console.log('token antes del POST al comment', token);
  
    const newComment = {
      text: comment,
      rating,
      user: {
        username: "Usuario", // Aquí debes agregar el nombre de usuario del que está enviando el comentario
        id: "123", // Agrega también el ID del usuario (esto puede obtenerse desde el token o desde el contexto del usuario)
      },
    };
  
    console.log('restaurant.id', restaurant.id);
  
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
  
      if (response.ok) {
        // Asumiendo que el comentario que recibimos de la API incluye todos los detalles que necesitamos (como el usuario)
        setComments((prevComments: Comment[]) => [...prevComments, newComment]); // Agregamos el nuevo comentario
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

        {/* Imagen del restaurante con el nombre y dirección */}
        <div className="w-[90%] h-80 my-6 relative mx-auto">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50 rounded-lg">
            <h1 className="text-4xl font-bold">{restaurant.name}</h1>
            <p className="text-lg">{restaurant.address}</p>
          </div>
        </div>
    
        {/* Contenido principal */}
        <div className="flex w-[80%] gap-6 mx-auto">
          {/* Sección Izquierda: Descripción y Comentarios */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
            {/* Descripción */}
            <p className="text-gray-700 text-lg leading-relaxed">{restaurant.description}</p>
    
            {/* Comentarios */}
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">Comentarios</h2>
              <div className="space-y-4 overflow-y-auto">
                {comments.length > 0 ? (
                  comments.map((comment: Comment, index: number) => (
                    <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg shadow-sm"
                    >
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
    
          {/* Sección Derecha: Agregar Comentario */}
          <div className="border border-black p-6 rounded-lg shadow-lg max-h-[500px]">
            {/* Input del comentario */}
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
