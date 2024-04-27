import CenterContainer from "@/components/center-container";
import MainHeader from "@/components/main/header";
import FormSection from "@/components/settings/form-section";
import SelectMenu from "@/components/settings/select-menu";
import Link from "next/link";

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const selected = searchParams.selected || "Profile";

  return (
    <CenterContainer>
      <MainHeader hideSettings />
      <div className="flex justify-center flex-col">
        <div className="flex items-center">
          <SelectMenu />
        </div>
        <FormSection />
        <div>
          <Link href={"/main"}>
            <p className="text-center text-xs text-muted-foreground underline">
              Back to Home
            </p>
          </Link>
        </div>
      </div>
    </CenterContainer>
  );
};

export default Page;
