import { forwardRef } from "react";

const FormInput = forwardRef(function FormInput(
    {
        label,
        name,
        type = "text",
        required = false,
        placeholder = "",
        error = "",
        ...rest
    },
    ref
) {
    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={name}
                className="font-semibold text-slate-700"
            >
                {label} {required && "*"}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                ref={ref}
                className="border border-slate-300 rounded-lg px-4 py-2"
                {...rest}
            />

            {error && (
                <span className="text-sm text-red-500">
                    {error}
                </span>
            )}
        </div>
    );
});

export default FormInput;

