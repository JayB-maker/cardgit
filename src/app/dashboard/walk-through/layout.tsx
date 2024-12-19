import Image from "next/image";
import CardgitLogo from "@/app/views/assets/images/desktop-logo.svg";
import MobileCardgitLogo from "@/app/views/assets/images/mobile-logo.svg";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="relative min-h-screen w-full flex flex-col items-center gap-8 md:gap-16 bg-gray-light py-5 px-4 lg:px-6">
        <div className="w-full flex items-center justify-between">
          <Image
            src={CardgitLogo}
            alt="cardgit-logo"
            className="hidden lg:block"
          />
          <Image
            src={MobileCardgitLogo}
            alt="cardgit-logo"
            className="lg:hidden"
          />
        </div>
        {children}
      </div>
    </>
  );
}
