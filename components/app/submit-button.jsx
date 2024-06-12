"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import Spinner from "./loader";

export default function SubmitButton({
  className,
  disabled,
  childern,
  tw,
  ...props
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={disabled || pending}
      className={className}
      {...props}
    >
      {pending ? <Spinner tw={tw} /> : [childern]}
    </Button>
  );
}
