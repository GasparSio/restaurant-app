import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

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
            alert("Por favor, completa todos los campos");
        }
    }
    
    //Handle register the user
    const handleRegister = async () => {
        if (!password.trim()) {
            alert('Please enter a password');
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
                alert("Registro exitoso");
            } else {
                alert("Error en el registro");
            }
        } catch (error) {
            console.error('Error on Register the User:', error);
        }

    }
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-6 w-96 text-center">
                <Button onClick={() => navigate('/')} className="bg-black text-white px-6 py-2 rounded-lg">Go back!</Button>
                {step === 1 ? (
                        <>
                            <input 
                                type='email'
                                placeholder='Añade tu email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <input 
                                type='text'
                                placeholder='Añade tu nombre'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <Button 
                                onClick={handleNextStep} 
                                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                            >
                                Siguiente
                            </Button>
                        </>
                    ) : (
                        <>  
                            <Button
                                onClick={() => setStep(1)}
                            >
                                Go back!
                            </Button>
                            <input
                                type='password'
                                placeholder='Añade una contraseña'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <Button
                                onClick={handleRegister}
                                className="bg-green-500 text-white px-4 py-2 rounded w-full"
                            >
                                Finalizar
                            </Button>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default SingIn;