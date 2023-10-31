import { RadioGroup } from "@headlessui/react";

export default function ServicesRadioButtons({
  services,
  selected,
  setSelected,
}) {
  function handleOnChange(service) {
    setSelected(service);
  }

  return (
    <div className="w-full px-4 py-4">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} onChange={handleOnChange}>
          <RadioGroup.Label className="sr-only">Service</RadioGroup.Label>
          <div className="grid grid-flow-row grid-cols-2 gap-2">
            {services.map((service) => (
              <RadioGroup.Option
                key={service.id}
                value={service}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-npt_colors-30"
                      : "h-12"
                  }
      ${
        checked
          ? "bg-npt_colors-350 bg-opacity-75 text-white"
          : "bg-npt_colors-30"
      }
      relative flex cursor-pointer rounded-lg px-5 py-2 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <div className="w-full flex items-center justify-between">
                    {" "}
                    {/* Added "w-full" here */}
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium  ${
                            checked ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {service.name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={`inline ${
                            checked ? "text-sky-100" : "text-gray-500"
                          }`}
                        >
                          {/*
                          <span>Learn more?</span>
                          <span aria-hidden="true">&middot;</span>
                          <span>Text here</span> */}
                        </RadioGroup.Description>
                      </div>
                    </div>
                    {checked && (
                      <div className="shrink-0 text-white">
                        <CheckIcon className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
