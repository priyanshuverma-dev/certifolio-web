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
import { FormType, settingsModalState } from "@/store/settings-form-state";
import { Switch } from "../ui/switch";

const formSchema = z.object({
  image: z.string(),
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  bio: z
    .string()
    .max(256, {
      message: "Bio must be less than 256 characters.",
    })
    .optional(),
  private: z.boolean().default(false).optional(),
});

const ProfileSettingsForm = ({
  userData,
}: {
  userData: {
    status: "success" | "error" | "pending";
    data?: User;
    error: any;
  };
}) => {
  const modal = settingsModalState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      image: "",
      name: "",
      bio: "",
    },
  });

  if (userData.status == "success" && form.getValues().name === "") {
    form.reset({
      image: userData?.data!.image || "",
      name: userData?.data!.name || "",
      bio: userData?.data!.bio || "",
      private: userData?.data!.private,
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="image"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <div className="relative h-20 w-20">
                  <Image
                    fill
                    src={field.value}
                    alt="Profile Image"
                    className="rounded-full"
                  />
                  <button
                    disabled
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                    type="button"
                  >
                    <AiTwotoneEdit className="h-4 w-4" />
                  </button>
                </div>
              </FormControl>
              <FormDescription>This is your public name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input placeholder="loading" {...field} disabled />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-2"
                    onClick={() =>
                      modal.onOpen(field.name, FormType.Profile, field.value)
                    }
                  >
                    <AiTwotoneEdit />
                  </button>
                </div>
              </FormControl>
              <FormDescription>This is your public name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biography</FormLabel>
              <FormControl>
                <div className="relative">
                  <Textarea placeholder="" rows={3} {...field} disabled />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-2"
                    onClick={() =>
                      modal.onOpen(field.name, FormType.Profile, field.value)
                    }
                  >
                    <AiTwotoneEdit />
                  </button>
                </div>
              </FormControl>
              <FormDescription>This is your public bio.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="private"
          render={({ field }) => (
            <FormItem
              onClick={() =>
                modal.onOpen(field.name, FormType.Profile, `${field.value}`)
              }
              className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
            >
              <div className="space-y-0.5">
                <FormLabel>Private Profile</FormLabel>
                <FormDescription>
                  Private your profile from public view.
                </FormDescription>
              </div>
              <FormControl>
                <Switch disabled checked={field.value} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ProfileSettingsForm;
