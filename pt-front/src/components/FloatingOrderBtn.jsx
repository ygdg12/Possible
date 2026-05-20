import { PHONE_BM } from "../data/siteData.js";

export default function FloatingOrderBtn({ Ico }) {
  return (
    <a
      href={`tel:${PHONE_BM}`}
      className="floating-order-btn"
      aria-label={`Call BM Delivery order line ${PHONE_BM}`}
    >
      <Ico name="phone" size={20} strokeWidth={2} />
      <span className="floating-order-label">
        Order <strong>{PHONE_BM}</strong>
      </span>
    </a>
  );
}
