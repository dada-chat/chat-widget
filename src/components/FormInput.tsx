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
        className={clsx(
          "relative block w-full h-12 rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none",
          disabled && "bg-gray-200 !text-gray-500"
        )}
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
