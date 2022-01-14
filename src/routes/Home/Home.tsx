import React from "react";
import Card from "../../components/Card/Card";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <HeroBanner />
      <div className="pl-14 flex gap-6 flex-wrap">
        {Array(10)
          .fill(0)
          .map((el, i) => (
            <Card key={i} details={i} />
          ))}
      </div>
    </div>
  );
};

export default Home;
