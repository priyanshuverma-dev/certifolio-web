import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { logoutModalState } from "@/store/logout-modal-state";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const LogoutConfirmationModal = () => {
  const modal = logoutModalState();

  return (
    <AlertDialog
      open={modal.isOpen}
      onOpenChange={() => {
        modal.onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will logout you. But you can log in again
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              signOut({
                callbackUrl: "/",
              });
              toast("Logged out");
            }}
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutConfirmationModal;
