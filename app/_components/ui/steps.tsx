import Text from "@/app/_components/ui/text";

/** A numbered row of steps - how something works, in order. Stacks on a phone. */
export default function Steps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="grid gap-2.5 sm:grid-cols-3">
      {steps.map((step, i) => (
        <li key={step.title} className="rounded-card bg-panel p-5">
          <div
            aria-hidden="true"
            className="mb-2 grid size-8 place-items-center rounded-full bg-fairway text-label font-bold text-white"
          >
            {i + 1}
          </div>
          <Text as="div" variant="item">
            {step.title}
          </Text>
          <Text variant="caption" className="text-subtle">
            {step.text}
          </Text>
        </li>
      ))}
    </ol>
  );
}
