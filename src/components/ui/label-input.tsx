import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface LabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labels: string[];
  onAddLabel: (label: string) => void;
  onRemoveLabel: (label: string) => void;
}

const LabelInput = React.forwardRef<HTMLInputElement, LabelInputProps>(
  ({ className, labels, onAddLabel, onRemoveLabel, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && inputValue.trim()) {
        event.preventDefault();
        onAddLabel(inputValue.trim());
        setInputValue("");
      }
    };

    return (
      <div className={cn("flex flex-wrap items-center gap-2", className)}>
        {labels.map((label) => (
          <Badge key={label} variant="secondary">
            {label}
            <button
              type="button"
              className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={() => onRemoveLabel(label)}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        ))}
        <Input
          ref={ref}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Add labels..."
          className="flex-1 min-w-[100px] h-8 text-sm border-none focus-visible:ring-0"
          {...props}
        />
      </div>
    );
  }
);

LabelInput.displayName = "LabelInput";

export { LabelInput };
