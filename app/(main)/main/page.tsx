import AddCredentialSection from "@/components/add-credential-section";
import CenterContainer from "@/components/center-container";
import FeedSection from "@/components/feed-section";
import MainHeader from "@/components/main/header";
import UserProfile from "@/components/main/user-profile";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <CenterContainer>
      <div className="flex flex-col mx-2 h-full">
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
