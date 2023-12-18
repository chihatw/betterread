import CountDown from "@/features/temp/components/CountDown";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-xl pb-20">
      <CountDown />
      {children}
    </div>
  );
}
