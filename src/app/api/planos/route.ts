import { NextResponse } from "next/server";
import { createClient } from "@/integrations/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("planos")
    .select("id, name")
    .order("price_cents", { ascending: true });

  if (error) {
    return NextResponse.json([], { status: 200 });
  }
  return NextResponse.json(data ?? []);
}