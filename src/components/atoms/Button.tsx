import { Button } from "@/components/ui/button"

interface ButtonProps {
  children: React.ReactNode;
  [key: string]: any; // To allow other props like className, onClick, etc.
}

export const PrimaryButton = ({ children, ...props }: ButtonProps) => (
  <Button 
    className="bg-primary text-white hover:bg-primary/90"
    {...props}
  >
    {children}
  </Button>
)

export const SecondaryButton = ({ children, ...props }: ButtonProps) => (
  <Button 
    variant="secondary"
    className="bg-secondary text-secondary-foreground"
    {...props}
  >
    {children}
  </Button>
)
