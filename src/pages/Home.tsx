import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex flex-col lg:flex-row items-center justify-between p-6 lg:p-12 bg-gray-100 min-h-screen">
                <div className="lg:w-1/2 flex flex-col items-start p-6 bg-white rounded-2xl shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold">✂ tailor</span>
                    </div>
                    <h1 className="text-xl font-semibold mb-2">Hola,</h1>
                    <p className="text-gray-600 mb-4">
                    Welcome! On this page, you will find a selection of restaurants along with their details, customer reviews, and ratings. Whether you're looking for a fine dining experience, a cozy café, or a casual eatery, you can explore different options and choose the one that best suits your preferences and tastes.
                    </p>
                    <Button onClick={() => navigate('/singin')} className="bg-black text-white px-6 py-2 rounded-lg">Entrar</Button>
                    <p className="text-gray-400 text-sm mt-6">Prueba técnica ©Tailor hub SL 2019 - 2024</p>
                </div>
                <div className="lg:w-1/2 mt-6 lg:mt-0">
                    <img
                    src="/assets/restaurant.jpg"
                    alt="Restaurant interior"
                    className="rounded-2xl shadow-lg w-full h-auto object-cover"
                    />
                </div>
            </div>
        </>
    )
};

export default Home;