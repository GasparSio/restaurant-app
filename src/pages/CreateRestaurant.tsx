import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/LogoSimple.svg";

interface Restaurant {
  name: string;
  address: string;
  cuisine: string;
  lat: string;
  lng: string;
  description: string;
  image: File | null;
}

export default function NewRestaurant() {
  const [formData, setFormData] = useState<Restaurant>({
    name: "",
    address: "",
    cuisine: "",
    lat: "",
    lng: "",
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Check if user is logged in or not to redirect
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  // Handle form changes and update the state
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image changes and update the state
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submit and send the data to the server
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    data.append("name", formData.name);
    data.append("address", formData.address);
    data.append("cuisine", formData.cuisine);
    data.append("lat", formData.lat);
    data.append("lng", formData.lng);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    // Send the data to the server to create a new restaurant
    try {
      const response = await fetch("https://restaurant-api-ld1w.onrender.com/api/restaurants", {
        method: "POST",
        body: data,
      });
      if (response.ok) {
        toast.success(`Restaurante agregado exitosamente`, {
          autoClose: 2000,
        });
        //Setting success to true to show the success render
        setSuccess(true);
      } else {
        toast.error(`Error al agregar restaurante`, {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(`Error al agregar restaurante, ${error}`, {
        autoClose: 2000,
      });
    }
  };

  // If the restaurant is saved successfully, show a success message
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-white">
        <div className="h-[40%] max-h-[800px] flex flex-col justify-evenly items-center w-[40%] max-w-[600px]">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <span className="text-blue-600 text-lg font-semibold">
            Restaurante guardado
          </span>
          <button
            className="h-[40px] w-[50%] border-black border rounded-[10px] font-bold mt-4"
            onClick={() => navigate("/restaurants")}
          >
            Ver restaurante
          </button>
          <img src={logo} alt="Logo" className="w-10 h-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-white">
      <ToastContainer />
      {/* Go Back Button */}
      <div className="absolute top-0 left-0 m-6">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer w-[60px] h-[30px] border border-black rounded-[10px]"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>

      <img src={logo} alt="Logo" className="w-10 h-10" />
      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-[80%] max-w-[746px] my-7 flex flex-col md:flex-row text-left"
      >
        {/* Image Section */}
        <div
          className="md:w-[50%] min-h-[200px] bg-gray-200 flex items-center mb-[30px] md:mb-[0px] justify-center rounded-lg cursor-pointer overflow-hidden border border-black"
          onClick={() => document.getElementById("imageInput")?.click()}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-bold">Añadir imagen</span>
          )}
          <input
            type="file"
            id="imageInput"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Input Section */}
        <div className="md:w-[50%] md:pl-4">
          <label className="block font-bold">Nombre del restaurante:</label>
          <input
            type="text"
            placeholder="Nombre del restaurante"
            name="name"
            className="border p-2 w-full rounded-[15px]"
            onChange={handleChange}
            required
          />

          <label className="font-bold block mt-2">
            Dirección del restaurante:
          </label>
          <input
            type="text"
            placeholder="Dirección"
            name="address"
            className="border p-2 w-full rounded-[15px]"
            onChange={handleChange}
            required
          />

          <label className="font-bold block mt-2">Cuisine:</label>
          <input
            type="text"
            placeholder="Tipo de cocina"
            name="cuisine"
            className="border p-2 w-full rounded-[15px]"
            onChange={handleChange}
            required
          />

          <div className="flex flex-row justify-between space-x-2 mt-2">
            <div>
              <label className="font-bold block">Lat:</label>
              <input
                type="text"
                placeholder="Latitud"
                name="lat"
                className="border p-2 w-full rounded-[15px]"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="font-bold block">Lng:</label>
              <input
                type="text"
                placeholder="Longitud"
                name="lng"
                className="border p-2 w-full rounded-[15px]"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label className="font-bold block mt-2">Descripción:</label>
          <textarea
            name="description"
            placeholder="Escribe información acerca del restaurante"
            className="border p-2 w-full rounded-[15px]"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="h-[40px] w-[50%] border-black border rounded-[10px] font-bold mt-4"
          >
            Guardar
          </button>
        </div>
      </form>
      <img src={logo} alt="Logo" className="w-10 h-10" />
    </div>
  );
}
