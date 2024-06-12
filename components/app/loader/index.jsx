'use client'
import styles from './spinner.module.css';
import { cn } from '@/lib/utils';

export default function Spinner({ className }) {
  return (
    <div className="flex relative justify-center items-center">
      <div className={cn(styles.spinner, "size-5", className)}> 
        {[...Array(8)].map((_, index) => (
          <span key={index} className={styles.spinnerLeaf} />
        ))}
      </div>
    </div>
  );
}