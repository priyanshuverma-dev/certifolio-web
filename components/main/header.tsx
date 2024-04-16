import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type Props = {
  showSettings?: boolean;
};

const MainHeader = ({ showSettings = true }: Props) => {
  return (
    <header className="flex items-center justify-between p-4">
      <aside className="flex items-center gap-[2px]">
        <p className="text-3xl font-bold">Certi</p>
        <Image
          src="/images/f.png"
          alt="f"
          width={15}
          height={15}
          className="shadow-sm"
        />
        <p className="text-3xl font-bold">lio</p>
      </aside>
      <div>
        {showSettings && (
          <Link href={"/main/settings"}>
            <Settings
              size={24}
              className="hover:text-gray-100 transition-colors"
            />
          </Link>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
