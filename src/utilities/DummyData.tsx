 
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
} from "./icons";
import type { StageData } from "../components/stage/StageSummaryCardActive";

export const nestedStatusOptions = [
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

// Stage Capabilities Configuration (Replace onChange handlers during integration)
export const stageCapabilities = [
  {
    id: 1,
    config: {
      title: "Stage Visible",
      description: "Whether the stage is visible to the user",
      checked: true,
      icon: <MailIcon color="white" />,
      onChange: () => {}, // TODO: Replace with actual handler
    },
  },
  {
    id: 2,
    config: {
      title: "Stage Visible",
      description: "Whether the stage is visible to the user",
      checked: true,
      icon: <MailIcon color="white" />,
      onChange: () => {}, // TODO: Replace with actual handler
    },
  },
  {
    id: 3,
    config: {
      title: "Stage Visible",
      description: "Whether the stage is visible to the user",
      checked: true,
      icon: <MailIcon color="white" />,
      onChange: () => {}, // TODO: Replace with actual handler
    },
  },
];


// Stage Icons Configuration (Replace onClick handlers during integration)
export const stageIcons = [
  { id: 1, config: { icon: <MailIcon />, active: false, onClick: () => {} } }, // TODO: Replace handler
  { id: 2, config: { icon: <PhoneIcon />, active: true, onClick: () => {} } }, // TODO: Replace handler
  { id: 3, config: { icon: <LocationIcon />, active: false, onClick: () => {} } }, // TODO: Replace handler
  { id: 4, config: { icon: <DashboardIcon />, active: false, onClick: () => {} } }, // TODO: Replace handler
  { id: 5, config: { icon: <LeadsIcon />, active: false, onClick: () => {} } }, // TODO: Replace handler
  { id: 6, config: { icon: <ApplicationIcon />, active: false, onClick: () => {} } }, // TODO: Replace handler
  { id: 7, config: { icon: <VisaIcon />, active: false, onClick: () => {} } }, // TODO: Replace handler
  { id: 8, config: { icon: <StageManagementIcon />, active: false, onClick: () => {} } }, // TODO: Replace handler
  { id: 9, config: { icon: <FilterIcon />, active: false, onClick: () => {} } }, // TODO: Replace handler
  { id: 10, config: { icon: <GridIcon />, active: false, onClick: () => {} } }, // TODO: Replace handler
  { id: 11, config: { icon: <ListIcon />, active: false, onClick: () => {} } }, // TODO: Replace handler
  { id: 12, config: { icon: <BoardIcon />, active: false, onClick: () => {} } }, // TODO: Replace handler
];



// Status Cards Configuration (Replace handlers during integration)
export const statusCardsData = [
  {
    id: 1,
    config: {
      statusTitle: "Status 1",
      statusName: "Status 1 Name",
      subStatuses: [{ id: 1, name: "Sub Status 1" }],
      onStatusNameChange: () => {}, // TODO: Replace with actual handler
      onSubStatusNameChange: () => {}, // TODO: Replace with actual handler
      onDeleteStatus: () => {}, // TODO: Replace with actual handler
      onDeleteSubStatus: () => {}, // TODO: Replace with actual handler
    },
  },
  {
    id: 2,
    config: {
      statusTitle: "Status 2",
      statusName: "Status 2 Name",
      subStatuses: [{ id: 1, name: "Sub Status 1" }],
      onStatusNameChange: () => {}, // TODO: Replace with actual handler
      onSubStatusNameChange: () => {}, // TODO: Replace with actual handler
      onDeleteStatus: () => {}, // TODO: Replace with actual handler
      onDeleteSubStatus: () => {}, // TODO: Replace with actual handler
    },
  },
];



// Choice Toggles Configuration (Replace onChange handlers during integration)
export const choiceToggles = [
  {
    id: "allow-custom-name",
    config: {
      title: "Allow Custom Name",
      description: "Let users rename a choices when creating it for a lead",
      checked: true,
      onChange: () => {}, // TODO: Replace with actual handler
    },
  },
  {
    id: "auto-pause",
    config: {
      title: "Auto Pause Other Choices",
      description: "Pauses other choices when one qualifies",
      checked: false,
      disabled: true,
      onChange: () => {}, // TODO: Replace with actual handler
    },
  },
];

// Visibility Toggles Configuration (Replace onChange handlers during integration)
export const visibilityToggles = [
  {
    id: "show-profile-1",
    config: {
      title: "Show in Leads profile/drawer",
      description: "Let users rename a choices when creating it for a lead",
      checked: true,
      onChange: () => {}, // TODO: Replace with actual handler
    },
  },
  {
    id: "show-profile-2",
    config: {
      title: "Show in Leads profile/drawer",
      description: "Let users rename a choices when creating it for a lead",
      checked: true,
      onChange: () => {}, // TODO: Replace with actual handler
    },
  },
];

// Form Input Configurations (Replace onChange handlers during integration)
export const basicDetailsInputs = [
  {
    id: "stage-name",
    config: {
      label: "Stage Name",
      placeholder: "Enter Stage Name",
      onChange: () => {}, // TODO: Replace with actual handler
    },
  },
];

export const stageOrderInput = {
  id: "stage-order",
  config: {
    label: "Stage Name",
    placeholder: "",
    value: "1",
    type: "number" as const,
    onChange: () => {}, // TODO: Replace with actual handler
  },
};

export const stageActionsInput = {
  id: "stage-actions",
  config: {
    label: "Stage Actions",
    placeholder: "Select Stage Actions",
    value: "1",
    type: "number" as const,
    onChange: () => {}, // TODO: Replace with actual handler
  },
};

// DashedButton Configuration
export const addStatusButton = {
  config: {
    label: "Add Status",
    icon: null, // Will be added in component
    onClick: () => {}, // TODO: Replace with actual handler
    backgroundColor: "var(--color-border-card-active)",
  },
};

// Form Selector Configuration (Will be dynamically populated with handlers)
export const statusFormSelectors = [
  {
    id: "qualifying-status",
    label: "Qualifying status",
    placeholder: "Choose qualifying sub status",
    required: true,
    showInfoIcon: true,
  },
  {
    id: "default-qualifying-status",
    label: "Default Qualifying status",
    placeholder: "Choose qualifying sub status",
    required: true,
  },
  {
    id: "rejection-status",
    label: "Rejection status",
    placeholder: "Choose rejection status",
    required: true,
    showInfoIcon: true,
  },
  {
    id: "rollback-status",
    label: "Default Rollback Status/Sub-status",
    placeholder: "Select Status Marks",
  },
];






export const stagesData: StageData[] = [
    {
        stageNumber: 1,
        title: "Stage 1",
        statusCount: 10,
        subStatusCount: 20,
        badges: [
            {label: "track", type: "warning" as const}, 
            {label: "choices", type: "verified" as const}, 
            {label: "Specific Status", type: "feature" as const}
        ],
    },
    {
        stageNumber: 2,
        title: "Stage 2",
        statusCount: 10,
        subStatusCount: 20,
        badges: [
            {label: "track", type: "warning" as const}, 
            {label: "choices", type: "verified" as const}, 
            {label: "Specific Status", type: "feature" as const}
        ],
    },
    {
        stageNumber: 3,
        title: "Stage 3",
        statusCount: 10,
        subStatusCount: 20,
        badges: [
            {label: "track", type: "warning" as const}, 
            {label: "choices", type: "verified" as const}, 
            {label: "Specific Status", type: "feature" as const}
        ],
    },
];

