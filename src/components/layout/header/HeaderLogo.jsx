import Image from "next/image";
import Link from "next/link";
import { defaultGeneralInfo } from "@/config";
import { getFileUrl } from "@/lib/utils";

export function HeaderLogo() {
  const companyName = defaultGeneralInfo.company_name || "BME";
  const imageSrc = getFileUrl(defaultGeneralInfo.logo);

  return (
    <Link
      href="/"
      className="flex w-[130px] shrink-0 items-center sm:w-[150px] md:w-[170px] xl:w-[200px]"
      aria-label={companyName}
    >
      <Image
        src={imageSrc}
        alt={companyName}
        width={210}
        height={64}
        className="h-auto max-h-14 w-full object-contain object-left"
        priority
        unoptimized
      />
    </Link>
  );
}
