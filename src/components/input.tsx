type InputProps = {
    id: string
    label: string
    type?: string
    placeholder?: string
    autoComplete?: string
    readOnly: boolean
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ id, label, type, placeholder, autoComplete, value, onChange, readOnly }: InputProps) => {
    return (
        <div className="space-y-1 w-fit">
            <label htmlFor={id} className="block text-xs">{label}</label>
            <input
                type={type || 'text'}
                id={id}
                placeholder={placeholder}
                autoComplete={autoComplete}
                readOnly={readOnly}
                value={value}
                onChange={() => onChange}
                className="px-2.5 py-1 min-w-52 text-xs border rounded-md"
            />
        </div>
    )
}