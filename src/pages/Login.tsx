import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import photoResto from '../assets/foto_resto1.jpg';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    //Handle go to register page
    const handleGoToRegister = () => {
        navigate('/singin');
    }

    //Handle register the user
    const handleLogin = async () => {
        if (!email && !password.trim()) {
            alert('Please enter the email and password');
            return;
        }
        try {
            const response = await fetch('https://d5g0n9mm-5001.uks1.devtunnels.ms/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })

            if (!response.ok) {
                alert('Error en el inicio de sesión. Verifica tus credenciales.');
                return;
            }
    
            const data = await response.json(); // Get the data from the response
            if (data.token) {
                localStorage.setItem('token', data.token); // Save token on local storage
                
                navigate('/restaurants'); // Redirect to the restaurants page
            } else {
                alert('No se recibió un token válido');
            }
        } catch (error) {
            console.error('Error on Register the User:', error);
        }

    }
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-white">
          <div className="flex w-[80%] h-[80%] gap-6">
            {/* Card Section (Izquierda) */}
            <div className="flex-1 flex h-1/3 justify-end self-end">
              <div className="bg-blue-500 shadow-lg rounded-lg p-8 text-white w-full flex flex-col justify-between">
                <p>
                  No tienes cuenta?{" "}
                  <span
                    onClick={handleGoToRegister}
                    className="cursor-pointer underline"
                  >
                    Regístrate
                  </span>
                </p>
                <input
                  type="email"
                  placeholder="Añade tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-white rounded bg-transparent text-white placeholder-white mb-2"
                />
                <input
                  type="password"
                  placeholder="Escribe tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-white rounded bg-transparent text-white placeholder-white mb-2"
                />
                <Button
                  onClick={handleLogin}
                  className="bg-blue-700 text-white px-4 py-2 rounded w-full cursor-pointer"
                >
                  Entrar
                </Button>
              </div>
            </div>
    
            {/* Image Section (Derecha) */}
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
}

export default LogIn;