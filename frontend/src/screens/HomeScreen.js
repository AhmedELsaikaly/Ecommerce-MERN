import React, { useState, useEffect } from "react";
// import products from "../products";
import axios from "axios";
import Product from "../components/Product.js";
import { Row, Col } from "react-bootstrap";
const HomeScreen = () => {
  const [products, seProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      seProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product, index) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
