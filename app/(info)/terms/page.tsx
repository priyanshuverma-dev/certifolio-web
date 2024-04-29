import CenterContainer from "@/components/center-container";
import Footer from "@/components/landing/footer";
import React from "react";

const TermsPage = () => {
  return (
    <>
      <CenterContainer className="min-h-[90vh]">
        <h2 className="text-4xl font-bold p-2">Terms and Conditions</h2>

        <p className="text-xl p-2">
          We are working on the Terms and Conditions for the website. Please
          check back later.
        </p>
        <h2 className="font-bold text-3xl p-2">Contact Us</h2>
        <p className="p-2">
          If you have any questions about these Terms and Conditions, You can
          contact us:
        </p>
        <ul className="p-2">
          <li>By email: priyanshuverma@outlook.in</li>
        </ul>
      </CenterContainer>
      <Footer />
    </>
  );
};

export default TermsPage;
