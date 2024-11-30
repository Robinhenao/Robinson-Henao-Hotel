import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  [key: string]: any; // To allow other props like className, onChange, etc.
}

export const FormInput = ({ 
  label, 
  type = "text", 
  placeholder, 
  ...props 
}: FormInputProps) => (
  <div className="space-y-2">
    {label && <Label>{label}</Label>}
    <Input 
      type={type}
      placeholder={placeholder}
      {...props}
    />
  </div>
)
