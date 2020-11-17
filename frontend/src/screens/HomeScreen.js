import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product.js";
import { listProducts } from "../actions/productActions";
import { Row, Col } from "react-bootstrap";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
const HomeScreen = () => {
  const dispatch = useDispatch();
  // select the productList stat from store state
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  // dispatching the list product action in use use effect
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <Row>
          {products.map((product, index) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
