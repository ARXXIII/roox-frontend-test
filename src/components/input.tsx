import clsx from "clsx"

type InputProps = {
    id: string
    label: string
    type?: string
    placeholder?: string
    autoComplete?: string
    disabled: boolean
    error?: boolean
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ id, label, type, placeholder, autoComplete, value, onChange, disabled, error }: InputProps) => {
    return (
        <div className="space-y-1 w-fit">
            <label htmlFor={id} className="block text-xs">{label}</label>
            <input
                type={type || 'text'}
                id={id}
                placeholder={placeholder}
                autoComplete={autoComplete}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={clsx("px-2.5 py-1 min-w-52 text-xs border rounded-md",
                    disabled && 'text-neutral-200',
                    error && 'border-red-500'
                )}
            />
        </div>
    )
}