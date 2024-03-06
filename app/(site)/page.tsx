import AddCredentialSection from "@/components/add-credential-section";
import CenterContainer from "@/components/center-container";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <CenterContainer>
      <div className="flex flex-col mx-2">
        <AddCredentialSection />
        <Separator />
        <div>Hello</div>
      </div>
    </CenterContainer>
  );
}
