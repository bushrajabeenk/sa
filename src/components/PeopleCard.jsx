import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const PeopleCard = (el) => {
  let charArr = JSON.parse(localStorage.getItem("charName")) || [];

  const postToLocalStorage = () => {
    charArr.push(el.name);
    localStorage.setItem("charName", JSON.stringify(charArr));
  };

  return (
    <Flex>
      <Container maxW="550px" bg="blue">
        <Box p="4" bg="yellow.400">
          <Link state={el} to={`/people/${el.name}`}>
            <Text fontSize="20px" fontWeight="bold">{el.name}</Text>
          </Link>
        </Box>
        <Box p="4" bg="yellow.400" color="white">
          <Button bg="blue" onClick={postToLocalStorage}>
            Add to Favourites
          </Button>
        </Box>
      </Container>
    </Flex>
  );
};

export default PeopleCard;
