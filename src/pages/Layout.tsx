import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";

export default function Layout() {
  const [userName, setUserName] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName"); // Asegúrate de borrar el usuario
    navigate("/");
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
    <ToastContainer />
      {/* Render User Menu*/}
      {userName && (
        <div className="absolute top-4 right-4 z-[999]">
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
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      )}

      {/* Render routes inside Layout */}
      <Outlet />
    </div>
  );
}
