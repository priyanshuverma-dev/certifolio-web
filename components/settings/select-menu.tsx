"use client";
import React, { ChangeEvent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

type Props = {};

const SettingsType = z.enum(["Profile", "Account", "Theme"]);

function SelectMenu({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selected = searchParams.get("selected") || SettingsType.Values.Profile;

  const onSelect = (v: string) => {
    // now you got a read/write object
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    // update as necessary
    const value = v.trim();

    if (!value) {
      current.delete("selected");
    } else {
      current.set("selected", value);
    }

    // cast to string
    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <Select value={selected} onValueChange={onSelect}>
      <SelectTrigger className="w-full mx-2">
        <SelectValue
          placeholder="Profile"
          defaultValue={SettingsType.Values.Profile}
        />
      </SelectTrigger>
      <SelectContent className="">
        {SettingsType.options.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectMenu;
