const announcements = [
  "FREE SHIPPING ON ORDERS OVER $150 — SHOP NOW",
  "NEW WINTER COLLECTION JUST DROPPED — EXPLORE NOW",
  "USE CODE MODO20 FOR 20% OFF YOUR FIRST ORDER",
  "FREE RETURNS WITHIN 30 DAYS — SHOP WITH CONFIDENCE",
];

export function AnnouncementBar() {
  return (
    <div className="bg-brand-dark text-white py-2.5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...announcements, ...announcements].map((text, index) => (
          <span key={index} className="inline-flex items-center mx-8">
            <span className="text-xs tracking-[0.15em] uppercase font-medium">
              {text}
            </span>
            <span className="mx-8 text-white/40">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
