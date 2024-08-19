import Navbar from "@/components/navbar";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="pt-20 px-8 pb-8">{children}</div>
    </>
  );
}
