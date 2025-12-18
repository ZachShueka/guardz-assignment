import { useWatch } from 'react-hook-form';
import type { UseFormRegister, FieldErrors, FieldValues, Path, Control } from 'react-hook-form';
import './FormField.css';
import { useMemo } from 'react';

type FormFieldProps<T extends FieldValues> = {
  id: string;
  name: Path<T>;
  label: string;
  placeholder: string;
  register: UseFormRegister<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
  maxLength: number;
  isTextarea?: boolean;
  rows?: number;
}

export const FormField = <T extends FieldValues>({
  id,
  name,
  label,
  placeholder,
  register,
  control,
  errors,
  disabled = false,
  maxLength,
  isTextarea = false,
  rows = 8,
}: FormFieldProps<T>) => {
  const value:string = useWatch({ control, name }) ?? '';
  const error = useMemo(() => errors[name], [errors, name]);

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        <span>
          {label}
          <span className="required">*</span>
        </span>
        <span className="char-count">{value.length}/{maxLength}</span>
      </label>

      {isTextarea ? (
        <textarea
          id={id}
          {...register(name)}
          className={`form-textarea ${error ? 'error' : ''}`}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          maxLength={maxLength}
        />
      ) : (
        <input
          id={id}
          type="text"
          {...register(name)}
          className={`form-input ${error ? 'error' : ''}`}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
        />
      )}

      <span className="error-message">
        {error && typeof error.message === 'string' && error.message.length > 0 ? error.message : '\u00A0'}
      </span>
    </div>
  );
};

