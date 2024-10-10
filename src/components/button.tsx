import clsx from "clsx"

type ButtonProps = {
    children: React.ReactNode
    variant?: string
    disabled?: boolean,
    onClick?: () => void
}

export const Button = ({ children, onClick, variant, disabled }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                "px-4 py-1 text-xs text-white rounded-md shrink-0",
                disabled
                    ? "bg-neutral-200"
                    : variant === "send"
                        ? "bg-green-500"
                        : "bg-[#4B51EF]"
            )}
        >
            {children}
        </button>
    )
}