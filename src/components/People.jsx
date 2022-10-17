import {
  Box,
  Button,
  Container,
  Flex,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PeopleCard from "./PeopleCard";

const People = () => {
  const [character, setCharacter] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(null);

  useEffect(() => {
    getPeople();
  }, [page]);

  const getPeople = async () => {
    await axios
      .get(`https://swapi.dev/api/people/?page=${page}`)
      .then((res) => {
        if (res.data.next !== null) {
          let ppl = res.data.results;
          let cnt = res.data.count;
          setCount(cnt);
          setCharacter(ppl);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <VStack bg="black" padding="40px">
      <Text fontSize="50px" fontWeight="bold" color="blue" p="20px">
        STAR WARS
      </Text>
      <Spacer />
      <Spacer />
      <Flex>
        <Box p="4" bg="yellow.400">
          <Button
            bg="blue"
            color="white"
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          >
            Prev
          </Button>
        </Box>
        <Spacer />
        <Box p="4" bg="yellow.400">
          <Button
            bg="blue"
            color="white"
            onClick={() => {
              if (page < Math.floor(count / page)) {
                setPage(page + 1);
              }
            }}
          >
            Next
          </Button>
        </Box>
      </Flex>
      <Spacer />
      <Spacer />
      <Container maxW="550px" bg="blue" color="white">
        {character.map((el, i) => {
          return (
            <Text key={i}>
              <PeopleCard {...el} fav={false} />
            </Text>
          );
        })}
      </Container>
    </VStack>
  );
};

export default People;
