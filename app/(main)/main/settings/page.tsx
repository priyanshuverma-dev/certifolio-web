import CenterContainer from "@/components/center-container";
import MainHeader from "@/components/main/header";
import AccountSettingsForm from "@/components/settings/account-form";
import ProfileSettingsForm from "@/components/settings/profile-form";
import SelectMenu from "@/components/settings/select-menu";

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
        <div className="m-2 py-3">
          {selected === "Profile" && <ProfileSettingsForm />}
          {selected === "Account" && <AccountSettingsForm />}
          {selected === "Theme" && <div>Theme</div>}
        </div>
      </div>
    </CenterContainer>
  );
};

export default Page;
