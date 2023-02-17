import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export const Create = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    url: "",
    title: "",
    price: "",
  });

  const toast = useToast();

  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  //this is the admin route for adding the product on site..
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!state.url || !state.title || !state.price) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    try {
      //admin product request..
      const data = await axios.post(
        "https://vowelweb-in.onrender.com/product/add",
        state,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (data.status) {
        toast({
          title: "Product Added Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (e) {
      toast({
        title: "Invalid Credentials!",
        description: e.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    setLoading(false);
  };
  return (
    <>
      <Text
        fontSize={40}
        color="#0A0103"
        fontWeight="bold"
        textAlign={"center"}
      >
        VOWELweb.in
      </Text>
      <Box
        textAlign={"center"}
        w={"30%"}
        m="auto"
        mt={"20px"}
        p={5}
        borderRadius="15px"
        boxShadow=" rgba(0, 0, 0, 0.35) 0px 5px 15px"
      >
        <Text fontSize={"2xl"} color="#0A0103" fontWeight="bold">
          Add Product
        </Text>
        <VStack spacing="5px">
          <FormControl id="url" isRequired>
            <FormLabel>Image Url</FormLabel>
            <Input
              name="url"
              type="text"
              placeholder="Enter Image Url"
              onChange={hanldeChange}
            />
          </FormControl>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              type="text"
              placeholder="Enter Title"
              onChange={hanldeChange}
            />
          </FormControl>
          <FormControl id="price" isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              name="price"
              type="text"
              placeholder="Enter Price"
              onChange={hanldeChange}
            />
          </FormControl>

          <Button
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={handleSubmit}
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
              "Submit"
            )}
          </Button>
        </VStack>
      </Box>
    </>
  );
};
