import { ErrorMessage, Input } from "@/shared/ui";
import { Field, Label } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/16/solid";
import { UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { SupportFormData } from "./types";

export function SupportFormFieldInput({
  className,
  errorMessage,
  fieldName,
  label,
  placeholder,
  title,
  inputType = "text",
  valueAsNumber = false,
  register,
}: {
  className?: string;
  errorMessage?: string;
  fieldName: keyof SupportFormData;
  label: string;
  placeholder?: string;
  title?: string;
  inputType?: string;
  valueAsNumber?: boolean;
  register: UseFormRegister<SupportFormData>;
}) {
  return (
    <Field className={twMerge("space-y-3", className)}>
      <Label className="flex items-center space-x-1" title={title}>
        {title && (
          <QuestionMarkCircleIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
        )}
        <span>{label}</span>
      </Label>
      <div className="relative">
        <Input
          invalid={!!errorMessage}
          placeholder={placeholder}
          type={inputType}
          {...register(fieldName, { valueAsNumber })}
        />
      </div>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Field>
  );
}
