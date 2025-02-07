import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import photoResto from "../assets/foto_resto1.jpg";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle go to register page
  const handleGoToRegister = () => {
    navigate("/singin");
  };

  // Handle user login
  const handleLogin = async () => {
    if (!email || !password.trim()) {
      toast.error("Por favor, ingresa el email y la contraseña.", {
        autoClose: 2000,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        toast.error(
          "Error en el inicio de sesión. Verifica tus credenciales.",
          {
            autoClose: 2000,
          }
        );
        return;
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/restaurants");
      } else {
        alert("No se recibió un token válido");
      }
    } catch (error) {
      toast.error(`Error al iniciar sesión: ${error}`, {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white">
      <div className="flex flex-col md:flex-row w-[80%] h-auto md:h-[80%] gap-6">
        <ToastContainer />

        {/* Sección de imagen - Aparece arriba en móvil */}
        <div className="flex-1 rounded-lg overflow-hidden shadow-lg md:order-2">
          <img
            src={photoResto}
            alt="Descripción de la imagen"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Sección del formulario - Aparece abajo en móvil */}
        <div className="flex-1 flex h-[50%] justify-center md:justify-end md:order-1">
          <div className="bg-blue-500 shadow-lg rounded-lg p-8 text-white w-full flex flex-col justify-between">
            <p className="text-left">
              No tienes cuenta?{" "}
              <span
                onClick={handleGoToRegister}
                className="cursor-pointer underline"
              >
                Regístrate
              </span>
            </p>
            <span className="text-left">Email:</span>
            <input
              type="email"
              placeholder="Añade tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-white rounded-[15px] bg-transparent text-white placeholder-white mb-2"
            />
            <span className="text-left">Escribe tu contraseña:</span>
            <input
              type="password"
              placeholder="Escribe tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-white rounded-[15px] bg-transparent text-white placeholder-white mb-2"
            />
            <button
              onClick={handleLogin}
              className="cursor-pointer w-[150px] h-[40px] border border-white rounded-[10px]"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
