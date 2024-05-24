import {
  TwitterShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";
import {
  TwitterIcon,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

function ShareProperty({ property }) {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}properties/${property.id}`;
  return (
    <>
      <div>
        <div className=" text-black font-bold text-center text-lg w-full py-2 px-4">
          Share This Property
        </div>
        <div className="flex items-center justify-center space-x-4 ">
          <TwitterShareButton
            url={url}
            title={property.name}
            hashtags={["property", "realestate"]}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <FacebookShareButton url={url} title={property.name}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <WhatsappShareButton url={url} title={property.name} separator=":: ">
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <EmailShareButton url={url} title={property.name}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      </div>
    </>
  );
}

export default ShareProperty;
