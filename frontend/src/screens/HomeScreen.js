import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Product from "../components/Product.js";
import { listProducts } from "../actions/productActions";
import { Row, Col } from "react-bootstrap";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  // select the productList stat from store state
  const productList = useSelector((state) => state.productList);
  const { loading, products, error, page, pages } = productList;

  // dispatching the list product action in use use effect
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link className="btn btn-light bold"> Go Back</Link>
      )}
      <h1 className="mt-4">Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product, index) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            page={page}
            pages={pages}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
