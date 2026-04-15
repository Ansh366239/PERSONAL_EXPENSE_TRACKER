import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: "", amount: "", category: "" });

  const token = localStorage.getItem("token");

  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/api/expense", {
      headers: { Authorization: token }
    });
    setExpenses(res.data);
  };

  const addExpense = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/expense", form, {
      headers: { Authorization: token }
    });
    fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <form onSubmit={addExpense}>
        <input placeholder="Title" onChange={e => setForm({...form, title:e.target.value})}/>
        <input placeholder="Amount" onChange={e => setForm({...form, amount:e.target.value})}/>
        <input placeholder="Category" onChange={e => setForm({...form, category:e.target.value})}/>
        <button>Add</button>
      </form>

      {expenses.map((exp, i) => (
        <div key={i}>
          {exp.title} - ₹{exp.amount} - {exp.category}
        </div>
      ))}
    </div>
  );
}