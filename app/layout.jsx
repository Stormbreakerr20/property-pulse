import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// For html meta-data
export const metadata = {
  title: "Property Pulse | Find the Perfect Home",
  description:
    "Property Pulse is the best place to find your dream home. We have a wide range of properties available for sale and rent. Find your perfect home today",
};

const MainLayout = ({ children }) => {
  return (
    <>
      <html lang="en">
        <body>
          <Navbar />
          <main>
            <div className="main-layout">{children}</div>
          </main>
          <Footer />
        </body>
      </html>
    </>
  );
};

export default MainLayout;
