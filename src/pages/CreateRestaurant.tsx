import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

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
      const response = await fetch("http://localhost:5001/api/restaurants", {
        method: "POST",
        body: data,
      });
      if (response.ok) {
        toast.success(`Restaurante agregado exitosamente`, {
          autoClose: 2000,
        });
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <span className="text-blue-600 text-lg font-semibold">
          Restaurante guardado
        </span>
        <button className="mt-4" onClick={() => navigate("/restaurants")}>
          Ver restaurante
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl flex"
      >
        <div
          className="w-1/3 h-40 bg-gray-200 flex items-center justify-center rounded-lg cursor-pointer overflow-hidden"
          onClick={() => document.getElementById("imageInput")?.click()}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span>Añadir imagen</span>
          )}
          <input
            type="file"
            id="imageInput"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="w-2/3 pl-4">
          <label className="block">Nombre del restaurante:</label>
          <input
            type="text"
            name="name"
            className="border p-2 w-full rounded"
            onChange={handleChange}
            required
          />

          <label className="block mt-2">Dirección del restaurante:</label>
          <input
            type="text"
            name="address"
            className="border p-2 w-full rounded"
            onChange={handleChange}
            required
          />

          <label className="block mt-2">Cuisine:</label>
          <input
            type="text"
            name="cuisine"
            className="border p-2 w-full rounded"
            onChange={handleChange}
            required
          />

          <div className="flex space-x-2 mt-2">
            <div>
              <label className="block">Lat:</label>
              <input
                type="text"
                name="lat"
                className="border p-2 w-full rounded"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block">Lng:</label>
              <input
                type="text"
                name="lng"
                className="border p-2 w-full rounded"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label className="block mt-2">Descripción:</label>
          <textarea
            name="description"
            className="border p-2 w-full rounded"
            onChange={handleChange}
            required
          />

          <button type="submit" className="mt-4 w-full">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
