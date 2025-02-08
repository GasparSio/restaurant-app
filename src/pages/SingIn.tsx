import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import photoResto from "../assets/foto_resto1.jpg";
import logo from "../assets/LogoCompletoBlanco.svg";

const SingIn = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

    //Request to the API to register the user
    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      //Handle the response of the API
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
      {/* Card Content */}
      <div className="flex flex-col-reverse md:flex-row w-[80%] h-auto md:h-[80%] gap-6">
        {/* Form section */}
        <div className="flex-1 h-[auto] flex justify-center md:self-end md:justify-end max-h-[600px]">
          <div className="bg-[#264BEB] shadow-lg rounded-lg p-8 text-white w-full flex flex-col justify-between">
            <ToastContainer />
            {/* Step 1? show the first form */}
            {step === 1 ? (
              <>
                <span className="text-2xl font-bold w-[30%] max-w-[100px] mb-[20px]">
                  <img src={logo} alt="tailor icon" />
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
                  <span className="font-bold text-left">Nombre de usuario:</span>
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
              </>
            ) : (
              //Step 2? show the second part of the form
              <>
                <span className="text-2xl font-bold w-[30%] max-w-[100px] mb-[20px]">
                  <img src={logo} alt="tailor icon" />
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
                  <span className="font-bold text-left">Crea una nueva contraseña:</span>
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
