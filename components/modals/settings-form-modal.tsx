"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { settingsModalState } from "@/store/settings-form-state";
import { Switch } from "../ui/switch";

const SettingsFormModal = () => {
  const modal = settingsModalState();
  const toEdit = modal.toEdit;
  const prevValue = modal.prevValue;

  const [value, setValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const onSubmit = async () => {
    try {
      if (!value) return;
      setIsLoading(true);
      const res = await fetch(`/api/settings/${modal.formType}/${toEdit}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value }),
      });

      const data = await res.json();
      if (res.status != 200) throw new Error(data.message);

      toast({
        title: `${toEdit} edited successfully`,
        description: `Your ${toEdit} changes will be reflected soon.`,
        variant: "default",
      });

      modal.onClose();
    } catch (error: any) {
      toast({
        title: `Error in editing ${toEdit}`,
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog
      open={modal.isOpen}
      onOpenChange={() => {
        modal.onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit {toEdit}</AlertDialogTitle>
          <AlertDialogDescription>
            Edit your {toEdit} here
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          {toEdit === "bio" ? (
            <>
              <Textarea
                disabled={isLoading}
                onChange={(e) => setValue(e.target.value)}
                defaultValue={prevValue}
              />
            </>
          ) : toEdit === "private" ? (
            <>
              <div className="flex justify-between border-2 border-muted rounded-md p-2">
                <div className="space-y-0.5 flex flex-col">
                  <Label>Private Profile</Label>
                  <p className="text-muted-foreground text-xs">
                    Private your profile from public view.
                  </p>
                </div>
                <Switch
                  defaultChecked={prevValue === "true" ? true : false}
                  disabled={isLoading}
                  onCheckedChange={(e) => setValue(`${e}`)}
                />
              </div>
            </>
          ) : (
            <>
              <Input
                disabled={isLoading}
                onChange={(e) => setValue(e.target.value)}
                defaultValue={prevValue}
              />
            </>
          )}
          {toEdit === "private" ? null : (
            <Label className="p-1 text-xs text-muted-foreground">
              Enter new {toEdit}.
            </Label>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isLoading}
            type="button"
            onClick={() => {
              modal.onClose();
            }}
          >
            Cancel
          </AlertDialogCancel>
          <Button
            disabled={isLoading || !value}
            onClick={onSubmit}
            type="submit"
          >
            Save
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SettingsFormModal;
