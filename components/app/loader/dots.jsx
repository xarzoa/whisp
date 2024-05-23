import styles from './dots.module.css';

export default function Dots({ tw = 'bg-stone-500', className }) {
  return (
    <span className={`${styles.loading} p-2`}>
      <span className={tw} />
      <span className={tw} />
      <span className={tw} />
    </span>
  );
}
