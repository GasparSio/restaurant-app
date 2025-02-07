import { useNavigate } from "react-router-dom";
import constructionImage from "../assets/workinprogress.jpg";

const NewRestaurant = () => {
  const navigate = useNavigate();
  return (
    // Display the work in progress page
    <div
      className="flex items-center justify-center w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${constructionImage})` }}
    >
      <div
        className="bg-white bg-opacity-70 p-8 rounded-lg text-center shadow-lg max-w-lg"
        style={{
          position: "absolute",
          bottom: "10%",
          backgroundColor: "transparent",
        }}
      >
        <p className="text-lg text-white mb-6">
          Estamos trabajando para traerte una nueva experiencia.
        </p>
        <p className="text-md text-white mb-6">¡Pronto estará disponible!</p>
        <button
          className="bg-transparent border border-white text-white px-4 py-2 rounded cursor-pointer"
          onClick={() => navigate("/restaurants")}
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default NewRestaurant;
