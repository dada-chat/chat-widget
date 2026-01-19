import clsx from "clsx";
import styles from "./form.module.css";

interface FormInputProps {
  label?: string;
  type?: "text" | "email";
  value: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function FormInput({
  label,
  type = "text",
  value,
  placeholder,
  required = false,
  disabled = false,
  onChange,
  onKeyDown,
  error,
}: FormInputProps) {
  return (
    <div className={styles.formInput}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={onKeyDown}
      />
      {error && (
        <p className={clsx(styles.helper, error && styles.helperError)}>
          {error}
        </p>
      )}
    </div>
  );
}
