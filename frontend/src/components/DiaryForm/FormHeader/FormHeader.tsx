import './FormHeader.css';

interface FormHeaderProps {
  title: string;
  subtitle: string;
}

export const FormHeader = ({ title, subtitle }: FormHeaderProps) => {
  return (
    <div className="form-header">
      <h2>{title}</h2>
      <p className="form-subtitle">{subtitle}</p>
    </div>
  );
};

