import { Button } from "@/components/ui/button"

export const PrimaryButton = ({ children, ...props }) => (
  <Button 
    className="bg-primary text-white hover:bg-primary/90"
    {...props}
  >
    {children}
  </Button>
)

export const SecondaryButton = ({ children, ...props }) => (
  <Button 
    variant="secondary"
    className="bg-secondary text-secondary-foreground"
    {...props}
  >
    {children}
  </Button>
)