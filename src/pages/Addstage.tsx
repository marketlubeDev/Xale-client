import { PageHeader } from "../components/common/PageHeader";
import { PageSectionHeader } from "../components/common/PageSectionHeader";
import { PrimaryButton } from "../components/common/Buttons/PrimaryButton";
import Layout from "../shared/layouts/Layout";
import SecondaryButton from "../components/common/Buttons/SecondaryButton";
import FormInput from "../components/common/FormInput";
import FormTextArea from "../components/common/FormTextArea";
import FormSection from "../components/common/FormSection";
import ToggleCard from "../components/common/ToggleCard";
import { AddIcon } from "../utilities/icons";
import ToggleCardGroup from "../components/common/ToggleCardGroup";
import ToggleItem from "../components/common/ToggleItem";
import FormSelector from "../components/common/FormSelector";
import IconButton from "../components/common/IconButton";
import IconButtonGrid from "../components/common/IconButtonGrid";
import StatusCard from "../components/status/StatusCard";
import { DashedButton } from "../components/common/Buttons/DashedButton";
import { useState } from "react";
import { nestedStatusOptions, stageCapabilities, stageIcons } from "../utilities/DummyData";

function Addstage() {

  const [qualifyingStatus, setQualifyingStatus] = useState<string>("");
  const [rejectionStatus, setRejectionStatus] = useState<string>("");
  const [rollbackStatus, setRollbackStatus] = useState<string[]>([]);
  const [defaultQualifyingStatus, setDefaultQualifyingStatus] = useState<string>("");

  return (
    <Layout>
      <div className="flex flex-col gap-5 px-4 py-6 md:px-8 lg:px-24 xl:px-32">
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

          <div className="flex flex-col lg:flex-row gap-5 items-start">
            {/* Left Side  */}
            <div className="flex flex-col gap-5 w-full lg:w-2/3">
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
                <DashedButton label="Add Status" icon={<AddIcon />} onClick={() => {}} backgroundColor="var(--color-border-card-active)" />
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
            <div className="w-full lg:w-1/3 flex flex-col gap-5">
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
                  label="Qualifying status"
                  placeholder="Choose qualifying sub status"
                  options={nestedStatusOptions}
                  value={qualifyingStatus}
                  onChange={(value) => setQualifyingStatus(value as string)}
                  required
                  showInfoIcon
                />

                <FormSelector
                  label="Default Qualifying status"
                  placeholder="Choose qualifying sub status"
                  options={nestedStatusOptions}
                  value={defaultQualifyingStatus}
                  onChange={(value) => setDefaultQualifyingStatus(value as string)}
                  required
                />

                <FormSelector
                  label="Rejection status"
                  placeholder="Choose rejection status"
                  options={nestedStatusOptions}
                  value={rejectionStatus}
                  onChange={(value) => setRejectionStatus(value as string)}
                  required
                  showInfoIcon
                />

                <FormSelector
                  label="Default Rollback Status/Sub-status"
                  placeholder="Select Status Marks"
                  options={nestedStatusOptions}
                  value={rollbackStatus}
                  onChange={(value) => setRollbackStatus(value as string[])}
                  multiSelect={true}
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
      </div>
    </Layout>
  );
}

export default Addstage;
