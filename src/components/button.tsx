type ButtonProps = {
    children: React.ReactNode
    onClick?: () => void
}

export const Button = ({ children, onClick }: ButtonProps) => {
    return (
        <button onClick={onClick} className="px-4 py-1 text-xs text-white rounded-md bg-[#4B51EF] shrink-0">
            {children}
        </button>
    )
}