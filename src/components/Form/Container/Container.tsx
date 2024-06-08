import styles from "./Container.module.css";

type FormContainerProps = {
  children: React.ReactNode;
};

export default function FormContainer({ children }: FormContainerProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>{children}</div>
      </div>
    </div>
  );
}
