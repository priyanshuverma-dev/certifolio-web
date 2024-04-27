"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React from "react";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { MdOutlineLogout } from "react-icons/md";
import useCurrentUser from "@/hooks/use-current-user";
import { AiTwotoneEdit } from "react-icons/ai";
import { FormType, settingsModalState } from "@/store/settings-form-state";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { logoutModalState } from "@/store/logout-modal-state";

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username cannot exceed 32 characters" })
    .regex(/^\w+$/, {
      message:
        "Username must contain only alphanumeric characters and underscores",
    }),
  email: z.string().email({
    message: "Email must be valid",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

const AccountSettingsForm = ({
  userData,
}: {
  userData: {
    data?: User;
    error: any;
  };
}) => {
  const logoutModal = logoutModalState();

  const modal = settingsModalState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      username: "",
      password: "********",
    },
  });

  if (form.getValues().username === "") {
    form.reset({
      email: userData?.data!.email || "",
      username:
        userData?.data!.lastUsernameChangedAt == null
          ? "Set your username"
          : userData?.data!.username,
    });
  }

  return (
    <div className="flex flex-col">
      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="loading" {...field} disabled />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-2"
                      onClick={() =>
                        modal.onOpen(
                          "username",
                          FormType.Account,
                          userData?.data!.lastUsernameChangedAt == null
                            ? ""
                            : userData?.data!.username
                        )
                      }
                    >
                      <AiTwotoneEdit />
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="loading" {...field} disabled />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex justify-between border-2 border-destructive/55 rounded-md p-2 my-4">
        <div className="space-y-0.5 flex flex-col">
          <Label className="text-destructive font-bold leading-6">Logout</Label>
          <p className="text-destructive/75  text-xs">
            Logout from your account.
          </p>
        </div>
        <Button variant={"destructive"} onClick={() => logoutModal.onOpen()}>
          <MdOutlineLogout />
        </Button>
      </div>
    </div>
  );
};

export default AccountSettingsForm;
