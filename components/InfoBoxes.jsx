import InfoBox from "./InfoBox";
const InfoBoxes = () => {
  return (
    <section>
    <div class="container-xl lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">   
        <InfoBox
            heading="For Renters"
            buttonInfo={{
                text: 'Browse Properties',
                link: '/properties',
                backgroundColor: 'bg-black'
            }}
        >
            {/* Children */}
            Find the perfect rental property that suits your needs.
        </InfoBox>

        <InfoBox
            heading="For Property Owners"
            backgroundColor="bg-blue-100"
            buttonInfo={{
                text: 'Add Property',
                link: '/properties/add',
                backgroundColor: 'bg-blue-600'
            }}
        >
            {/* Children */}
            List your property and start earning rental income.
        </InfoBox>

      </div>
    </div>
  </section>
  );
};

export default InfoBoxes;
