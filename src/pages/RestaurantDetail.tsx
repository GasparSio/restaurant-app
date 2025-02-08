import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faArrowLeft,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";

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
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<{ username: string }>(token);
        setUser({
          username: decodedToken.username,
        });
      } catch (error) {
        toast.error(`Error al decodificar el token: ${error}`, {
          autoClose: 2000,
        });
      }
    }
  }, []);

  if (!restaurant) {
    return (
      <p className="text-center mt-10 text-red-500">
        No se encontró información del restaurante.
      </p>
    );
  }

  // Function to handle the click on the stars
  const handleStarClick = (index: number) => {
    setRating(index + 1); // Las estrellas comienzan en 1 (no en 0)
  };

  // Function to handle the click on the stars inside the modal
  const handleStarClickInModal = (index: number) => {
    if (editingComment) {
      setEditingComment({
        ...editingComment,
        rating: index + 1, // Actualiza el valor de las estrellas, +1 porq inicia en 1 las estrellas
      });
    }
  };

  // Function to POST comment
  const handleSubmit = async () => {
    if (!comment.trim()) return;

    const newComment = {
      id: crypto.randomUUID(),
      text: comment,
      rating,
      user: {
        username: user?.username,
        id: user?.id,
      },
    };

    try {
      const url = `https://restaurant-api-ld1w.onrender.com/api/comments`;
      const response = await fetch(`${url}/${restaurant.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newComment),
      });

      //Handle the response
      if (response.ok) {
        setComments((prevComments: Comment[]) => [...prevComments, newComment]); // Add the new comment to the list
        setComment(""); // Clean the textarea
        setRating(5); // Resetemos las estrellas
        toast.success("Comentario enviado correctamente", {
          autoClose: 2000,
        });
      } else {
        toast.error("Error al enviar el comentario.", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(`"Error en la petición:", ${error}`, {
        autoClose: 2000,
      });
    }
  };

  // Function to handle editing a comment
  const handleEditClick = (comment: Comment) => {
    setEditingComment(comment);
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    if (!editingComment || !editingComment.text.trim()) return;

    try {
      const url = `https://restaurant-api-ld1w.onrender.com/api/comments/${restaurant.id}/edit/${editingComment.id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingComment),
      });

      if (response.ok) {
        setComments((prevComments: Comment[]) =>
          prevComments.map((comment) =>
            comment.id === editingComment.id ? editingComment : comment
          )
        );
        setShowModal(false); // Close modal after saving
        setEditingComment(null); // Reset the editing state
        toast.success("Comment updated succesfully", {
          autoClose: 2000,
        });
      } else {
        toast.error("Error on editing comment", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(`Error on the request to edit the comment", ${error}`, {
        autoClose: 2000,
      });
    }
  };

  // Function to handle deleting a comment
  const handleDeleteClick = async (commentId: string) => {
    try {
      const url = `https://restaurant-api-ld1w.onrender.com/api/comments/${restaurant.id}/delete/${commentId}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setComments((prevComments: Comment[]) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
        toast.success("Comentario eliminado correctamente", {
          autoClose: 2000,
        });
      } else {
        toast.error("Error al eliminar el comentario", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(`Error en la petición: ${error}`, {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center w-screen min-h-screen bg-white">
      <ToastContainer />

      {/* Go Back Button */}
      <div className="absolute top-0 left-0 m-6">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer w-[60px] h-[30px] border border-black rounded-[10px]"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>

      {/* Modal for editing comment */}
      {showModal && editingComment && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Editar Comentario</h2>
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={i < editingComment.rating ? solidStar : regularStar}
                  className="text-blue-500 cursor-pointer text-2xl"
                  onClick={() => handleStarClickInModal(i)}
                />
              ))}
            </div>
            <textarea
              className="w-full p-3 border border-black rounded-lg text-black placeholder-black focus:outline-none"
              rows={3}
              value={editingComment.text}
              onChange={(e) =>
                setEditingComment({ ...editingComment, text: e.target.value })
              }
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Guardar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-[1440px] mx-auto mt-[80px]">
        {/* Image restaurant */}
        <div className="w-[90%] h-80 my-6 relative mx-auto">
          <img
            src={`https://restaurant-api-ld1w.onrender.com/${restaurant.image}`}
            alt={restaurant.name}
            className="w-full h-full relative object-cover rounded-lg shadow-lg"
          />
          <div className="w-full h-full absolute top-0 left-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white rounded-lg">
            <h1 className="text-4xl font-bold">{restaurant.name}</h1>
            <p className="text-lg">{restaurant.address}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row w-[80%] gap-6 mx-auto">
          {/* Add comment */}
          <div className="flex flex-col justify-between border md:order-2 border-black p-8 px-10 rounded-lg shadow-lg max-h-[300px]">
            {/* Interactive stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={i < rating ? solidStar : regularStar}
                  className="text-blue-500 cursor-pointer text-2xl"
                  onClick={() => handleStarClick(i)}
                />
              ))}
            </div>

            {/* Comment input */}
            <textarea
              className="w-full pb-3 rounded-lg text-black placeholder-black focus:outline-none"
              rows={3}
              placeholder="Escribe tu comentario aquí..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            {/* Botón de enviar */}
            <button
              onClick={handleSubmit}
              className="mt-4 w-[50%] border border-black text-black py-2 rounded-lg hover:bg-gray-200 transition cursor-pointer"
            >
              Enviar
            </button>
          </div>

          {/* Description and list of comments */}
          <div className="flex-1 md:order-1 bg-white p-6 rounded-lg shadow-lg">
            {/* Descripción */}
            <p className="text-gray-700 text-lg leading-relaxed">
              {restaurant.description}
            </p>

            {/* Comments */}
            <div className="mt-6">
              <div className="space-y-4 overflow-y-auto">
                {comments.length > 0 ? (
                  comments.map((comment: Comment) => (
                    <div
                      key={comment.id}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg shadow-sm"
                    >
                      {/* Estrellas */}
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={i < comment.rating ? solidStar : regularStar}
                            className="text-blue-500 text-lg"
                          />
                        ))}
                      </div>
                      <div className="text-black-600 font-semibold text-lg w-1/3">
                        {comment.user.username}
                      </div>
                      <div className="text-gray-600 w-2/3">{comment.text}</div>

                      {/* Show Edit and Delete buttons if user is the comment owner */}
                      {user?.username === comment.user.username && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditClick(comment)}
                            className="text-blue-500"
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(comment.id)}
                            className="text-red-500"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No hay comentarios aún.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
