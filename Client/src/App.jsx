import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AddUpdateForm.css";
import "../styles/TableLayout.css";
import "./App.css";

const API = "http://localhost:3000";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    age: "",
    grade: "",
    email: "",
    password: "",
  });

  // Get all students
  async function GetData() {
    try {
      const res = await axios.get(`${API}/students`);
      setStudents(res.data || []);
    } catch (err) {
      console.error("GetData error:", err);
      alert("Failed to fetch students");
    }
  }

  // Add student
  async function AddStudent(e) {
    e.preventDefault();
    try {
      const { name, age , grade , email, password } = form;
      await axios.post(`${API}/students`, { name, age , grade , email, password });
      setForm({ id: "", name: "", age:"" , grade:"", email: "", password: "" });
      await GetData();
      alert("Student added");
    } catch (err) {
      console.error("AddStudent error:", err);
      alert("Failed to add student");
    }
  }

  // Update student
  async function UpdateStudent(e) {
    e.preventDefault();
    try {
      const { id, name, age , grade, email, password } = form;
      if (!id) return alert("Please provide student id to update");
      await axios.put(`${API}/students/${id}`, { name, age , grade, email, password });
      setForm({ id: "", name: "", age:"" , grade:"" ,email: "", password: "" });
      await GetData();
      alert("Student updated");
    } catch (err) {
      console.error("UpdateStudent error:", err);
      alert("Failed to update student");
    }
  }

  // Delete student
  async function DeleteStudent(id) {
    try {
      if (!window.confirm("Delete this student?")) return;
      await axios.delete(`${API}/students/${id}`);
      await GetData();
      alert("Student deleted");
    } catch (err) {
      console.error("DeleteStudent error:", err);
      alert("Failed to delete student");
    }
  }

  useEffect(() => {
    GetData();
  }, []);

  return (
    <div className="app">
      <h2>Student Management</h2>
        <div className="divider" >
      {/* Add Student Form */}
      <form className="form" onSubmit={AddStudent}>
        <h3>Add Student</h3>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <input
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
        />
        <input
          placeholder="Grade"
          value={form.grade}
          onChange={(e) => setForm((f) => ({ ...f, grade: e.target.value }))}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
        /> <br /> <br /><br />
        <button type="submit">Add</button>
      </form>
      <div className="spacer" >
      {/* Update Student Form */}
      <form className="form" onSubmit={UpdateStudent}>
        <h3>Update Student</h3>
        <input
          placeholder="Student ID"
          value={form.id}
          onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
        />
        <input
          placeholder="New name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <input
          placeholder="New age"
          value={form.age}
          onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
        />
        <input
          placeholder="New grade"
          value={form.grade}
          onChange={(e) => setForm((f) => ({ ...f, grade: e.target.value }))}
        />
        <input
          placeholder="New email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
        <input
          placeholder="New password"
          type="password"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
        />
        <button type="submit">Update</button>
      </form>
      </div>
      </div>

      {/* List Students */}
      <section className="list">
        <h3>All Students</h3>
        {students.length === 0 ? (
          <p>No students found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Grade</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.age}</td>
                  <td>{s.grade}</td>
                  <td>{s.email}</td>
                  <td>
                    <button
                      onClick={() =>
                        setForm({
                          id: String(s.id),
                          name: s.name,
                          age: s.age,
                          grade: s.grade,
                          email: s.email,
                          password: "",
                        })
                      }
                    >
                      Edit
                    </button>
                    <button onClick={() => DeleteStudent(s.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default App;
