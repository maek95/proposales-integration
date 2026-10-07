import { errorResponse } from "@/app/_lib/external";
import { listCompanies } from "@/app/_lib/proposales";

export async function GET() {
  try {
    // CompanySchema already strips everything but id and name.
    return Response.json({ data: await listCompanies() });
  } catch (err) {
    return errorResponse(err);
  }
}
