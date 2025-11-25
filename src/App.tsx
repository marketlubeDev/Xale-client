import Header from "./shared/layouts/Header";
import Sidebar from "./shared/layouts/Sidebar";
import LowPriorityCard, {
  type LeadCard,
} from "./components/leads/LowPriorityCard";
import { BranchSelector } from "./components/common/BranchSelector";
import { PrimaryButton } from "./components/common/Buttons/PrimaryButton";
import { AddIcon } from "./utilities/icons";
import { MoreButton } from "./components/common/Buttons/MoreButton";
import { Metrics } from "./components/dashboard/Metrics";
import SearchInput from "./components/common/SearchInput";
import { Dropdown } from "./components/common/Dropdowns/Dropdown";
import { FilterButton } from "./components/common/Buttons/FilterButton";

function App() {
  const leads: LeadCard[] = [
    {
      name: "Emily Johnson",
      role: "Social research",
      campaign: "April Campaign",
      timestamp: "24 Sep, 03:15 pm",
      stage: "Visa",
      email: "emilyjohnson@gmail.com",
      phone: "+91 98675 34281",
      city: "Bangalore",
      avatarInitials: "EJ",
      reviewerInitial: "M",
      badges: [
        { label: "Verified", tone: "info" },
        { label: "Waiting", tone: "warning" },
      ],
    },
    {
      name: "Aaron Smith",
      role: "Retail newsletter",
      campaign: "May Promotions",
      timestamp: "25 Sep, 10:02 am",
      stage: "Leads",
      email: "aaronsmith@wecarple.com",
      phone: "+91 98705 42810",
      city: "Delhi",
      avatarInitials: "AS",
      reviewerInitial: "M",
      badges: [
        { label: "Verified", tone: "info" },
        { label: "In Progress", tone: "warning" },
      ],
    },
    {
      name: "Sophia Green",
      role: "Sales team",
      campaign: "December Sales",
      timestamp: "02 Oct, 06:09 pm",
      stage: "Visa",
      email: "sophiagreen@bravo.com",
      phone: "+91 21086 78643",
      city: "Jaipur",
      avatarInitials: "SG",
      reviewerInitial: "M",
      badges: [
        { label: "Pending", tone: "pending" },
        { label: "In Progress", tone: "warning" },
      ],
    },
    {
      name: "Kristina Harris",
      role: "Vendor",
      campaign: "June Insights",
      timestamp: "28 Sep, 11:30 am",
      stage: "Leads",
      email: "kristinaharris@email.com",
      phone: "+91 87654 32109",
      city: "Mumbai",
      avatarInitials: "KH",
      reviewerInitial: "F",
      badges: [
        { label: "Pending", tone: "pending" },
        { label: "Not Started", tone: "warning" },
      ],
    },
    {
      name: "Daniel Brown",
      role: "Product launch",
      campaign: "September Reveal",
      timestamp: "29 Sep, 02:15 pm",
      stage: "Student",
      email: "danielbrown@avocom.com",
      phone: "+91 54321 09876",
      city: "Hyderabad",
      avatarInitials: "DB",
      reviewerInitial: "M",
      badges: [
        { label: "Verified", tone: "info" },
        { label: "Waiting", tone: "warning" },
      ],
    },
    {
      name: "Peter Hall",
      role: "Customer Network",
      campaign: "May Review",
      timestamp: "07 Oct, 10:15 pm",
      stage: "Leads",
      email: "peterhall@anonym.com",
      phone: "+91 76543 21086",
      city: "Bhopal",
      avatarInitials: "PH",
      reviewerInitial: "M",
      badges: [
        { label: "Pending", tone: "pending" },
        { label: "Waiting", tone: "warning" },
      ],
    },
    {
      name: "Emily Johnson",
      role: "Social research",
      campaign: "April Campaign",
      timestamp: "24 Sep, 03:15 pm",
      stage: "Visa",
      email: "emilyjohnson@gmail.com",
      phone: "+91 98675 34281",
      city: "Bangalore",
      avatarInitials: "EJ",
      reviewerInitial: "M",
      badges: [
        { label: "Verified", tone: "info" },
        { label: "Waiting", tone: "warning" },
      ],
    },
    {
      name: "Aaron Smith",
      role: "Retail newsletter",
      campaign: "May Promotions",
      timestamp: "25 Sep, 10:02 am",
      stage: "Leads",
      email: "aaronsmith@wecarple.com",
      phone: "+91 98705 42810",
      city: "Delhi",
      avatarInitials: "AS",
      reviewerInitial: "M",
      badges: [
        { label: "Verified", tone: "info" },
        { label: "In Progress", tone: "warning" },
      ],
    },
    {
      name: "Sophia Green",
      role: "Sales team",
      campaign: "December Sales",
      timestamp: "02 Oct, 06:09 pm",
      stage: "Visa",
      email: "sophiagreen@bravo.com",
      phone: "+91 21086 78643",
      city: "Jaipur",
      avatarInitials: "SG",
      reviewerInitial: "M",
      badges: [
        { label: "Pending", tone: "pending" },
        { label: "In Progress", tone: "warning" },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#eef3f1]">
      <div className="w-[250px] border-r border-[#e6e8e7] bg-white">
        <Sidebar />
      </div>
      <div className="flex w-full flex-col">
        <Header />

        <main className="flex flex-1 flex-col justify-start gap-5 lg:px-10" style={{ padding: '24px 16px 0 32px' }}>
          <div className="flex gap-2 justify-between">
            <BranchSelector />
            <div className="flex gap-2">
              <PrimaryButton
                title="Add Lead"
                onClick={() => {}}
                icon={<AddIcon />}
              />
              <MoreButton onClick={() => {}} />
            </div>
          </div>
          <div className="flex gap-2 justify-between items-center" >
            <div className="flex gap-2">
              <Metrics />
            </div>
            <div className="flex gap-[16px]">
              <SearchInput placeholder="Search by name or company..." />
              <Dropdown/>
              <FilterButton/>
            </div>
          </div>
          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {leads?.map((lead: LeadCard) => (
              <LowPriorityCard key={lead.name} lead={lead} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
