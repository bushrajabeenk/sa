import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const PeopleCard = (el) => {
  const toast = useToast();
  const position = ["top"];
  let charArr = JSON.parse(localStorage.getItem("charName")) || [];

  const postToLocalStorage = () => {
    let btn = document.getElementById("btn");
    btn.style.backgroundColor = "white";
    btn.style.color = "gray";
    charArr.push(el.name);
    localStorage.setItem("charName", JSON.stringify(charArr));
  };

  return (
    <Flex>
      <Container maxW="550px" bg="blue">
        <Box p="4" bg="yellow.400">
          <Link state={el} to={`/people/${el.name}`}>
            <Text fontSize="20px" fontWeight="bold">
              {el.name}
            </Text>
          </Link>
        </Box>
        <Box p="4" bg="yellow.400" color="white">
          <Button
            id="btn"
            bg="blue"
            onClick={() => {
              postToLocalStorage();
              toast({
                title: `Added to Favorites`,
                position: position,
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            }}
          >
            Add to Favourites
          </Button>
        </Box>
      </Container>
    </Flex>
  );
};

export default PeopleCard;
