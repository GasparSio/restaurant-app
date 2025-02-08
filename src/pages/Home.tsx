import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-white">
      <div className="flex flex-col-reverse md:flex-row w-[80%] h-[80%] gap-6">
        
        {/* Card Section */}
        <div className="flex-1/3 bg-[#F1F1F0] min-h[400px] justify-evenly rounded-lg p-6 flex flex-col h-[auto] self-end shadow-lg text-justify">
          <div>
            <div className="flex items-center gap-</div>2 mb-4">
              <span className="text-2xl font-bold w-[30%] max-w-[100px] mb-[15px]">
                <img src="/assets/Type=Default.svg" alt="tailor icon" />
              </span>
            </div>
            <p className="mb-2 text-[20px]">Hola,</p>
            <p className="mb-2">
              Esta web te permitirá explorar una variedad de opciones
              gastronómicas y seleccionar aquellos lugares que más te atraigan.
              Podrás ver detalles de cada restaurante, incluyendo su menú,
              ubicación y opiniones de otros usuarios. Esperamos que disfrutes
              de esta experiencia y encuentres los mejores lugares para tus
              futuras visitas.
            </p>
          </div>
          <button
            onClick={() => navigate("/singin")}
            className="cursor-pointer border border-black w-20 h-9 rounded-[15px] mt-[10px]"
          >
            Entrar
          </button>
        </div>

        {/* Image Section */}
        <div className="flex-2 rounded-lg overflow-hidden shadow-lg">
          <img
            src="/assets/foto_resto1.jpg"
            alt="Restaurant interior"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
