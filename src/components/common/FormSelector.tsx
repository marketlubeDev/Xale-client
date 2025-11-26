import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, ChevronRightIcon, InfoIcon } from '../../utilities/icons';

// Nested option structure supporting 3 levels
// Level 1: Main options
// Level 2: children of Level 1
// Level 3: children of Level 2
export interface NestedSelectOption {
  value: string;
  label: string;
  children?: NestedSelectOption[]; // Level 2 (if this is Level 1) or Level 3 (if this is Level 2)
  color?: string; // Color for the chip when selected
}

// Selected value structure
export interface SelectedValue {
  value: string;
  label: string;
  level: number; // 1, 2, or 3
  color?: string;
}

interface FormSelectorProps {
  label: string;
  placeholder?: string;
  value?: string | string[]; // Single value or array for multi-select
  onChange?: (value: string | string[]) => void;
  options: NestedSelectOption[];
  disabled?: boolean;
  className?: string;
  required?: boolean;
  multiSelect?: boolean; // Enable multi-select mode
  showInfoIcon?: boolean; // Show info icon next to label
}

// Color palette for chips (if not provided in option)
const DEFAULT_COLORS = [
  '#335cff', // Blue
  '#ff8447', // Orange
  '#0fad14', // Green
  '#da2a46', // Red
  '#5940c3', // Purple
  '#3bd8ff', // Cyan
];

// Get color for a selected value
const getColorForValue = (selectedValue: SelectedValue, index: number): string => {
  if (selectedValue.color) return selectedValue.color;
  return DEFAULT_COLORS[index % DEFAULT_COLORS.length];
};

// Find option by value in nested structure
const findOptionByValue = (
  options: NestedSelectOption[],
  value: string
): NestedSelectOption | null => {
  for (const option of options) {
    if (option.value === value) {
      return option;
    }
      if (option.children) {
        const found = findOptionByValue(option.children, value);
        if (found) return found;
      }
  }
  return null;
};

// Get full path for a selected value (all levels from root to selected)
const getFullPath = (
  options: NestedSelectOption[],
  value: string,
  path: Array<{ value: string; label: string; color?: string; level: number }> = []
): Array<{ value: string; label: string; color?: string; level: number }> | null => {
  for (const option of options) {
    const currentPath = [...path, {
      value: option.value,
      label: option.label,
      color: option.color,
      level: path.length + 1,
    }];
    
    if (option.value === value) {
      return currentPath;
    }
    
    if (option.children) {
      const found = getFullPath(option.children, value, currentPath);
      if (found) return found;
    }
  }
  return null;
};

// Get full label path for nested option (for backward compatibility)
const getFullLabel = (
  options: NestedSelectOption[],
  value: string,
  path: string[] = []
): { label: string; level: number; color?: string } | null => {
  for (const option of options) {
    const currentPath = [...path, option.label];
    if (option.value === value) {
      return { label: option.label, level: path.length + 1, color: option.color };
    }
    if (option.children) {
      const found = getFullLabel(option.children, value, currentPath);
      if (found) return found;
    }
  }
  return null;
};

export function FormSelector({
  label,
  placeholder = "Select an option",
  value = "",
  onChange,
  options = [],
  disabled = false,
  className = "",
  required = false,
  multiSelect = false,
  showInfoIcon = false,
}: FormSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLevel1, setSelectedLevel1] = useState<string | null>(null);
  const [selectedLevel2, setSelectedLevel2] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Parse selected values - show all levels in the path
  // Store mapping of displayed chips to their final selected values
  const { selectedValues, chipToFinalValueMap } = React.useMemo(() => {
    const chipMap = new Map<string, string>(); // Maps chip value to final selected value
    
    if (multiSelect && Array.isArray(value)) {
      // For multi-select, flatten all paths for all selected values
      const allValues: SelectedValue[] = [];
      value.forEach((finalValue) => {
        const fullPath = getFullPath(options, finalValue);
        if (fullPath) {
          // Add all levels in the path and map each to the final value
          fullPath.forEach((pathItem) => {
            chipMap.set(pathItem.value, finalValue);
            // Avoid duplicates
            if (!allValues.find(v => v.value === pathItem.value)) {
              allValues.push({
                value: pathItem.value,
                label: pathItem.label,
                level: pathItem.level,
                color: pathItem.color,
              });
            }
          });
        } else {
          chipMap.set(finalValue, finalValue);
          allValues.push({ value: finalValue, label: finalValue, level: 1 });
        }
      });
      return { selectedValues: allValues, chipToFinalValueMap: chipMap };
    } else if (!multiSelect && typeof value === 'string' && value) {
      // For single select, show all levels in the path
      const fullPath = getFullPath(options, value);
      if (fullPath) {
        const allValues = fullPath.map((pathItem) => {
          chipMap.set(pathItem.value, value);
          return {
            value: pathItem.value,
            label: pathItem.label,
            level: pathItem.level,
            color: pathItem.color,
          };
        });
        return { selectedValues: allValues, chipToFinalValueMap: chipMap };
      }
      chipMap.set(value, value);
      return { selectedValues: [{ value, label: value, level: 1 }], chipToFinalValueMap: chipMap };
    }
    return { selectedValues: [], chipToFinalValueMap: chipMap };
  }, [value, options, multiSelect]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedLevel1(null);
        setSelectedLevel2(null);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: NestedSelectOption, level: number) => {
    if (level === 1) {
      if (option.children && option.children.length > 0) {
        setSelectedLevel1(option.value);
        setSelectedLevel2(null);
      } else {
        // Final selection
        if (multiSelect) {
          const currentValues = Array.isArray(value) ? value : [];
          const newValues = currentValues.includes(option.value)
            ? currentValues.filter(v => v !== option.value)
            : [...currentValues, option.value];
          onChange?.(newValues);
        } else {
          onChange?.(option.value);
          setIsOpen(false);
        }
      }
    } else if (level === 2) {
      if (option.children && option.children.length > 0) {
        // Has Level 3 children
        setSelectedLevel2(option.value);
      } else {
        // Final selection at Level 2
        if (multiSelect) {
          const currentValues = Array.isArray(value) ? value : [];
          const newValues = currentValues.includes(option.value)
            ? currentValues.filter(v => v !== option.value)
            : [...currentValues, option.value];
          onChange?.(newValues);
        } else {
          onChange?.(option.value);
          setIsOpen(false);
        }
      }
    } else if (level === 3) {
      // Final selection
      if (multiSelect) {
        const currentValues = Array.isArray(value) ? value : [];
        const newValues = currentValues.includes(option.value)
          ? currentValues.filter(v => v !== option.value)
          : [...currentValues, option.value];
        onChange?.(newValues);
      } else {
        onChange?.(option.value);
        setIsOpen(false);
      }
    }
  };

  const handleRemoveChip = (chipValue: string) => {
    if (multiSelect && Array.isArray(value)) {
      // Find the final selected value that this chip belongs to
      const finalValue = chipToFinalValueMap.get(chipValue);
      if (finalValue) {
        // Remove the final value from the selected values
        onChange?.(value.filter(v => v !== finalValue));
      }
    } else if (!multiSelect) {
      // For single select, clear the selection
      onChange?.("");
    }
  };

  const renderOptions = () => {
    // Level 3: Show children of selected Level 2 option
    if (selectedLevel1 && selectedLevel2) {
      const level1Option = options.find(opt => opt.value === selectedLevel1);
      const level2Option = level1Option?.children?.find(opt => opt.value === selectedLevel2);
      
      if (level2Option?.children && level2Option.children.length > 0) {
        return (
          <>
            <div className="px-2 py-1 text-b5 text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)] flex items-center gap-1">
              <button
                onClick={() => setSelectedLevel2(null)}
                className="hover:underline"
              >
                {level1Option?.label}
              </button>
              <span>→</span>
              <span>{level2Option.label}</span>
            </div>
            {level2Option.children.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option, 3)}
                className="px-3 py-2 hover:bg-[var(--color-bg-hover)] cursor-pointer text-b4 text-[var(--color-text-primary)]"
              >
                {option.label}
              </div>
            ))}
          </>
        );
      }
    }
    
    // Level 2: Show children of selected Level 1 option
    if (selectedLevel1) {
      const level1Option = options.find(opt => opt.value === selectedLevel1);
      if (level1Option?.children && level1Option.children.length > 0) {
        return (
          <>
            <div className="px-2 py-1 text-b5 text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)] flex items-center gap-1">
              <button
                onClick={() => {
                  setSelectedLevel1(null);
                  setSelectedLevel2(null);
                }}
                className="hover:underline"
              >
                ← Back
              </button>
              <span className="ml-2">{level1Option.label}</span>
            </div>
            {level1Option.children.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option, 2)}
                className="px-3 py-2 hover:bg-[var(--color-bg-hover)] cursor-pointer text-b4 text-[var(--color-text-primary)] flex items-center justify-between"
              >
                <span>{option.label}</span>
                {option.children && option.children.length > 0 && (
                  <ChevronRightIcon size={16} />
                )}
              </div>
            ))}
          </>
        );
      }
    }

    return options.map((option) => (
      <div
        key={option.value}
        onClick={() => handleSelect(option, 1)}
        className="px-3 py-2 hover:bg-[var(--color-bg-hover)] cursor-pointer text-b4 text-[var(--color-text-primary)] flex items-center justify-between"
      >
        <span>{option.label}</span>
        {option.children && option.children.length > 0 && (
          <ChevronRightIcon size={16} />
        )}
      </div>
    ));
  };

  return (
    <div className={`flex flex-col gap-[6px] items-start ${className}`}>
      <label className="text-b4-med text-[var(--color-text-primary)] text-center tracking-[-0.56px] whitespace-pre shrink-0 flex items-center gap-1">
        {label}
        {required && <span className="text-[var(--color-error)]">*</span>}
        {showInfoIcon && (
          <InfoIcon size={16} color="var(--color-black-4)" className="cursor-help" />
        )}
      </label>

      <div className="relative w-full" ref={dropdownRef}>
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`bg-[var(--color-bg-input-field)] border border-[var(--color-border-input)] rounded-[12px] w-full min-h-[40px] px-[12px] py-[8px] flex items-center gap-2 ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          } ${isOpen ? 'border-[var(--color-border-accent)]' : ''}`}
        >
          {selectedValues.length > 0 ? (
            <div className="flex flex-wrap gap-2 flex-1">
              {selectedValues.map((selectedValue, index) => (
                <div
                  key={selectedValue.value}
                  className="px-2 py-1 rounded-[6px] text-b5 text-white font-medium flex items-center gap-1"
                  style={{ backgroundColor: getColorForValue(selectedValue, index) }}
                >
                  <span>{selectedValue.label}</span>
                  {(multiSelect || (!multiSelect && selectedValues.length > 1)) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveChip(selectedValue.value);
                      }}
                      className="hover:bg-white/20 rounded-full w-4 h-4 flex items-center justify-center"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <span className="text-b4 text-[var(--color-text-secondary)] flex-1">
              {placeholder}
            </span>
          )}
          <ChevronDownIcon
            size={20}
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>

        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-[var(--color-border-input)] rounded-[12px] shadow-lg max-h-[300px] overflow-y-auto">
            {options.length > 0 ? (
              renderOptions()
            ) : (
              <div className="px-3 py-2 text-b4 text-[var(--color-text-secondary)]">
                No options available
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FormSelector;
