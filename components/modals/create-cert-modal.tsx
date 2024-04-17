"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import FileUpload from "../file-upload";
import { NFT_ENDPOINT, NFT_STORAGE_TOKEN } from "@/lib/ipfs";
import { X } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const formSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  issuer: z.string().optional(),
  verifyUrl: z.string().url().optional(),
  image: z.custom(
    (value) => {
      // Check if File is available (browser environment)
      if (typeof File !== "undefined" && value instanceof File) {
        return true; // Valid File instance
      } else {
        return false; // Not a valid File instance
      }
    },
    {
      message: "Select the image",
    }
  ),
});

const DetailsType = z.enum(["basic", "optional"]);

type DetailsControl = {
  basicDetailsIsOpen: boolean;
  optionalDetailsIsOpen: boolean;
};

const CreateCertModal = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const selectedImage = event.target.files[0];
      form.setValue("image", selectedImage);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      if (values.image == null) {
        form.setError("image", {
          message: "Select Image",
        });
        return;
      }

      const i = await values.image.arrayBuffer();

      const res = await fetch(`${NFT_ENDPOINT}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${NFT_STORAGE_TOKEN}`,
          "content-type": "images/*",
        },
        body: i,
      });

      const data = await res.json();

      if (res.status != 200) throw new Error(data.error.message);

      const cid = data.value.cid;
      const size = data.value.size;

      const saveRes = await fetch("/api/mint", {
        method: "POST",
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          issuer: values.issuer,
          verifyUrl: values.verifyUrl,
          cid: cid,
          size: size,
        }),
      });

      const savedData = await saveRes.json();
      if (res.status !== 200) throw new Error(savedData.message);
      toast({
        title: `Success: ${savedData.message}`,
        description: "Minted but it will take some time to sync.",
      });
      router.back();
    } catch (error: any) {
      toast({
        title: "Error: Minting Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog open onOpenChange={(open) => !open && router.back()}>
      <AlertDialogContent>
        <AlertDialogHeader className="flex justify-between items-center flex-row">
          <AlertDialogTitle>Mint new</AlertDialogTitle>

          <AlertDialogCancel
            disabled={loading}
            className="border-none p-1 rounded-full"
          >
            <X />
          </AlertDialogCancel>
        </AlertDialogHeader>
        <AlertDialogDescription className="!text-left">
          <ScrollArea className="py-2 px-4 h-96 overflow-y-auto scroll-smooth">
            <ScrollBar />
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    disabled={loading}
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FileUpload
                            disabled={loading}
                            onChange={field.onChange}
                            value={field.value}
                          >
                            <Input
                              type="file"
                              accept="image/*"
                              className="w-min"
                              multiple={false}
                              disabled={loading}
                              onChange={handleImageChange}
                            />
                          </FileUpload>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    disabled={loading}
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certificate Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Data Science Certificate"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <details>
                    <summary className="text-lg font-semibold">
                      Additional Details
                    </summary>
                    <FormField
                      disabled={loading}
                      control={form.control}
                      name="issuer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issuer</FormLabel>

                          <FormControl>
                            <Input placeholder="Ex. Google Cloud" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      disabled={loading}
                      control={form.control}
                      name="verifyUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Verify URL</FormLabel>

                          <FormControl>
                            <Input
                              placeholder="https://verify.example.com/123"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      disabled={loading}
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input placeholder="Cert is about.." {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </details>

                  <Button
                    disabled={loading}
                    type="submit"
                    variant={"blue"}
                    className="w-full"
                  >
                    {loading ? "Minting..." : "Mint now"}
                  </Button>
                </form>
              </Form>
            </div>
          </ScrollArea>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateCertModal;
