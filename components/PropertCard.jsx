import Link from "next/link";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from "react-icons/fa";
const PropertCard = ({ property }) => {
  return (
    <div className="rounded-xl shadow-md relative">
      <img
        src={"images/properties/" + property.images[0]}
        alt=""
        className="w-full h-auto rounded-t-xl"
      />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold"> {property.name} </h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          $
          {(property.rates.monthly && property.rates.monthly + "/mo") ||
            property.rates.weekly + "/wk"}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p className="flex items-center gap-1">
            <FaBed /> {property.beds}
            <span className="md:hidden lg:inline"> Beds</span>
          </p>
          <p className="flex items-center gap-1">
            <FaBath /> {property.baths}
            <span className="md:hidden lg:inline"> Baths</span>
          </p>
          <p className="flex items-center gap-1">
            <FaRulerCombined />
            {property.square_feet}{" "}
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {property.rates.weekly && (
            <p className="flex items-center gap-1">
              <FaMoneyBill /> Weekly
            </p>
          )}
          {property.rates.monthly && (
            <p className="flex items-center gap-1">
              <FaMoneyBill /> Monthly
            </p>
          )}
          {property.rates.nightly && (
            <p className="flex items-center gap-1">
              <FaMoneyBill /> Nightly
            </p>
          )}
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex items-center align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className="text-orange-700" />
            <span className="text-orange-700">
              {" "}
              {property.location.city} {property.location.state}{" "}
            </span>
          </div>
          <Link
            href="/property"
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertCard;
