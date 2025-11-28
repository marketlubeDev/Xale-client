import { MoreButton } from "../components/common/Buttons/MoreButton";
import { PrimaryButton } from "../components/common/Buttons/PrimaryButton";
import PageSectionHeader from "../components/common/PageSectionHeader";
import PageHeader from "../components/common/PageHeader";
import Header from "../Layout/Header";
import Sidebar from "../shared/layouts/Sidebar";
import { AddIcon } from "../utilities/icons";

function StageManagement() {
  return (
    <div className="flex min-h-screen bg-[#eef3f1]">
      <div className="w-[250px] border-r border-[#e6e8e7] bg-white">
        <Sidebar />
      </div>
      <div className="flex w-full flex-col">
        <Header />

        <main
          className="flex flex-1 flex-col justify-start gap-5 lg:px-10"
          style={{ padding: "24px 16px 0 32px" }}
        >
          <PageHeader
            leftContent={
              <PageSectionHeader
                title="Stage Management"
                description="Create and manage your lead stages, statuses, and sub-statuses used in your pipeline"
                count={5}
              />
            }
            rightContent={
              <>
                <PrimaryButton
                  title="Add Stage"
                  onClick={() => {}}
                  icon={<AddIcon />}
                />
                <MoreButton onClick={() => {}} />
              </>
            }
          />
        </main>
      </div>
    </div>
  );
}

export default StageManagement;
