"use client";
import CreateCertModal from "@/components/modals/create-cert-modal";
import { useEffect, useState } from "react";

const NewCert = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <CreateCertModal />
    </div>
  );
};

export default NewCert;
