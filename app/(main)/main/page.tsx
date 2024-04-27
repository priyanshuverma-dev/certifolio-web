import AddCredentialSection from "@/components/add-credential-section";
import CenterContainer from "@/components/center-container";
import FeedSection from "@/components/main/feed-list";
import MainHeader from "@/components/main/header";
import UserProfile from "@/components/main/user-profile";
import { Separator } from "@/components/ui/separator";
import UsernameNotify from "@/components/username-notify";

export default function Home() {
  return (
    <CenterContainer>
      <div className="flex flex-col mx-2 h-full">
        <UsernameNotify />
        <MainHeader />
        <Separator />
        <UserProfile />
        <AddCredentialSection />
        <Separator />
        <FeedSection />
      </div>
    </CenterContainer>
  );
}
