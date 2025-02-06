import { useNavigate } from 'react-router-dom';
import logo from '../assets/Type=default.svg';
import photoResto from '../assets/foto_resto1.jpg';

const Home = () => {
    const navigate = useNavigate();
    
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-white">
          <div className="flex w-[80%] h-[80%] gap-6">
            {/* Card Section */}
            <div className="flex-1 bg-gray-100 rounded-lg p-8 flex flex-col h-1/3 justify-end self-end shadow-lg text-justify">
              <div>
                <div className="flex items-center gap-</div>2 mb-4">
                    <span className="text-2xl font-bold w-[30%] max-w-[100px]">
                    <img src={logo} alt="tailor icon" />
                    </span>
                </div>
                <p className="text-gray-700 mb-2">Hola,</p>
                <p className="text-gray-700 mb-6">
                  Bienvenido a la prueba de Tailor hub, en ella has de añadir los restaurantes favoritos donde te gustaría ir en tu onboarding.
                </p>
              </div>
                <button 
                  onClick={() => navigate('/singin')} 
                  className="cursor-pointer border border-black w-20 h-9 rounded-[10px]"
                >
                  Entrar
                </button>
            </div>
    
            {/* Image Section */}
            <div className="flex-2 rounded-lg overflow-hidden shadow-lg">
              <img src={photoResto} alt="Restaurant interior" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      );
};

export default Home;
