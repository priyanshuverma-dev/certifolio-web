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
import { settingsModalState } from "@/store/settings-form-state";
import { Switch } from "../ui/switch";
import toast from "react-hot-toast";

const SettingsFormModal = () => {
  const modal = settingsModalState();
  const toEdit = modal.toEdit;
  const prevValue = modal.prevValue;

  const [value, setValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

      toast.success(`${toEdit} edited successfully. reflect soon`);

      modal.onClose();
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
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
                name={toEdit}
                type="text"
                id={toEdit}
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
