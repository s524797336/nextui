import {DateRangePicker} from "@nextui-org/react";

export const SelectorIcon = (props) => {
  return (
    <svg height="1em" viewBox="0 0 24 24" width="1em" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M8 2v4m8-4v4" />
        <rect height="18" rx="2" width="18" x="3" y="4" />
        <path d="M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
      </g>
    </svg>
  );
};

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DateRangePicker label="Stay duration" selectorIcon={<SelectorIcon className="text-xl" />} />
    </div>
  );
}
