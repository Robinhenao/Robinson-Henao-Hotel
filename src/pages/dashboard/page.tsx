import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

export default function UserDashboardPage() {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">Mi Panel</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Mis Reservas</CardTitle>
            </CardHeader>
            <CardContent>
              {/* List of Active Bookings */}
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent>
              {/* User Profile Details */}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }