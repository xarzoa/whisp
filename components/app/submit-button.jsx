"use client";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import Dots from "./loader/dots";

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
      className={`font-jbmono ${className}`}
      {...props}
    >
      {pending ? <Dots tw={tw} /> : [childern]}
    </Button>
  );
}
