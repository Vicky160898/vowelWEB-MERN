import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
export const Home = () => {
  const [state, setState] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  let UserToken = localStorage.getItem("userToken");
  if (!UserToken) {
    navigate("/login");
  }
  //here getting all the product..
  useEffect(() => {
    axios
      .get("https://vowelweb-in.onrender.com/product/")
      .then((res) => setState(res.data));
  }, []);

  //here we adding the product into cart..
  const AddtoCart = (e) => {
    axios
      .post("https://vowelweb-in.onrender.com/product/cart", e)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    toast({
      title: "Product added successfully!!",
      description: "Product added successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <>
      <div id="first">
        {state?.map((el, i) => (
          <div key={el._id}>
            <img src={el.url} alt={el.title} />
            <h3>{el.title}</h3>
            <h2> Price:- {`$${el.price}`}</h2>
            <Button
              bg="blue.500"
              color={"white"}
              mt={"10px"}
              onClick={() => AddtoCart(el)}
            >
              Add To Cart
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};
