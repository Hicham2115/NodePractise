import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function AddNote() {
  const navigate = useNavigate("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setMessage("Please fill in both fields!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/notes/", {
        title,
        content,
      });
      console.log("Note added:", response.data);
      setMessage("Note added successfully!");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding note:", error);
      setMessage("Error adding note. Try again.");
    }
    navigate("/");
  };

  return (
    <div className="flex justify-center mt-16">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a261a] p-8 rounded-xl shadow-2xl w-full max-w-lg flex flex-col gap-6 border border-gray-700"
      >
        <h2 className="text-[#1cb754] text-2xl font-bold text-center">
          Add a New Note
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 rounded-md border text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1cb754]  placeholder-gray-500"
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1cb754] text-white placeholder-gray-500 h-32 resize-none"
        />

        <button
          type="submit"
          className="bg-[#1cb754] hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Add Note
        </button>

        {message && (
          <p
            className={`text-center ${
              message.includes("success") ? "text-green-400" : "text-red-400"
            } font-medium`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default AddNote;
