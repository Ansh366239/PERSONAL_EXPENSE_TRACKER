import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/auth/register`, data);
      alert("Registered Successfully");
      window.location.href = "/login";
    } catch (err) {
      console.log(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input placeholder="Name" onChange={e => setData({...data, name:e.target.value})}/>
          <input placeholder="Email" onChange={e => setData({...data, email:e.target.value})}/>
          <input type="password" placeholder="Password" onChange={e => setData({...data, password:e.target.value})}/>
          
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}