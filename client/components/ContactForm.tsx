import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@shared/contact";
import type { ContactResponse } from "@shared/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  async function onSubmit(data: ContactFormValues) {
    setSubmitting(true);
    try {
      const payload = {
        name: data.name.trim(),
        email: data.email.trim(),
        message: data.message.trim(),
        ...(data.phone?.trim() ? { phone: data.phone.trim() } : {}),
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as ContactResponse;
      if (!res.ok || !json.ok) {
        const firstField = json.fieldErrors && Object.values(json.fieldErrors).flat()[0];
        toast.error(firstField || json.error || "Could not send message");
        return;
      }
      toast.success(json.message ?? "Message sent.");
      reset();
    } catch {
      toast.error("Network error — try again or email me directly.");
    } finally {
      setSubmitting(false);
    }
  }

  const fieldClass =
    "rounded-none border-portfolio-gray/40 bg-[#282C33] text-white placeholder:text-portfolio-gray/60 focus-visible:border-portfolio-primary focus-visible:ring-portfolio-primary/40";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="contact-name" className="font-mono text-xs uppercase tracking-wider text-portfolio-gray">
          Name
        </Label>
        <Input id="contact-name" autoComplete="name" className={cn(fieldClass)} {...register("name")} />
        {errors.name && <p className="font-mono text-xs text-red-400">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-email" className="font-mono text-xs uppercase tracking-wider text-portfolio-gray">
            Email
          </Label>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            className={cn(fieldClass)}
            {...register("email")}
          />
          {errors.email && <p className="font-mono text-xs text-red-400">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-phone" className="font-mono text-xs uppercase tracking-wider text-portfolio-gray">
            Phone <span className="text-portfolio-gray/60">(optional)</span>
          </Label>
          <Input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 …"
            className={cn(fieldClass)}
            {...register("phone")}
          />
          {errors.phone && <p className="font-mono text-xs text-red-400">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message" className="font-mono text-xs uppercase tracking-wider text-portfolio-gray">
          Message
        </Label>
        <Textarea
          id="contact-message"
          rows={6}
          className={cn(fieldClass, "min-h-[140px] resize-y")}
          placeholder="Tell me about your project, role, or question…"
          {...register("message")}
        />
        {errors.message && <p className="font-mono text-xs text-red-400">{errors.message.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full rounded-none border-2 border-portfolio-primary bg-portfolio-primary/20 font-mono text-sm font-semibold uppercase tracking-widest text-white hover:bg-portfolio-primary/30 sm:w-auto"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}
