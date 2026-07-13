import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const dynamic = "force-dynamic";

export default function ResetPassword() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center text-white">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
