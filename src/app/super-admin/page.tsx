import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/integrations/supabase/server";

export default async function SuperAdminDashboard() {
  const supabase = createClient();
  const { count: imobiliariasCount } = await supabase
    .from("imobiliarias")
    .select('*', { count: 'exact', head: true });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Super Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Imobiliárias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{imobiliariasCount ?? 0}</div>
            <p className="text-xs text-muted-foreground">
              Tenants cadastrados no sistema
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}