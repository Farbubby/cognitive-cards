import Navbar from "@/components/navbar";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="pt-20 px-8">{children}</div>
    </>
  );
}
