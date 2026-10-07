import { attempt } from "@/app/_lib/external";
import { listCompanies } from "@/app/_lib/proposales";
import { ErrorNotice } from "../ui/error-notice";
import { Section, SectionTitle } from "../ui/section";

// Server Component: calls Proposales directly on the server - no API route.
export async function Companies() {
  const result = await attempt(listCompanies);

  return (
    <Section>
      <SectionTitle>Your companies</SectionTitle>
      <div className="mt-6">
        {!result.ok ? (
          <ErrorNotice title="Couldn't load your companies.">
            {result.message} Try again in a moment.
          </ErrorNotice>
        ) : result.data.length === 0 ? (
          <p className="text-foreground/70">No companies on this account yet.</p>
        ) : (
          <ul className="divide-y divide-foreground/10">
            {result.data.map((company) => (
              <li key={company.id} className="py-3">
                {company.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
