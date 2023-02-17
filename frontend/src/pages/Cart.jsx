import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Checkout } from "./Checkout";

export const Cart = () => {
  const [state, setState] = useState([]);
  let qty=document.querySelectorAll(".qty").innerText

  //here getting all the product..
  useEffect(() => {
    axios
      .get("https://vowelweb-in.onrender.com/product/cart")
      .then((res) => setState(res.data));
  }, []);

  const setQuantity = async (c, id) => {
    let a = state.map((el, i) => {
      if (id === el._id) {
        el.quantity = el.quantity + c;
      }
      return el;
    });
    setState(a);
    try {
      axios
        .patch(`https://vowelweb-in.onrender.com/product/qty/${id}`, c)
        .then((res) => setState(res.data));
    } catch (e) {
      console.log(e);
    }
  };

  var total = state.reduce((acc, c) => acc + c.quantity * c.price, 0);
  return (
    <>
    <Checkout total={total}/>
      <div id="first">
        {state?.map((el, i) => (
          <div key={el._id}>
            <img src={el.url} alt={el.title} />
            <h3>{el.title}</h3>
            <h2> Price:- {el.price * el.quantity}</h2>
            <div
              display={"flex"}
              flexDirection="row"
              gap={"8px"}
              marginRight="50px"
            >
              <Button
                bg="blue.500"
                color={"white"}
                mt={"10px"}
                disabled={el.quantity === 1}
                onClick={() => setQuantity(-1, el._id)}
              >
                -
              </Button>
              <Button className="qty" mt={"10px"}>{el.quantity}</Button>
              <Button
                bg="blue.500"
                color={"white"}
                mt={"10px"}
                onClick={() => setQuantity(1, el._id)}
              >
                +
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
