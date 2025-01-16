import {
  Description,
  ErrorMessage,
  Field,
  Input,
  Label,
  Textarea,
} from "@/shared/ui";
import { HoverCard } from "@/shared/ui/hover-card";
import { QuestionMarkCircleIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { ReactNode } from "react";
import { UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { ObservationFormData } from "../model";

export function ObservationFormFieldInput({
  className,
  errorMessage,
  fieldName,
  label,
  placeholder,
  unit,
  hoverCardContent,
  inputType = "text",
  valueAsNumber = false,
  register,
}: {
  className?: string;
  errorMessage?: string;
  fieldName: keyof ObservationFormData;
  label: string;
  placeholder?: string;
  unit?: string;
  hoverCardContent?: ReactNode;
  inputType?: string;
  valueAsNumber?: boolean;
  register: UseFormRegister<ObservationFormData>;
}) {
  return (
    <Field className={twMerge("space-y-3", className)}>
      <div className="w-min overflow-visible whitespace-nowrap">
        {hoverCardContent ? (
          <HoverCard
            triggerContent={
              <Label className="group flex w-min items-center space-x-1 whitespace-nowrap font-medium hover:text-brand-blue-600">
                <QuestionMarkCircleIcon className="size-4 flex-shrink-0 fill-brand-blue-500" />
                <span>{label}</span>
              </Label>
            }
          >
            {hoverCardContent}
          </HoverCard>
        ) : (
          <Label className="flex items-center space-x-1 font-medium">
            {label}
          </Label>
        )}
      </div>
      <div className="relative">
        <Input
          inputClassName={clsx(unit && "sm:pr-8")}
          invalid={!!errorMessage}
          placeholder={placeholder}
          type={inputType}
          unit={unit}
          {...register(fieldName, { valueAsNumber })}
        />
      </div>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Field>
  );
}

export function ObservationFormFieldTextArea({
  className,
  errorMessage,
  fieldName,
  label,
  helpText,
  placeholder,
  title,
  srOnlyLabel = false,
  register,
}: {
  className?: string;
  errorMessage?: string;
  fieldName: keyof ObservationFormData;
  label: string;
  srOnlyLabel?: boolean;
  helpText?: string;
  placeholder?: string;
  title?: string;
  register: UseFormRegister<ObservationFormData>;
}) {
  return (
    <Field className={twMerge("space-y-3", className)}>
      <Label
        className={twMerge(
          "flex items-center space-x-1",
          srOnlyLabel && "sr-only",
        )}
        title={title}
      >
        {title && (
          <QuestionMarkCircleIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
        )}
        <span>{label}</span>
      </Label>
      <div className="relative">
        <Textarea
          inputClassName="min-h-[200px] max-h-[400px]"
          invalid={!!errorMessage}
          maxLength={1000}
          placeholder={placeholder}
          {...register(fieldName)}
        />
      </div>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {helpText && <Description>{helpText}</Description>}
    </Field>
  );
}

export function ObservationFormDoubleField({
  className,
  errorMessage,
  fieldNames,
  label,
  inputLabels,
  unit,
  hoverCardContent,
  inputType = "text",
  valueAsNumber = false,
  register,
}: {
  className?: string;
  errorMessage?: string;
  fieldNames: [keyof ObservationFormData, keyof ObservationFormData];
  label: string;
  inputLabels: [string, string];
  unit?: string;
  hoverCardContent?: ReactNode;
  inputType?: string;
  valueAsNumber?: boolean;
  register: UseFormRegister<ObservationFormData>;
}) {
  return (
    <Field className={twMerge("space-y-3", className)}>
      <div className="w-min overflow-visible whitespace-nowrap">
        {hoverCardContent ? (
          <HoverCard
            triggerContent={
              <Label className="group flex w-min items-center space-x-1 whitespace-nowrap font-medium hover:text-brand-blue-600">
                <QuestionMarkCircleIcon className="size-4 flex-shrink-0 fill-brand-blue-500" />
                <span>{label}</span>
              </Label>
            }
          >
            {hoverCardContent}
          </HoverCard>
        ) : (
          <Label className="flex items-center space-x-1 font-medium">
            {label}
          </Label>
        )}
      </div>
      <div className="flex justify-center gap-6">
        <div className="relative flex flex-1 items-baseline justify-center gap-6">
          <Label className="sm:text-zinc-500 sm:dark:text-zinc-400">
            {inputLabels[0]}
          </Label>
          <Input
            type={inputType}
            unit={unit}
            {...register(fieldNames[0], { valueAsNumber })}
          />
        </div>
        <div className="relative flex flex-1 items-baseline justify-center gap-6">
          <Label className="sm:text-zinc-500 sm:dark:text-zinc-400">
            {inputLabels[1]}
          </Label>
          <Input
            type={inputType}
            unit={unit}
            {...register(fieldNames[1], { valueAsNumber })}
          />
        </div>
      </div>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Field>
  );
}
