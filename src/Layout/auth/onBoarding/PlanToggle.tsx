import { LightGreenBtn } from "../../../components/common/Buttons/LightButton";
import { PrimaryButton } from "../../../components/common/Buttons/PrimaryButton";

interface PlanToggleProps {
  value: Boolean;
  onClick: () => void;
}

export default function PlanToggle({ value, onClick }: PlanToggleProps) {
  return (
    <div
      style={{ border: "1px solid var(--color-border-green)" }}
      // CHANGE 1: Switched 'flex' to 'grid grid-cols-2' and added fixed width 'w-[340px]'
      className="grid grid-cols-2 w-[340px] rounded-[1.3rem] p-1 items-center cursor-pointer"
    >
      {value ? (
        <>
          {/* Active State (Monthly) */}
          <LightGreenBtn>
            <div className="flex justify-center items-center w-full">
              <div>Monthly</div>
            </div>
          </LightGreenBtn>

          {/* Inactive State (Annually) */}
          <div
            className="flex items-center justify-center w-full"
            onClick={onClick}
          >
            <div className="flex gap-2 items-center">
              <div>Annually</div>
              <PrimaryButton
                style={{
                  display: "inline-block",
                  maxWidth: "fit-content",
                  borderRadius: "2rem",
                  height: "1.5rem",
                  padding: "8px",
                  fontSize: ".7rem",
                  pointerEvents: "none",
                }}
              >
                -20%
              </PrimaryButton>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Inactive State (Monthly) */}
          <div
            className="flex items-center justify-center w-full"
            onClick={onClick}
          >
            Monthly
          </div>

          {/* Active State (Annually) */}
          <LightGreenBtn>
            <div className="flex justify-center items-center gap-2 w-full">
              <div>Annually</div>
              <PrimaryButton
                style={{
                  display: "inline-block",
                  maxWidth: "fit-content",
                  borderRadius: "2rem",
                  height: "1.5rem",
                  padding: "8px",
                  fontSize: ".7rem",
                  pointerEvents: "none",
                }}
              >
                -20%
              </PrimaryButton>
            </div>
          </LightGreenBtn>
        </>
      )}
    </div>
  );
}
