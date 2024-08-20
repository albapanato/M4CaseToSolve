"use client";
import MailValidationForm from "@/app/components/MailValidationForm";
import ImageBg from "@/app/components/ImageBg";

export default function MailValidationPage() {
  return (
    <div className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32 text-gray-900">
        <MailValidationForm />
      </div>
    </div>
  );
}
