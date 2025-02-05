import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import photoResto from '../assets/foto_resto1.jpg';

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
        try {
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

            if (response.ok) {
                toast.success("User registered successfully!");
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                toast.error('Error en el registro', {
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
            <div className="flex-1 flex h-1/3 justify-end self-end">
              <div className="bg-blue-500 shadow-lg rounded-lg p-8 text-white w-full flex flex-col justify-between">
                <ToastContainer />
                {step === 1 ? (
                  <>
                    <Button onClick={() => navigate('/')} variant="outline-primary" className="cursor-pointer">
                      Go back!
                    </Button>
                    <input
                      type="email"
                      placeholder="Añade tu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 border border-white rounded bg-transparent text-white placeholder-white mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Añade tu nombre"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full p-2 border border-white rounded bg-transparent text-white placeholder-white mb-2"
                    />
                    <Button onClick={handleNextStep} variant="outline-primary" className="cursor-pointer">
                      Siguiente
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => setStep(1)} variant="outline-primary" className="cursor-pointer">
                      Go back!
                    </Button>
                    <input
                      type="password"
                      placeholder="Añade una contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-2 border border-white rounded bg-transparent text-white placeholder-white mb-2"
                    />
                    <Button onClick={handleRegister} className="bg-green-500 text-white px-4 py-2 rounded w-full cursor-pointer">
                      Finalizar
                    </Button>
                  </>
                )}
              </div>
            </div>
    
            {/* Image Section (Ahora a la derecha) */}
            <div className="flex-1 rounded-lg overflow-hidden shadow-lg">
              <img src={photoResto} alt="Descripción de la imagen" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
    );
}

export default SingIn;