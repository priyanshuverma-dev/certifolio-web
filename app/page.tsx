import { auth } from "@/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  return (
    <div className="h-screen">
      <div className="flex items-center justify-center h-full">
        Email: {session?.user?.email}
      </div>
    </div>
  );
}
