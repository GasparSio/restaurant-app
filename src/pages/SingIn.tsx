import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, ToastContainer } from 'react-toastify';
import photoResto from '../assets/foto_resto1.jpg';
import logo from '../assets/Type=default.svg';

const SingIn = () => {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    //Handle next step to visualize the next form
    const handleNextStep = () => {
        if (email.trim() && username.trim()) {
            setStep(2);
        } else {
            toast.error('Please complete all fields!', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light"
              });
        }
    }
    
    //Handle register the user
    const handleRegister = async () => {
        try {
          if (!password.trim()) {
              toast.error('Please enter a password', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
                });
            return;
          }
        
          // Call the API to register the user
          const response = await fetch('https://d5g0n9mm-5001.uks1.devtunnels.ms/api/auth/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  username,
                  email,
                  password,
              }),
          })

          //Manage the response
          if (response.ok) {
              toast.success("User registered successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
              });
              setTimeout(() => {
                  navigate('/login');
              }, 1000);
          } else {
              toast.error('There was an error, try again!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
              });
          }
        } catch (error) {
            console.error('Error on Register the User:', error);
        }

    }
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-white">
          <div className="flex w-[80%] h-[80%] gap-6">
            {/* Card Section */}
            <div className="flex-1 flex h-2/4 justify-end self-end">
              <div className="bg-blue-500 shadow-lg rounded-lg p-8 text-white w-full flex flex-col justify-between">
                <ToastContainer />
                {step === 1 ? (
                  // Step 1
                  <>
                    {/* ICON TODO: CHANGE COLOR */} 
                    <span className="text-2xl font-bold w-[30%] max-w-[100px]">
                      <img src={logo} alt="tailor icon" />
                    </span>

                    {/* Button go back */}
                    <button 
                      onClick={() => navigate('/')}
                      className="cursor-pointer w-[60px] h-[30px] border border-white rounded-[10px]"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </button>

                    {/* Inputs form */}
                    <span className="text-left">Email:</span>
                    <input
                      type="email"
                      placeholder="Añade tu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-[60%] p-2 border border-white rounded-[15px] bg-transparent text-white placeholder-white mb-2"
                    />
                    <span className="text-left">Nombre de usuario:</span>
                    <input
                      type="text"
                      placeholder="Añade tu nombre"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-[60%] p-2 border border-white rounded-[15px] bg-transparent text-white placeholder-white mb-2"
                    />
                    <button onClick={handleNextStep} className="cursor-pointer w-[150px] h-[40px] border border-white rounded-[10px]">
                      Siguiente
                    </button>
                  </>
                ) : (
                  // Step 2
                    <div className="rounded-lg p-8 text-white w-full h-[90%] flex flex-col justify-between ">
                    {/* ICON TODO: CHANGE COLOR */} 
                    <span className="text-2xl font-bold w-[30%] max-w-[100px]">
                      <img src={logo} alt="tailor icon" />
                    </span>

                    {/* Button go back */}
                    <button onClick={() => setStep(1)} 
                      className="cursor-pointer w-[60px] h-[30px] border border-white rounded-[10px]"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </button>

                    {/* Inputs form */}
                    <span className="text-left">Crea una nueva contraseña:</span>
                    <input
                      type="password"
                      placeholder="Añade una contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-[60%] p-2 border border-white rounded-[15px] bg-transparent text-white placeholder-white mb-2"
                    />
                    <button onClick={handleRegister} 
                      className="cursor-pointer w-[150px] h-[40px] border border-white rounded-[10px]"
                    >
                      Finalizar
                    </button>
                    </div>
                )}
              </div>
            </div>
    
            {/* Image Section */}
            <div className="flex-1 rounded-lg overflow-hidden shadow-lg">
              <img src={photoResto} alt="Descripción de la imagen" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
    );
}

export default SingIn;