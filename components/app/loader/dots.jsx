import styles from "./dots.module.css";

export default function Dots({ tw = "bg-stone-500" }) {
  return (
    <span className={`${styles.loading} p-2.5`}>
      <span className={tw} />
      <span className={tw} />
      <span className={tw} />
    </span>
  );
}
