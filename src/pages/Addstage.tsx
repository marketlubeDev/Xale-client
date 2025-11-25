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
import {
  MailIcon,
  PhoneIcon,
  LocationIcon,
  DashboardIcon,
  LeadsIcon,
  ApplicationIcon,
  VisaIcon,
  StageManagementIcon,
  FilterIcon,
  GridIcon,
  ListIcon,
  BoardIcon,
} from "../utilities/icons";
import ToggleCardGroup from "../components/common/ToggleCardGroup";

import ToggleItem from "../components/common/ToggleItem";
import FormSelector from "../components/common/FormSelector";
import IconButton from "../components/common/IconButton";
import IconButtonGrid from "../components/common/IconButtonGrid";
import StatusCard from "../components/status/StatusCard";

function Addstage() {
  const stageCapabilities = [
    {
      id: 1,
      title: "Stage Visible",
      description: "Whether the stage is visible to the user",
      checked: true,
      icon: <MailIcon color="white" />,
    },
    {
      id: 2,
      title: "Stage Visible",
      description: "Whether the stage is visible to the user",
      checked: true,
      icon: <MailIcon color="white" />,
    },
    {
      id: 3,
      title: "Stage Visible",
      description: "Whether the stage is visible to the user",
      checked: true,
      icon: <MailIcon color="white" />,
    },
  ];

  const stageIcons = [
    { id: 1, icon: <MailIcon />, active: false },
    { id: 2, icon: <PhoneIcon />, active: true },
    { id: 3, icon: <LocationIcon />, active: false },
    { id: 4, icon: <DashboardIcon />, active: false },
    { id: 5, icon: <LeadsIcon />, active: false },
    { id: 6, icon: <ApplicationIcon />, active: false },
    { id: 7, icon: <VisaIcon />, active: false },
    { id: 8, icon: <StageManagementIcon />, active: false },
    { id: 9, icon: <FilterIcon />, active: false },
    { id: 10, icon: <GridIcon />, active: false },
    { id: 11, icon: <ListIcon />, active: false },
    { id: 12, icon: <BoardIcon />, active: false },
  ];

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

          <div className="flex gap-5 items-start">
            {/* Left Side  */}
            <div className="flex flex-col gap-5 w-2/3">
              <FormSection title="Basic Details">
                <FormInput label="Stage Name" placeholder="Enter Stage Name" />
                <FormTextArea
                  label="Stage Description"
                  placeholder="Enter Stage Description"
                />
              </FormSection>

              <FormSection
                title="Stage Capabilities"
                description="Enable features to define how this stage behaves."
              >
                <ToggleCardGroup columns={3}>
                  {stageCapabilities.map((capability) => (
                    <ToggleCard
                      key={capability.id}
                      title={capability.title}
                      description={capability.description}
                      checked={capability.checked}
                      onChange={() => {}}
                      icon={capability.icon}
                    />
                  ))}
                </ToggleCardGroup>
              </FormSection>

              <FormSection title="Status Marks">
                <StatusCard
                  statusTitle="Status 1"
                  statusName="Status 1 Name"
                  subStatuses={[
                    { id: 1, name: "Sub Status 1" },
                  ]}
                  onStatusNameChange={() => {}}
                  onSubStatusNameChange={() => {}}
                  onDeleteStatus={() => {}}
                  onDeleteSubStatus={() => {}}
                />
                <StatusCard
                  statusTitle="Status 1"
                  statusName="Status 1 Name"
                  subStatuses={[
                    { id: 1, name: "Sub Status 1" },
                  ]}
                  onStatusNameChange={() => {}}
                  onSubStatusNameChange={() => {}}
                  onDeleteStatus={() => {}}
                  onDeleteSubStatus={() => {}}
                />
              </FormSection>

              <FormSection
                title="Choices"
                description="Define the steps inside this stage and how each step affects the lead"
              >
                <FormInput
                  label="Stage Actions"
                  placeholder="Select Stage Actions"
                  value="1"
                  type="number"
                />

                <ToggleItem
                  title="Allow Custom Name"
                  description="Let users rename a choices when creating it for a lead"
                  checked={true}
                  onChange={() => {}}
                />

                <ToggleItem
                  title="Auto Pause Other Choices"
                  description="Pauses other choices when one qualifies"
                  checked={false}
                  onChange={() => {}}
                  disabled
                />
              </FormSection>
            </div>

            {/* Right Side  */}
            <div className="w-1/3 flex flex-col gap-5">
              <FormSection title="Stage Order">
                <FormInput
                  label="Stage Name"
                  placeholder=""
                  value="1"
                  type="number"
                />
              </FormSection>

              <FormSection title="Status Marks">
                <FormSelector
                  label="Default Qualifying status *"
                  placeholder="Select Status Marks"
                  options={[
                    { value: "1", label: "Choose qualifying sub status" },
                    { value: "2", label: "Failure" },
                    { value: "3", label: "Pending" },
                  ]}
                  value="1"
                />

                <FormSelector
                  label="Rejection status"
                  placeholder="Select Status Marks"
                  options={[
                    { value: "1", label: "Choose qualifying sub status" },
                    { value: "2", label: "Failure" },
                    { value: "3", label: "Pending" },
                  ]}
                  value="1"
                />

                <FormSelector
                  label="Default Rollback Status/Sub-status"
                  placeholder="Select Status Marks"
                  options={[
                    { value: "1", label: "Choose qualifying sub status" },
                    { value: "2", label: "Failure" },
                    { value: "3", label: "Pending" },
                  ]}
                  value="1"
                />

                <FormSelector
                  label="Qualifying status"
                  placeholder="Select Status Marks"
                  options={[
                    { value: "1", label: "Choose qualifying sub status" },
                    { value: "2", label: "Failure" },
                    { value: "3", label: "Pending" },
                  ]}
                  value="1"
                />
              </FormSection>

              <FormSection title="Visibility settings">
                <ToggleItem
                  title="Show in Leads profile/drawer"
                  description="Let users rename a choices when creating it for a lead"
                  checked={true}
                  onChange={() => {}}
                />
                <ToggleItem
                  title="Show in Leads profile/drawer"
                  description="Let users rename a choices when creating it for a lead"
                  checked={true}
                  onChange={() => {}}
                />
              </FormSection>

              <FormSection title="Icon">
                <IconButtonGrid columns={6}>
                  {stageIcons.map((iconData) => (
                    <IconButton
                      key={iconData.id}
                      icon={iconData.icon}
                      active={iconData.active}
                      onClick={() => {}}
                    />
                  ))}
                </IconButtonGrid>
              </FormSection>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Addstage;
