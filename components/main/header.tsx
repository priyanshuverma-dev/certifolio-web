import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type Props = {
  hideSettings?: boolean;
  showGetHandle?: boolean;
};

const MainHeader = ({ hideSettings = false, showGetHandle = false }: Props) => {
  return (
    <header className="flex items-center justify-between p-4">
      <Link href="/main">
        <aside className="flex items-center gap-[2px]">
          <p className="text-3xl font-bold">Certi</p>
          <Image
            src="/images/f.png"
            alt="f"
            is="p"
            itemType="f"
            width={15}
            height={15}
            className="shadow-sm"
          />
          <p className="text-3xl font-bold">lio</p>
        </aside>
      </Link>
      <div>
        {!hideSettings && (
          <Link href={"/main/settings"}>
            <Settings
              size={24}
              className="hover:text-gray-100 transition-colors"
            />
          </Link>
        )}
        {showGetHandle && (
          <Link
            href="/main"
            className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Get Your handle
            </span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
