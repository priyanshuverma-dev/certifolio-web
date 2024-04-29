import CenterContainer from "@/components/center-container";
import Footer from "@/components/landing/footer";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

const HowItWorksPage = () => {
  return (
    <>
      <CenterContainer className="h-[80vh]">
        <h1 className="text-4xl leading-6 font-bold p-2 border-b">
          How it Works ⚒
        </h1>
        <p className="text-lg p-2">
          This is a simple website that allows you to mint certificates on the
          IPFS network. You can upload a file, and the website will generate a
          unique id for it. This id is then stored on the database. Remember the
          certificates are not stored on the database, only the id is stored.
          The certificate is stored on the IPFS network. Anyone with the id can
          retrieve the certificate from the IPFS network. The certificate is
          immutable and cannot be altered. If someone tries to alter the
          certificate, the id will not change and we can verify that the
          certificate is altered.
        </p>
        <Separator />
        <p className="text-lg p-2">
          We are using the{" "}
          <Link href="https://nft.storage/" className="text-blue-500">
            NFT.storage
          </Link>{" "}
          service to store the certificates on the IPFS network. You can read
          more about the service{" "}
          <Link href="https://nft.storage/litepaper" className="text-blue-500">
            here
          </Link>
          .
        </p>
      </CenterContainer>
      <Footer />
    </>
  );
};

export default HowItWorksPage;
