const URGENCY_MAP = {
  critical: {
    bg: "bg-red-500",
    text: "text-white",
    label: "Critical",
  },
  urgent: {
    bg: "bg-orange-500",
    text: "text-white",
    label: "Urgent",
  },
  normal: {
    bg: "bg-blue-500",
    text: "text-white",
    label: "Normal",
  },
};

const UrgencyBadge = ({ urgency = "normal" }) => {
  const style = URGENCY_MAP[urgency] || URGENCY_MAP.normal;

  return (
    <span
      className={`${style.bg} ${style.text} px-3 py-1.5 rounded-full text-xs font-bold uppercase inline-flex items-center`}
    >
      {style.label}
    </span>
  );
};

export default UrgencyBadge;
