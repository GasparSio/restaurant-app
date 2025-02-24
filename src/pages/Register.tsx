import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Obtener el contexto de autenticación
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { register } = auth;

  // Handle go to register page
  const handleGoToLogin = () => {
    navigate("/login");
  };
  
  //Handle next step to insert the password
  const handleNextStep = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (email.trim() && username.trim()) {
      setStep(2);
    } else {
      toast.error("Please complete all fields!", {
        autoClose: 2000,
      });
    }
  };

  //Handle the register of the user
  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!password.trim()) {
      toast.error("Please enter a password", {
        autoClose: 2000,
      });
      return;
    }

    const response = await register(username, email, password);

    if (response.success) {
      toast.success(response.message, {
        autoClose: 2000,
      });
      navigate("/login");
    } else {
      toast.error(response.message, {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white">
      {/* Card Content */}
      <div className="flex flex-col-reverse md:flex-row w-[80%] h-auto md:h-[80%] gap-6">
        {/* Form section */}
        <div className="flex-1 h-[auto] flex justify-center md:self-end md:justify-end max-h-[600px]">
          <div className="bg-[#264BEB] shadow-lg rounded-[20px] p-8 text-white w-full flex flex-col justify-between">
            <ToastContainer />
            {/* Step 1? show the first form */}
            {step === 1 ? (
              <>
                <span className="text-2xl font-bold w-[30%] max-w-[100px] mb-[20px]">
                  <img src="/assets/LogoCompletoBlanco.svg" alt="tailor icon" />
                </span>

                <button
                  onClick={() => navigate("/")}
                  className="cursor-pointer w-[60px] h-[35px] border border-white rounded-[13px]"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                <form
                  onSubmit={handleNextStep}
                  className="flex flex-col w-full h-auto min-h-[210px] justify-between mt-[40px]"
                >
                  <span className="font-bold text-left">Email:</span>
                  <input
                    type="email"
                    placeholder="Añade tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[80%] p-2 border border-white rounded-[15px] bg-transparent text-white placeholder-white mb-2"
                  />
                  <span className="font-bold text-left">
                    Nombre de usuario:
                  </span>
                  <input
                    type="text"
                    placeholder="Añade tu nombre"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-[80%] p-2 border border-white rounded-[15px] bg-transparent text-white placeholder-white mb-2"
                  />
                  <button
                    type="submit"
                    className="font-bold bg-white text-[black] cursor-pointer w-[150px] h-[40px] border border-white rounded-[10px]"
                  >
                    Siguiente
                  </button>
                </form>
                <p className="text-left mt-3">
                  Ya estas registrado?{" "}
                  <span
                    onClick={handleGoToLogin}
                    className="cursor-pointer underline"
                  >
                    Login
                  </span>
                </p>
              </>
            ) : (
              //Step 2? show the second part of the form
              <>
                <span className="text-2xl font-bold w-[30%] max-w-[100px] mb-[20px]">
                  <img src="/assets/LogoCompletoBlanco.svg" alt="tailor icon" />
                </span>

                <button
                  onClick={() => setStep(1)}
                  className="cursor-pointer w-[60px] h-[30px] border border-white rounded-[10px]"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                <form
                  onSubmit={handleRegister}
                  className="flex flex-col w-full h-auto min-h-[125px] justify-between mt-[40px]"
                >
                  <span className="font-bold text-left">
                    Crea una nueva contraseña:
                  </span>
                  <input
                    type="password"
                    placeholder="Añade una contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-[70%] p-2 border border-white rounded-[15px] bg-transparent text-white placeholder-white mb-2"
                  />
                  <button
                    type="submit"
                    className="font-bold bg-white text-[black] cursor-pointer w-[150px] h-[40px] border border-white rounded-[10px]"
                  >
                    Finalizar
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Image section */}
        <div className="flex-1 rounded-lg overflow-hidden shadow-lg">
          <img
            src="/assets/foto_resto1.jpg"
            alt="Descripción de la imagen"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
