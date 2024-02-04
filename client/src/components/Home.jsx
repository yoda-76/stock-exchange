import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bg from '../assets/bg.png';

const Home = () => {
  const navigate = useNavigate();

  const divStyle = {
    backgroundImage: `url(${bg})`,
  };

  return (
    <div className="min-h-screen bg-cover flex items-center justify-center" style={divStyle}>
      <div className="bg-opacity-50 p-8 rounded-lg bg-white">
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Home;
