import Link from "next/link";
import Hero from "../components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperties";
import connectDB from "@/config/db";

const HomePage = async () => {

  await connectDB();

  return (
    <div>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </div>
  );
};

export default HomePage;
