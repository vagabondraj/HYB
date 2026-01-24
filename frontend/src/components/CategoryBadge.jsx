const CATEGORY_MAP = {
  medicine: {
    bg: "bg-red-100 dark:bg-red-900",
    text: "text-red-700 dark:text-red-300",
    icon: "💊",
  },
  notes: {
    bg: "bg-blue-100 dark:bg-blue-900",
    text: "text-blue-700 dark:text-blue-300",
    icon: "📚",
  },
  sports: {
    bg: "bg-green-100 dark:bg-green-900",
    text: "text-green-700 dark:text-green-300",
    icon: "⚽",
  },
  stationery: {
    bg: "bg-purple-100 dark:bg-purple-900",
    text: "text-purple-700 dark:text-purple-300",
    icon: "✏️",
  },
  food: {
    bg: "bg-orange-100 dark:bg-orange-900",
    text: "text-orange-700 dark:text-orange-300",
    icon: "🍕",
  },
  electronics: {
    bg: "bg-indigo-100 dark:bg-indigo-900",
    text: "text-indigo-700 dark:text-indigo-300",
    icon: "💻",
  },
  books: {
    bg: "bg-yellow-100 dark:bg-yellow-900",
    text: "text-yellow-700 dark:text-yellow-300",
    icon: "📖",
  },
  transport: {
    bg: "bg-cyan-100 dark:bg-cyan-900",
    text: "text-cyan-700 dark:text-cyan-300",
    icon: "🚗",
  },
  other: {
    bg: "bg-gray-100 dark:bg-gray-900",
    text: "text-gray-700 dark:text-gray-300",
    icon: "📦",
  },
};

const formatLabel = (value = "other") =>
  value.charAt(0).toUpperCase() + value.slice(1);

const CategoryBadge = ({ category = "other" }) => {
  const style = CATEGORY_MAP[category] || CATEGORY_MAP.other;

  return (
    <span
      className={`${style.bg} ${style.text} px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-1.5`}
    >
      <span aria-hidden>{style.icon}</span>
      {formatLabel(category)}
    </span>
  );
};

export default CategoryBadge;
