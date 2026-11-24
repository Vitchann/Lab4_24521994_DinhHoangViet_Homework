
import { CATEGORIES } from "../data/photos";

export default function CategoryFilter({
  category,
  onChange,
}) {
  return (
    <nav
      className="category-filter"
      aria-label="Photo categories"
    >
      {CATEGORIES.map((item) => (
        <button
          key={item.id}
          type="button"
          className={
            category === item.id
              ? "filter-button selected"
              : "filter-button"
          }
          aria-pressed={category === item.id}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
