import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import photoResto from "../assets/foto_resto1.jpg";
import logo from "../assets/Type=default.svg";

const SingIn = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (email.trim() && username.trim()) {
      setStep(2);
    } else {
      toast.error("Please complete all fields!", {
        autoClose: 2000,
      });
    }
  };

  const handleRegister = async () => {
    if (!password.trim()) {
      toast.error("Please enter a password", {
        autoClose: 2000,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        toast.success("User registered successfully!", {
          autoClose: 2000,
        });
        setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.error("There was an error, try again!", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(`There was an error, try again!, ${error}`, {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white">
      {/* Contenedor principal con cambio de dirección */}
      <div className="flex flex-col-reverse md:flex-row w-[80%] h-auto md:h-[80%] gap-6">
        {/* Sección de formulario */}
        <div className="flex-1 flex justify-center md:justify-end h-[60%] max-h-[600px]">
          <div className="bg-blue-500 shadow-lg rounded-lg p-8 text-white w-full flex flex-col justify-between">
            <ToastContainer />
            {step === 1 ? (
              <>
                <span className="text-2xl font-bold w-[30%] max-w-[100px]">
                  <img src={logo} alt="tailor icon" />
                </span>

                <button
                  onClick={() => navigate("/")}
                  className="cursor-pointer w-[60px] h-[30px] border border-white rounded-[10px]"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                <span className="text-left">Email:</span>
                <input
                  type="email"
                  placeholder="Añade tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-[70%] p-2 border border-white rounded-[15px] bg-transparent text-white placeholder-white mb-2"
                />
                <span className="text-left">Nombre de usuario:</span>
                <input
                  type="text"
                  placeholder="Añade tu nombre"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-[70%] p-2 border border-white rounded-[15px] bg-transparent text-white placeholder-white mb-2"
                />
                <button
                  onClick={handleNextStep}
                  className="cursor-pointer w-[150px] h-[40px] border border-white rounded-[10px]"
                >
                  Siguiente
                </button>
              </>
            ) : (
              <div className="rounded-lg p-8 text-white w-full flex flex-col">
                <span className="text-2xl font-bold w-[30%] max-w-[100px]">
                  <img src={logo} alt="tailor icon" />
                </span>

                <button
                  onClick={() => setStep(1)}
                  className="cursor-pointer w-[60px] h-[30px] border border-white rounded-[10px]"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                <span className="text-left">Crea una nueva contraseña:</span>
                <input
                  type="password"
                  placeholder="Añade una contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-[70%] p-2 border border-white rounded-[15px] bg-transparent text-white placeholder-white mb-2"
                />
                <button
                  onClick={handleRegister}
                  className="cursor-pointer w-[150px] h-[40px] border border-white rounded-[10px]"
                >
                  Finalizar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sección de imagen */}
        <div className="flex-1 rounded-lg overflow-hidden shadow-lg">
          <img
            src={photoResto}
            alt="Descripción de la imagen"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SingIn;
