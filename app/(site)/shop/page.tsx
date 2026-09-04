import { Suspense } from "react";
import ShopContent from "./ShopContent";

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="px-[5vw] py-20 text-sm opacity-60">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
