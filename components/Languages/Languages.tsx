"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Languages = () => {
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="py-5 px-10" variant="outline" size="icon">
          {pathname === "/en" ? "English" : "العربية"}
          <span className="sr-only">Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href="/ar" className="flex gap-2" dir="rtl">
          <Image
            src="/ar-flag.png"
            alt="arabic"
            width={24}
            height={24}
            className="object-contain"
          />
          <DropdownMenuItem>العربية</DropdownMenuItem>
        </Link>
        <Link href="/en" className="flex gap-2" dir="ltr">
          <Image
            src="/en-flag.png"
            alt="english"
            width={24}
            height={24}
            className="object-contain"
          />
          <DropdownMenuItem>English</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default Languages;
