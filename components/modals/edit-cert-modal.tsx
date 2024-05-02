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
import toast from "react-hot-toast";
import { editCertModalState } from "@/store/edit-cert-modal-state";

const formSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  issuer: z.string().optional(),
  verifyUrl: z.string().url().optional(),
});

const EditCertModal = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const modal = editCertModalState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const saveRes = await fetch("/api/cert/update", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const savedData = await saveRes.json();

      if (saveRes.status != 200) throw new Error(savedData.message);

      toast.success(`Success: Minted but it will take some time to sync`);
      router.back();
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog
      open={modal.isOpen}
      onOpenChange={() => {
        modal.onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader className="flex justify-between items-center flex-row">
          <AlertDialogTitle>Edit Cert</AlertDialogTitle>

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

                  <Button
                    disabled={loading}
                    type="submit"
                    variant={"blue"}
                    className="w-full"
                  >
                    {loading ? "Saving..." : "Save"}
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

export default EditCertModal;
