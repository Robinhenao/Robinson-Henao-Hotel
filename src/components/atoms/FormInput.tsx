import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const FormInput = ({ 
  label, 
  type = "text", 
  placeholder, 
  ...props 
}) => (
  <div className="space-y-2">
    {label && <Label>{label}</Label>}
    <Input 
      type={type}
      placeholder={placeholder}
      {...props}
    />
  </div>
)