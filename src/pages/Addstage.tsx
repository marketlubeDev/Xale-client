import { PageHeader } from "../components/common/PageHeader";
import { PageSectionHeader } from "../components/common/PageSectionHeader";
import { PrimaryButton } from "../components/common/Buttons/PrimaryButton";
import Layout from "../Layout/Layout";
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
import {
  nestedStatusOptions,
  stageCapabilities,
  stageIcons,
  statusCardsData,
  choiceToggles,
  visibilityToggles,
  statusFormSelectors,
  basicDetailsInputs,
  stageOrderInput,
  stageActionsInput,
  addStatusButton,
} from "../utilities/DummyData";
// import DraggableItem from "../components/common/DraggableItem";

function Addstage() {
  // Form state
  const [qualifyingStatus, setQualifyingStatus] = useState<string>("");
  const [rejectionStatus, setRejectionStatus] = useState<string>("");
  const [rollbackStatus, setRollbackStatus] = useState<string[]>([]);
  const [defaultQualifyingStatus, setDefaultQualifyingStatus] =
    useState<string>("");

  // Handler mapping for form selectors
  const statusHandlers = {
    "qualifying-status": {
      value: qualifyingStatus,
      onChange: (value: string | string[]) =>
        setQualifyingStatus(value as string),
      multiSelect: undefined,
    },
    "default-qualifying-status": {
      value: defaultQualifyingStatus,
      onChange: (value: string | string[]) =>
        setDefaultQualifyingStatus(value as string),
      multiSelect: undefined,
    },
    "rejection-status": {
      value: rejectionStatus,
      onChange: (value: string | string[]) =>
        setRejectionStatus(value as string),
      multiSelect: undefined,
    },
    "rollback-status": {
      value: rollbackStatus,
      onChange: (value: string | string[]) =>
        setRollbackStatus(value as string[]),
      multiSelect: true,
    },
  };

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
              <PrimaryButton children="Save Stage" onClick={() => {}} />
            </>
          }
        />

        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* Left Side  */}
          <div className="flex flex-col gap-5 w-full lg:w-2/3">
            <FormSection title="Basic Details">
              {basicDetailsInputs.map((input) => (
                <FormInput key={input.id} config={input.config} />
              ))}
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
                  <ToggleCard key={capability.id} config={capability.config} />
                ))}
              </ToggleCardGroup>
            </FormSection>

            <FormSection title="Status Marks">
              {statusCardsData.map((status) => (
                <StatusCard key={status.id} config={status.config} />
              ))}
              <DashedButton
                config={{ ...addStatusButton.config, icon: <AddIcon /> }}
              />
            </FormSection>

            <FormSection
              title="Choices"
              description="Define the steps inside this stage and how each step affects the lead"
            >
              <FormInput config={stageActionsInput.config} />

              {choiceToggles.map((toggle) => (
                <ToggleItem key={toggle.id} config={toggle.config} />
              ))}
            </FormSection>
          </div>

          {/* Right Side  */}
          <div className="w-full lg:w-1/3 flex flex-col gap-5">
            <FormSection title="Stage Order">
              <FormInput config={stageOrderInput.config} />
              {/* <DraggableItem label="Enquiry" badgeNumber={1} />
              <DraggableItem label="Application" badgeNumber={1} />
              <DraggableItem label="Approved" badgeNumber={1} /> */}

            </FormSection>

            <FormSection title="Status Marks">
              {statusFormSelectors.map((selector) => {
                const handler =
                  statusHandlers[selector.id as keyof typeof statusHandlers];
                return (
                  <FormSelector
                    key={selector.id}
                    config={{
                      label: selector.label,
                      placeholder: selector.placeholder,
                      options: nestedStatusOptions,
                      value: handler.value,
                      onChange: handler.onChange,
                      required: selector.required,
                      showInfoIcon: selector.showInfoIcon,
                      multiSelect: handler.multiSelect,
                    }}
                  />
                );
              })}
            </FormSection>

            <FormSection title="Visibility settings">
              {visibilityToggles.map((toggle) => (
                <ToggleItem key={toggle.id} config={toggle.config} />
              ))}
            </FormSection>

            <FormSection title="Icon">
              <IconButtonGrid columns={6}>
                {stageIcons.map((iconData) => (
                  <IconButton key={iconData.id} config={iconData.config} />
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
