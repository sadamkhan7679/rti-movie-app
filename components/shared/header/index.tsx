"use client";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { BackArrowIcon } from "@/icons/common/back-arrow.icon";
import { MoreIcon } from "@/icons/common/more.icon";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showMenu?: boolean;
}

export const Header = ({
  title,
  showBackButton = false,
  showMenu = true,
}: HeaderProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <header className={styles.header}>
      {showBackButton && (
        <button
          className={styles.backButton}
          onClick={handleBackClick}
          aria-label="Go back"
        >
          <BackArrowIcon />
        </button>
      )}
      <h1 className={styles.title}>{title}</h1>
      {showMenu && (
        <button className={styles.menuButton} aria-label="Menu">
          <MoreIcon />
        </button>
      )}
    </header>
  );
};
