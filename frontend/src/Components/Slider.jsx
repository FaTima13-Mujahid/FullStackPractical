import React from "react";
import { Link } from "react-router-dom";

const Slider = () => {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="10000">
          <img
            src="https://images.pexels.com/photos/27861771/pexels-photo-27861771/free-photo-of-home-office-table-equipment.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="d-block w-100"
            alt="Slide 1"
          />
          <div
            className="carousel-caption d-flex align-items-center justify-content-center d-none d-md-block"
            style={{
              marginBottom: "400px",
            //   backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for the caption
            }}
          >
            <div className="text-center">
              <h2 style={{ color: "white" }}>WELCOME TO</h2>
              <h1
                style={{
                  backgroundColor: "#FF6961",
                  color: "white",
                  fontFamily: "Hahmlet",
                  fontWeight: 700,
                  fontSize: "50px",
                  opacity: 0.8, // Apply opacity to the text
                }}
              >
                The most reliable cloud database solution
              </h1>
              <p style={{ fontWeight: 500, opacity: 0.8 }}>
                {" "}
                {/* Opacity for paragraph */}
                Effortlessly manage and store your data with MongoDB Atlas
              </p>
              {/* Get Started Button */}
              <Link
              to="/Account"
                className="btn btn-lg btn-danger"
                style={{
                  fontSize: "18px",
                  padding: "10px 30px",
                  borderRadius: "25px",
                }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
