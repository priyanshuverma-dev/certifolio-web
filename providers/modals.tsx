"use client";

import LogoutConfirmationModal from "@/components/modals/logout-modal";
import SettingsFormModal from "@/components/modals/settings-form-modal";
import React, { useEffect, useState } from "react";

const ModalsProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <LogoutConfirmationModal />
      <SettingsFormModal />
      {/* <AccountEditModal /> */}
    </>
  );
};

export default ModalsProvider;
