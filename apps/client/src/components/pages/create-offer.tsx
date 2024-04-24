import CreateOfferForm from "@components/common/create-offer-form";
import Header from "@components/common/header";
import { Page, PageContent } from "../common/layout";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "src/providers/user-context";
import Footer from "@components/common/footer";

function CreateOfferPage() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userContext.user) {
      navigate('/auth?from=create-offer');
    }
  });

  return (
    <Page>
      <Header />
      <PageContent>
        <CreateOfferForm />
      </PageContent>
      <Footer />
    </Page>
  );
}

export default CreateOfferPage;