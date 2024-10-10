import { Link } from "react-router-dom"

type UserCardProps = {
    id: number
    fullName: string
    city: string
    company: string
}

export const UserCard = ({ id, fullName, city, company }: UserCardProps) => {
    return (
        <Link to={`/user/${id}`} className="flex justify-between items-end min-w-[420px] p-2.5 text-sm rounded-lg bg-neutral-200">
            <div className="space-y-2">
                <div className="flex gap-x-2">
                    <h1 className="text-neutral-400">ФИО:</h1>
                    <p>{fullName}</p>
                </div>
                <div className="flex gap-x-2">
                    <h1 className="text-neutral-400">Город:</h1>
                    <p>{city}</p>
                </div>
                <div className="flex gap-x-2">
                    <h1 className="text-neutral-400">Компания:</h1>
                    <p>{company}</p>
                </div>
            </div>
            <p className="text-[#4B51EF]">Подробнее</p>
        </Link>
    )
}