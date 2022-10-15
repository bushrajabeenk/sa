import React from "react";
import PeopleDetails from "../components/PeopleDetails";
import People from "../components/People";
import { Route, Routes } from "react-router-dom";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<People />} />
        <Route path="/people/:id" element={<PeopleDetails />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
