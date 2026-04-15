import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: "", amount: "", category: "" });

  const token = localStorage.getItem("token");

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`${API}/api/expense`, {
        headers: { Authorization: token }
      });
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addExpense = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/expense`, form, {
        headers: { Authorization: token }
      });
      fetchExpenses();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="dashboard">
      <h2>Expense Dashboard</h2>
      <h3>Total: ₹{total}</h3>

      <form onSubmit={addExpense}>
        <input placeholder="Title" onChange={e => setForm({...form, title:e.target.value})}/>
        <input placeholder="Amount" onChange={e => setForm({...form, amount:e.target.value})}/>
        <input placeholder="Category" onChange={e => setForm({...form, category:e.target.value})}/>
        <button type="submit">Add Expense</button>
      </form>

      {expenses.map((exp, i) => (
        <div className="expense-card" key={i}>
          <strong>{exp.title}</strong>
          <p>₹{exp.amount} | {exp.category}</p>
        </div>
      ))}
    </div>
  );
}