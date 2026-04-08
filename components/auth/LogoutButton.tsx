"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";

export default function LogoutButton() {
  const router = useRouter();
  const { pushToast } = useToast();

  async function handleLogout() {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!response.ok) {
      pushToast("Failed to logout. Please try again.", "error");
      return;
    }

    pushToast("Logged out successfully", "success");
    router.push("/login");
    router.refresh();
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleLogout}>
      Logout
    </Button>
  );
}

