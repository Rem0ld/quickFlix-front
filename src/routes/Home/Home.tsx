import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import Navbar from "../../components/Navbar/Navbar";

type Video = {
  _id: string;
  name: string;
  location: string;
  ext: string;
};

const Home = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    if (videos.length === 0) {
      (async function getVideos() {
        const response = await fetch("http://localhost:3050/video");
        const result = await response.json();
        setVideos(result.data);
      })();
    }
  }, []);
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <HeroBanner />
      <div className="pl-14 flex gap-6 flex-wrap">
        {videos.map((el, i) => (
          <Card key={i} name={el.name} location={el.location} id={el._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
