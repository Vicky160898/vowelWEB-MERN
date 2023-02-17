import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
export const Admin = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [state, setState] = useState([]);
  const toast = useToast();
  const { id } = useParams();
  const [data, setData] = useState({
    url: "",
    title: "",
    price: "",
  });

  //edit route for admin here admin can edit any info regarding product..
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = await axios.patch(
      `https://vowelweb-in.onrender.com/product/detail/${id}`,
      data
    );
    if (updated.status) {
      toast({
        title: "Product Updated Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    return;
  };

  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  //here only admin can be delete product no one else (delete route)
  const handleDelete = async (id) => {
    let remain = await axios.delete(`https://vowelweb-in.onrender.com/product/${id}`);
    if (remain.status) {
      toast({
        title: "Product Deleted Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    return;
  };

  //here accessing the product on admin panel only admin can this this product..
  useEffect(() => {
    axios
      .get("https://vowelweb-in.onrender.com/product/")
      .then((res) => setState(res.data));
  }, [state]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <FormControl id="url" isRequired>
              <FormLabel>Image Url</FormLabel>
              <Input
                name="url"
                type="text"
                placeholder="Enter Url"
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
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              width="100%"
              style={{ marginTop: 15 }}
              onClick={handleSubmit}
              onClose={onClose}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
              onClick={() => handleDelete(el._id)}
            >
              Delete
            </Button>
            <Link to={`/${el._id}`}>
              <Button
                bg="blue.500"
                color={"white"}
                ml={"5px"}
                mt={"10px"}
                onClick={onOpen}
              >
                Edit
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
