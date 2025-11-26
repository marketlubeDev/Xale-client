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
  AddIcon,
} from "../utilities/icons";
import ToggleCardGroup from "../components/common/ToggleCardGroup";

import ToggleItem from "../components/common/ToggleItem";
import FormSelector from "../components/common/FormSelector";
import type { NestedSelectOption } from "../components/common/FormSelector";
import IconButton from "../components/common/IconButton";
import IconButtonGrid from "../components/common/IconButtonGrid";
import StatusCard from "../components/status/StatusCard";
import { DashedButton } from "../components/common/Buttons/DashedButton";
import { useState } from "react";

function Addstage() {
  // Dummy data with 3-level nested options
  const nestedStatusOptions: NestedSelectOption[] = [
    {
      value: "qualifying",
      label: "Qualifying Status",
      color: "#335cff", // Blue
      children: [
        {
          value: "followup",
          label: "Followup",
          color: "#335cff", // Blue
          children: [
            {
              value: "followup-initial",
              label: "Initial Followup",
              color: "#3bd8ff", // Cyan
            },
            {
              value: "followup-secondary",
              label: "Secondary Followup",
              color: "#0fad14", // Green
            },
            {
              value: "followup-final",
              label: "Final Followup",
              color: "#5940c3", // Purple
            },
          ],
        },
        {
          value: "pending",
          label: "Pending Decision",
          color: "#ff8447", // Orange
          children: [
            {
              value: "pending-review",
              label: "Pending Review",
              color: "#ff8447", // Orange
            },
            {
              value: "pending-approval",
              label: "Pending Approval",
              color: "#da2a46", // Red
            },
          ],
        },
        {
          value: "active",
          label: "Active",
          color: "#0fad14", // Green
        },
      ],
    },
    {
      value: "rejection",
      label: "Rejection Status",
      color: "#da2a46", // Red
      children: [
        {
          value: "rejected-qualification",
          label: "Rejected - Qualification",
          color: "#da2a46", // Red
          children: [
            {
              value: "rejected-income",
              label: "Income Not Met",
              color: "#da2a46", // Red
            },
            {
              value: "rejected-credit",
              label: "Credit Score Low",
              color: "#ff8447", // Orange
            },
          ],
        },
        {
          value: "rejected-documentation",
          label: "Rejected - Documentation",
          color: "#ff8447", // Orange
        },
        {
          value: "rejected-other",
          label: "Rejected - Other",
          color: "#5940c3", // Purple
        },
      ],
    },
    {
      value: "rollback",
      label: "Rollback Status",
      color: "#5940c3", // Purple
      children: [
        {
          value: "rollback-stage1",
          label: "Rollback to Stage 1",
          color: "#335cff", // Blue
          children: [
            {
              value: "rollback-stage1-sub1",
              label: "Stage 1 - Sub Status 1",
              color: "#335cff", // Blue
            },
            {
              value: "rollback-stage1-sub2",
              label: "Stage 1 - Sub Status 2",
              color: "#3bd8ff", // Cyan
            },
          ],
        },
        {
          value: "rollback-stage2",
          label: "Rollback to Stage 2",
          color: "#0fad14", // Green
        },
      ],
    },
  ];

  // State for form values
  const [qualifyingStatus, setQualifyingStatus] = useState<string>("");
  const [rejectionStatus, setRejectionStatus] = useState<string>("");
  const [rollbackStatus, setRollbackStatus] = useState<string[]>([]);
  const [defaultQualifyingStatus, setDefaultQualifyingStatus] = useState<string>("");
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
        </main>
      </div>
    </div>
  );
}

export default Addstage;
