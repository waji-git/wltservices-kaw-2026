// import { Logs } from "lucide-react";
// import { Logo } from "@/components/shared/logo";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="container flex flex-col items-start md:flex-row md:items-center justify-between gap-4 md:h-24">
      <div className="flex items-center gap-2">
        {/* <Logo className="h-6 w-6" /> */}
        <p className="text-muted-foreground text-left text-sm leading-loose">
          @ 2026 WajiPro All rights reserved
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/terms"
          className="text-muted-foreground hover:text-primary text-sm underline-offset-4 transform"
        >
          terms
        </Link>
        <Link
          href="/privacy"
          className="text-muted-foreground hover:text-primary text-sm underline-offset-4 transform"
        >
          privacy
        </Link>
        <Link
          href="/contact"
          className="text-muted-foreground hover:text-primary text-sm underline-offset-4 transform"
        >
          contact
        </Link>
      </div>
    </div>
  );
}
