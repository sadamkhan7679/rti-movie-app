import React from "react";
import styles from "./styles.module.css";

export const MovieGridSkeleton: React.FC = () => {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.skeleton}></div>
        </div>
      ))}
    </div>
  );
};
