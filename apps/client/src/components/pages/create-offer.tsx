import CreateOfferForm from "@components/common/create-offer-form";
import Header from "@components/common/header";
import { Page, PageContent } from "../common/layout";

function CreateOfferPage() {
  return (
    <Page>
      <Header />
      <PageContent>
        <CreateOfferForm />
      </PageContent>
    </Page>
  );
}

export default CreateOfferPage;