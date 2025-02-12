import React from "react";
import { Link } from "react-router-dom";
import { Bar, Doughnut } from "react-chartjs-2"; // Chart components
import "chart.js/auto"; // Chart.js for visualization
import "./Home.css";

const Home = ({ products }) => {
  // Extract unique categories
  const categories = [...new Set(products.map((p) => p.category))];

  // Sample user count (You can replace with real data)
  const totalUsers = 1200;

  // Sample sales data for bar chart (Replace with real sales data)
  const salesData = {
    labels: categories,
    datasets: [
      {
        label: "Sales per Category",
        data: categories.map(() => Math.floor(Math.random() * 500)), // Dummy sales data
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  // Category distribution for doughnut chart
  const categoryData = {
    labels: categories,
    datasets: [
      {
        data: categories.map(() => Math.floor(Math.random() * 100)), // Dummy category count
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#8E44AD"],
      },
    ],
  };

  return (
    <div className="dashboard">
      {/* Overview Cards */}
      <div className="overview">
        <div className="card">
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>
        <div className="card">
          <h3>Total Categories</h3>
          <p>{categories.length}</p>
        </div>
        <div className="card">
          <h3>Registered Users</h3>
          <p>{totalUsers}</p>
        </div>
      </div>

      {/* Charts Section */}
      
  <div className="charts">
    <div className="chart-box">
      <h3>Sales by Category</h3>
      <Bar data={salesData} />
    </div>
    <div className="chart-box">
      <h3>Category Distribution</h3>
      <Doughnut data={categoryData} />
    </div>
  </div>


      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Recent Products</h2>
        <div className="product-grid">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} className="product-image" />
              <h3>{product.title}</h3>
              <p>${product.price.toFixed(2)}</p>
              <Link to={`/product/${product.id}`} className="view-details-button">View Details</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
