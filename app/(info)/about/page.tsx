import CenterContainer from "@/components/center-container";
import Footer from "@/components/landing/footer";
import React from "react";

const AboutPage = () => {
  return (
    <>
      <CenterContainer className="h-[90vh]">
        <h1 className="text-4xl leading-6 font-bold p-2 border-b">About Us</h1>
        <p className="text-lg p-2">
          CertiFolio is a platform where users can securely upload, showcase,
          and verify their certificates and achievements on the InterPlanetary
          File System (IPFS).
        </p>
        <h1 className="text-4xl leading-6 font-bold p-2 border-b">
          Developers
        </h1>
        <p className="text-lg p-2">
          This platform was developed by{" "}
          <a
            href="https://twitter.com/pvdev"
            target="_blank"
            className="text-blue-500"
          >
            Priyanshu Verma
          </a>
          . The source code is currently private. If you want to work with us
          email at{" "}
          <a
            href="mailto:priyanshuverma@outlook.in"
            target="_blank"
            className="text-blue-500"
          >
            priyanshuverma@outlook.in
          </a>
          .
        </p>
      </CenterContainer>
      <Footer />
    </>
  );
};

export default AboutPage;
