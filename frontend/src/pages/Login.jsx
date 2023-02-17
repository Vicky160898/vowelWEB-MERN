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
import { Link, useNavigate } from "react-router-dom";
export const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  //here posting the login request...
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!state.email || !state.password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      let body = {
        email: state.email,
        password: state.password,
      };

      //this a post route for login..
      const data = await axios.post("https://vowelweb-in.onrender.com/api/login", body, {
        headers: {
          "Content-type": "application/json",
        },
      });
      if (data.status && data.data.role === "Admin") {
        toast({
          title: "Admin Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        //here storing the importance info of Admin..
        localStorage.setItem("userToken", data.data.token);
        localStorage.setItem("userName", data.data.name);
        localStorage.setItem("userRole", data.data.role);
        navigate("/admin");
      } else {
        toast({
          title: "Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        //here storing the importance info of User..
        localStorage.setItem("userToken", data.data.token);
        localStorage.setItem("userName", data.data.name);
        localStorage.setItem("userRole", data.data.role);
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      toast({
        title: "Invalid Credentials! OR Singup First!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      //here we are providing the second alter to user..
      setTimeout(() => {
        toast({
          title: "Enter Details Again!",
          description: error.response.data.message,
          status: "info",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }, 3000);
      setLoading(false);
    }
  };
  return (
    <>
      <Text
        fontSize={20}
        color="#0A0103"
        fontWeight="bold"
        textAlign={"center"}
        mt={"20px"}
      >
        Admin Credential email:-admin@gmail.com && Password:-12345
      </Text>
      <Text
        fontSize={40}
        color="#0A0103"
        fontWeight="bold"
        textAlign={"center"}
        mt={"20px"}
      >
        VOWELweb.in
      </Text>
      <Box
        textAlign={"center"}
        w={"30%"}
        m="auto"
        mt={"40px"}
        p={5}
        borderRadius="15px"
        boxShadow=" rgba(0, 0, 0, 0.35) 0px 5px 15px"
      >
        <Text fontSize={"2xl"} color="#0A0103" fontWeight="bold">
          Sign in
        </Text>
        <VStack spacing="5px">
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="Enter Email"
              onChange={hanldeChange}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="Enter Password"
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
              "Sign in"
            )}
          </Button>
          <Stack pt={6}>
            <Text align={"center"} display="flex" flexDirection={"row"}>
              Don't have an account ?
              <Link to="/singup">
                <Text color={"blue"} fontWeight="bold">
                  Sign up
                </Text>
              </Link>
            </Text>
          </Stack>
        </VStack>
      </Box>
    </>
  );
};
