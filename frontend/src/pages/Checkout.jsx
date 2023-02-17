import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export const Checkout = ({ total }) => {
  const [state, setState] = useState({
    address: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  //payment route..
  const handleRazorpay = (data) => {
    const option = {
      key: "rzp_test_tcbbwJBuwVwpT3",
      amount: Number(data.amount),
      currency: data.currency,
      name: "Product Payment",
      description: "test transaction",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/5a/Zee5-official-logo.jpeg",
      order_id: data.id,
      handler: function (response) {
        alert("Your Payment Successful");
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        axios
          .post("https://vowelweb-in.onrender.com/verify", { response: response })
          .then((res) => {
            toast({
              title: "Your Order Placed by VowelWeb.in",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
            // your orders succeful redirect to home page
          })
          .catch((err) => {
            console.log(err);
          });
      },
    };

    const rzp = new window.Razorpay(option);
    rzp.open();
  };

  const Payment = (amount) => {
    const data = { amount: amount };
    axios
      .post("https://vowelweb-in.onrender.com/orders", data)
      .then((res) => {
        console.log(res.data, "29");
        handleRazorpay(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!state.address || !state.mobile) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    } else {
      Payment(total);
      setLoading(false);
      return;
    }
  };
  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <>
      <Box
        textAlign={"center"}
        w={"25%"}
        m="auto"
        h={"10v"}
        mt={"30px"}
        p={5}
        borderRadius="15px"
        boxShadow=" rgba(0, 0, 0, 0.35) 0px 5px 15px"
      >
        <Text fontSize={"2xl"} color="#0A0103" fontWeight="bold">
          Checkout
        </Text>
        <VStack spacing="5px">
          <FormControl id="address" isRequired>
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              type="address"
              placeholder="Enter Address"
              onChange={hanldeChange}
            />
          </FormControl>
          <FormControl id="mobile" isRequired>
            <FormLabel>Mobile No</FormLabel>
            <Input
              name="mobile"
              type="number"
              placeholder="Enter Mobile No"
              onChange={hanldeChange}
            />
          </FormControl>
          <FormControl id="payment" isRequired>
            <FormLabel>Amount</FormLabel>
            <Button fontSize={"20px"}>{total} Rs.</Button>
          </FormControl>
          <Button
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={handleSubmit}
            // onClick={() => Payment(total)}
          >
            {loading === true ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="md"
              />
            ) : (
              "Pay Now"
            )}
          </Button>
          <Stack pt={2}>
            <Text align={"center"} display="flex" flexDirection={"row"}>
              Please verify your details are correct ?
            </Text>
          </Stack>
        </VStack>
      </Box>
    </>
  );
};
