import { ReactNode } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }: { children: ReactNode }) {

  //Handle the register of the user
  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await fetch(
        "https://restaurant-api-ld1w.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        }
      );

      if (response.ok) {
        toast.success("User registered successfully!", {
          autoClose: 2000,
        });
        return { success: true, message: "User registered successfully!" }; // <-- Devuelve un objeto
      } else {
        return { success: false, message: "There was an error, try again!" };
      }
    } catch (error) {
      return { success: false, message: `There was an error: ${error}` };
    }
  };

  return (
    <AuthContext.Provider value={{ register }}>
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
}
