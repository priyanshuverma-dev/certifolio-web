"use client";

import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  user: User;
};

export const ProfileDetails = ({ user }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-start py-2">
        <Avatar className="w-28 h-28 rounded-full mr-3 shadow">
          <AvatarImage src={user?.image ?? ""} />
          <AvatarFallback>{user?.name?.at(0)}</AvatarFallback>
        </Avatar>
        <div className="py-2">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {user?.name}
          </h2>
          <p className="text-muted-foreground">@{user?.username}</p>
          <p className="text-sm text-muted-foreground">{user?.bio}</p>
        </div>
      </div>
      <div>
        <p className="text-muted-foreground">
          📅 Joined on {moment(user?.createdAt).fromNow()}
        </p>
        <p className="text-muted-foreground leading-6">
          Total Public Certificates: {user?.totalCertificates}
        </p>
      </div>
    </div>
  );
};
