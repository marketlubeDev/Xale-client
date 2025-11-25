import { PageHeader } from "../components/common/PageHeader";
import { PageSectionHeader } from "../components/common/PageSectionHeader";
import { PrimaryButton } from "../components/common/Buttons/PrimaryButton";
import Header from "../shared/layouts/Header";
import Sidebar from "../shared/layouts/Sidebar";
import SecondaryButton from "../components/common/Buttons/SecondaryButton";
import FormInput from "../components/common/FormInput";
import FormTextArea from "../components/common/FormTextArea";
import FormSection from "../components/common/FormSection";
import ToggleCard from "../components/common/ToggleCard";
import { MailIcon } from "../utilities/icons";
import ToggleCardGroup from "../components/common/ToggleCardGroup";

function Addstage() {
  return (
    <div className="flex min-h-screen bg-[#eef3f1]">
      <div className="w-[250px] border-r border-[#e6e8e7] bg-white">
        <Sidebar />
      </div>
      <div className="flex w-full flex-col">
        <Header />

        <main
          className="flex flex-1 flex-col justify-start gap-5"
          style={{ padding: "24px 132px 8px 132px" }}
        >
          <PageHeader
            leftContent={
              <PageSectionHeader
                title="Add Stage"
                description="Create and manage your lead stages, statuses, and sub-statuses used in your pipeline"
              />
            }
            rightContent={
              <>
                <SecondaryButton title="Cancel" onClick={() => {}} />
                <PrimaryButton title="Save Stage" onClick={() => {}} />
              </>
            }
          />

          <FormSection
            title="Basic Details"
            width="w-2/3"
          >
            <FormInput label="Stage Name" placeholder="Enter Stage Name" />
            <FormTextArea
              label="Stage Description"
              placeholder="Enter Stage Description"
            />
          </FormSection>

          <FormSection title="Stage Capabilities" width="w-2/3" description="Enable features to define how this stage behaves."> 
            <ToggleCardGroup columns={3}>
              <ToggleCard
                title="Stage Visible"
                description="Whether the stage is visible to the user"
                checked={true}
                onChange={() => {}}
                icon={<MailIcon color="white" />}
              />
              <ToggleCard
                title="Stage Visible"
                description="Whether the stage is visible to the user"
                checked={true}
                onChange={() => {}}
                icon={<MailIcon color="white" />}
              />
              <ToggleCard
                title="Stage Visible"
                description="Whether the stage is visible to the user"
                checked={true}
                onChange={() => {}}
                icon={<MailIcon color="white" />}
              />
            </ToggleCardGroup>
          </FormSection>
        </main>
      </div>
    </div>
  );
}

export default Addstage;
