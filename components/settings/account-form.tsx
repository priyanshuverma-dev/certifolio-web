"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React from "react";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import useCurrentUser from "@/hooks/use-current-user";
import { Textarea } from "../ui/textarea";
import { AiTwotoneEdit } from "react-icons/ai";
import Image from "next/image";
import { settingsModalState } from "@/store/settings-form-state";
import Link from "next/link";

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

const AccountSettingsForm = () => {
  const userData = useCurrentUser();

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

  if (userData.status == "success" && form.getValues().username === "") {
    form.reset({
      email: userData?.data!.email || "",
      username: `${userData?.data!.username || ""}`,
    });
  }

  return (
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
                      modal.onOpen("username", userData.data?.username)
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
  );
};

export default AccountSettingsForm;
