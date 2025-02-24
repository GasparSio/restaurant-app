import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle go to register page
  const handleGoToRegister = () => {
    navigate("/register");
  };

  // Handle user login
  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!email || !password.trim()) {
      toast.error("Por favor, ingresa el email y la contraseña.", {
        autoClose: 2000,
      });
      return;
    }

    // Send login request
    try {
      const response = await fetch("https://restaurant-api-ld1w.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      //Handle response
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
        toast.error(`Credenciales invalidas`, {
          autoClose: 2000,
        });
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
            src="/assets/foto_resto1.jpg"
            alt="Descripción de la imagen"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Sección del formulario - Aparece abajo en móvil */}
        <div className="flex-1 flex h-[50%] md:self-end justify-center md:justify-end md:order-1">
          <div className="bg-[#264BEB] shadow-lg rounded-[20px] p-8 text-white w-full flex flex-col justify-around">
            <span className="text-2xl font-bold w-[30%] max-w-[100px]">
              <img src="/assets/LogoCompletoBlanco.svg" alt="tailor icon" />
            </span>
            <form onSubmit={handleLogin} className="flex flex-col w-full">
              <span className="text-left font-bold">Email:</span>
              <input
                type="email"
                placeholder="Escribe tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[80%] p-2 border border-white rounded-[15px] bg-transparent text-white placeholder-white mb-2"
              />
              <span className="text-left font-bold">Contraseña:</span>
              <input
                type="password"
                placeholder="Escribe tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[80%] p-2 border border-white rounded-[15px] bg-transparent text-white placeholder-white mb-2"
              />
              <button
                type="submit"
                className="font-bold bg-white text-[black] cursor-pointer w-[150px] h-[40px] border border-white rounded-[10px] mt-[5px]"
              >
                Siguiente
              </button>
            </form>
            <p className="text-left">
              No tienes cuenta?{" "}
              <span
                onClick={handleGoToRegister}
                className="cursor-pointer underline"
              >
                Regístrate
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
