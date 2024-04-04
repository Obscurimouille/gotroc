import CreateOfferForm from "@components/commom/create-offer-form";
import Header from "@components/commom/header";

function CreateOfferPage() {
  return (
    <div className="flex flex-col items-center min-h-dvh bg-neutral-100">
      <Header />
      <div className="w-full lg:w-[1000px] h-full ">
        <CreateOfferForm />
      </div>
    </div>
  );
}

export default CreateOfferPage;