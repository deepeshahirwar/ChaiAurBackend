import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // ← Font Awesome arrow

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)} // Go back to the previous page
      className="flex items-center gap-2 text-blue-600 font-semibold hover:underline"
    >
      <FaArrowLeft />
      Go Back
    </button>
  );
};

export default GoBackButton;
