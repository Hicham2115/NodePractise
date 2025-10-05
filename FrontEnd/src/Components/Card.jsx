import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import Hero from "./Hero";
import api from "../../api";

function Card() {
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alert1, setAlert1] = useState(false);
  const [refresh, setRefersh] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate("");

  useEffect(() => {
    api
      .get("/notes/")
      .then((response) => {
        console.log(response.data.notes);
        setData(response.data.notes);
      })
      .catch((error) => {
        console.error(error);
        setAlert1(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refresh]);

  function handleEdit(note) {
    navigate("editNote", { state: { id: note._id } });
  }

  function handleDelete(note) {
    api
      .delete(`notes/${note._id}`)
      .then((response) => {
        console.log(response.data);
        setAlert(true);
      })
      .catch((error) => {
        console.error(error);
      });
    setRefersh(true);
  }
  function handleDeleteAll() {
    api
      .delete(`notes/deleteall/`)
      .then((response) => {
        console.log(response.data);
        setAlert(true);
      })
      .catch((error) => {
        console.error(error);
      });
    setRefersh(true);
  }

  // Hide alert after 3 seconds
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(false), 3000);
      return () => clearTimeout(timer);
    }
    if (alert1) {
      const timer = setTimeout(() => setAlert1(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert, alert1]);

  return (
    <div className="flex flex-col items-center px-4 mt-6 w-full">
      {/* Loading */}
      {loading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-[#1a261a] p-6 rounded-lg shadow-lg flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span className="text-white">Loading...</span>
        </div>
      )}

      {/* Delete All button */}
      <div className="w-full flex justify-end mb-4">
        <button
          onClick={handleDeleteAll}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded"
        >
          Delete All Notes
        </button>
      </div>

      {/* Notes */}
      <div className="flex flex-wrap justify-center gap-4 w-full">
        {data && data.length > 0
          ? data.map((note) => (
              <div
                key={note._id}
                className="bg-[#1a261a] w-full max-w-sm md:max-w-md rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row"
              >
                {/* Icon */}
                <div className="flex items-center justify-center p-4 bg-[#1cb754] md:w-20">
                  <i className="bx bx-bolt text-3xl text-white"></i>
                </div>

                {/* Card body */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <h2 className="text-white text-xl font-bold mb-1">
                    {note.title}
                  </h2>
                  <p className="text-gray-300 text-sm mb-1">{note.content}</p>
                  <p className="text-gray-400 text-xs mb-2">
                    Date: {note.createdAt.slice(0, 10)}
                  </p>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(note)}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-1 px-3 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          : !loading && (
              <span className="text-gray-300">No Data To Display ...</span>
            )}
      </div>

      {/* Alerts */}

      {alert1 && <Hero />}

      {alert && (
        <div
          role="alert"
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Note Deleted Successfully.</span>
        </div>
      )}
    </div>
  );
}

export default Card;
