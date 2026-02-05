import React from "react";

const Home = () => {
  return (
    <>
      <div className="container">
        <div className="p-5 text-center bg-light-dark rounded">
          <h1 className="text-light">stock prediction</h1>
          <p className="text-light">
            The Stock Prediction Portal is a web-based application that analyzes
            historical stock data and predicts future prices using machine
            learning models. It features an interactive React frontend and a
            Django REST backend to display stock trends, visual charts, and
            prediction results. The system helps users understand market
            behavior and make informed investment decisions through data-driven
            insights.
          </p>
          <button text="Login" class="btn-outline-danger">Login</button>
        </div>
      </div>
    </>
  );
};

export default Home;
