import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-8xl font-serif font-bold text-gray-100 mb-4 select-none">
        404
      </p>
      <h1 className="text-2xl font-serif font-bold tracking-tight uppercase mb-3">
        Page Not Found
      </h1>
      <p className="text-sm text-gray-500 mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Button asChild className="bg-brand-dark text-white h-11 px-8 text-xs tracking-widest">
          <Link href="/">Go Home</Link>
        </Button>
        <Button asChild variant="outline" className="border-brand-dark h-11 px-8 text-xs tracking-widest">
          <Link href="/products">Shop Now</Link>
        </Button>
      </div>
    </div>
  );
}
