import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ThesisReview = () => {
  const { thesisId } = useParams();
  const navigate = useNavigate();
  const [thesis, setThesis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewText, setReviewText] = useState("");
  console.log(thesisId);
  useEffect(() => {
    const fetchThesis = async () => {
      try {
        const apiDomain = import.meta.env.VITE_API_DOMAIN;

        const response = await axios.get(
          `${apiDomain}/api/faculty/thesis-review/${thesisId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        setThesis(response.data);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchThesis();
  }, [thesisId]);

  const handleAction = async (status) => {
    try {
      const apiDomain = import.meta.env.VITE_API_DOMAIN;

      await axios.patch(
        `${apiDomain}/api/faculty/thesis/${thesisId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      navigate("/thesis-requests"); // Redirect after action
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  const handleReview = async () => {
    try {
      const apiDomain = import.meta.env.VITE_API_DOMAIN;

      await axios.post(
        `${apiDomain}/api/faculty/thesis/${thesisId}/review`,
        { review: reviewText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setReviewText(""); // Clear the review text
      alert("Review submitted successfully!");
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  if (loading) return <div>Loading thesis details...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!thesis) {
    return (
      <div className="text-gray-500">There are no requests currently.</div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">{thesis.title}</h1>
      <p className="mt-2 text-gray-600">{thesis.abstract}</p>
      <p className="mt-2 text-sm text-gray-500">
        Authors: {thesis.authors.join(", ")}
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Research Area: {thesis.researchArea}
      </p>
      <div className="mt-6 space-y-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => handleAction("Approved")}
        >
          Approve
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => handleAction("Rejected")}
        >
          Reject
        </button>
        <div>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleReview}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThesisReview;
