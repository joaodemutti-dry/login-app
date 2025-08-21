"use client"
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {   
      router.push("/dashboard");
    } else {
      router.push("/login")
    }
  }, [status]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="animate-spin"/>
    </div>
  );
}
