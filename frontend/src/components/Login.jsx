import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/auth/login`, data);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input placeholder="Email" onChange={e => setData({...data, email:e.target.value})}/>
          <input type="password" placeholder="Password" onChange={e => setData({...data, password:e.target.value})}/>
          
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}