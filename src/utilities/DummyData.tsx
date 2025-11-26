import type { ReactNode } from "react";
import type { NestedSelectOption } from "../components/common/FormSelector";
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

// Nested Status Options with 3-level hierarchy
export const nestedStatusOptions: NestedSelectOption[] = [
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

// Stage Capabilities Data
export interface StageCapability {
  id: number;
  title: string;
  description: string;
  checked: boolean;
  icon: ReactNode;
}

export const stageCapabilities: StageCapability[] = [
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

// Stage Icons Data
export interface StageIcon {
  id: number;
  icon: ReactNode;
  active: boolean;
}

export const stageIcons: StageIcon[] = [
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

