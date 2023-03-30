import { useFormikContext, useField } from 'formik';

export function WideCheckbox({ className, ...props }) {
  const {
    values: { rememberMe }, setFieldValue,
  } = useFormikContext();
  const [field] = useField(props);
  return (
    <div
      onClick={() => setFieldValue(props.name, !rememberMe)}
      className={className}
    >
      <input aria-disabled {...field} {...props} />
      <label htmlFor={props.name}>{props.label}</label>
    </div>
  );
}
