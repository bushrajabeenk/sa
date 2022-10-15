import { Box, Container, Flex, Spacer, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

const PeopleDetails = () => {
  const [pplDet, setPplDet] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const { state } = location;

  let title = [];

  useEffect(() => {
    setLoading(false);
    getPplDetails();
  }, []);

  const getPplDetails = async () => {
    await axios
      .get(`${state.url}`)
      .then((res) => {
        setPplDet(res.data);
        let movies = res.data.films;
        for (let i = 0; i < movies.length; i++) {
          axios
            .get(`${movies[i]}`)
            .then((res) => {
              let tit = res.data.title;
              title.push(tit);
              console.log(title);
              setMovies([...title]);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="lg"
        />
      ) : (
        <VStack height="100vh" bg="black" p="40px">
          <Text fontSize="50px" fontWeight="bold" color="blue" p="20px">
            STAR WARS
          </Text>
          <Flex gap={4}>
            <Container
              fontWeight="bold"
              fontSize="15px"
              maxW="550px"
              bg="blue"
              p="20px"
              color="white"
            >
              <Text fontSize="25px" fontWeight="bold" color="black" p="20px">
                CHARACTER DETAILS
              </Text>
              <Box>
                <VStack fontSize="20px" p="20px">
                  <Text>NAME: {pplDet.name}</Text>
                  <Text>BIRTH YEAR: {pplDet.birth_year}</Text>
                  <Text>EYE COLOR: {pplDet.eye_color}</Text>
                  <Text>GENDER: {pplDet.gender}</Text>
                  <Text>HAIR COLOR: {pplDet.hair_color}</Text>
                  <Text>HEIGHT: {pplDet.height}</Text>
                  <Text>MASS: {pplDet.mass}</Text>
                  <Text>SKIN COLOR: {pplDet.skin_color}</Text>
                </VStack>
              </Box>
            </Container>
            <Spacer />
            <Container
              fontWeight="bold"
              fontSize="15px"
              maxW="550px"
              bg="blue"
              p="50px"
              color="white"
            >
              <Text fontSize="25px" fontWeight="bold" color="black" p="20px">
                MOVIES APPEARED
              </Text>
              <Box fontSize="20px" p="20px">
                <Text>
                  {movies.map((el) => (
                    <div>{el}</div>
                  ))}
                </Text>
              </Box>
            </Container>
          </Flex>
        </VStack>
      )}
    </>
  );
};

export default PeopleDetails;
