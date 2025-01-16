import { Button, Fieldset, Text } from "@/shared/ui";
import { useAuthState, useCreateSupportTicket } from "@/shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z, ZodType } from "zod";
import { SupportFormFieldInput } from "./SupportFormFieldInput";
import { SupportFormFieldTextArea } from "./SupportFormFieldTextArea";

import type { SupportFormData } from "./types";

import { FORM_ERROR_MESSAGES } from "./constants/FormErrorMessages";

const FormSchema: ZodType<SupportFormData> = z.object({
  user_uid: z.string().uuid(),
  name: z
    .string({
      required_error: FORM_ERROR_MESSAGES.NAME,
    })
    .min(1, FORM_ERROR_MESSAGES.NAME),
  email: z.string({ required_error: FORM_ERROR_MESSAGES.EMAIL }).email(),
  phone: z
    .string({ required_error: FORM_ERROR_MESSAGES.PHONE })
    .min(1, FORM_ERROR_MESSAGES.PHONE),
  message: z.string(),
});

export function SupportForm() {
  const { isLoading, isSuccess, createSupportTicket } =
    useCreateSupportTicket();
  const { user } = useAuthState();

  const { formState, register, handleSubmit } = useForm<SupportFormData>({
    resolver: zodResolver(FormSchema),
    values: {
      user_uid: user?.uid || "",
      email: user?.email || "",
      name: "",
      phone: "",
      message: "",
    },
  });

  async function onFormSubmit(data: SupportFormData) {
    try {
      await createSupportTicket(data);
      toast.success("Support ticket submitted");
    } catch (error) {
      toast.error("Failed to submit support ticket");
    }
  }

  function onFormError() {
    toast.error("Failed to submit support ticket");
  }

  return (
    <form
      className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
      method="POST"
      onSubmit={handleSubmit(onFormSubmit, onFormError)}
    >
      <div className="mx-auto max-w-xl lg:max-w-lg xl:pr-0">
        {!isSuccess && (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 10 }}
            initial={{ opacity: 0 }}
            key="form"
            transition={{ duration: 0.5 }}
          >
            <Fieldset className="space-y-6" disabled={isLoading || isSuccess}>
              <SupportFormFieldInput
                errorMessage={formState.errors.name?.message}
                fieldName="name"
                label="Name"
                register={register}
              />
              <SupportFormFieldInput
                errorMessage={formState.errors.email?.message}
                fieldName="email"
                label="Email"
                register={register}
              />
              <SupportFormFieldInput
                errorMessage={formState.errors.phone?.message}
                fieldName="phone"
                label="Phone"
                register={register}
              />
              <SupportFormFieldTextArea
                errorMessage={formState.errors.message?.message}
                fieldName="message"
                label="Message"
                register={register}
              />
              <div className="mt-8 flex justify-end">
                <Button disabled={isLoading || isSuccess} type="submit">
                  Send message
                </Button>
              </div>
            </Fieldset>
          </motion.div>
        )}
        {isSuccess && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0, y: 10 }}
            key="successMessage"
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Text>
              Your message has been submitted.
              <br /> Most responses occur within 12 hours of message receipt.
            </Text>
          </motion.div>
        )}
      </div>
    </form>
  );
}
