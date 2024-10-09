import { useEffect, useState } from "react"
import { UserCard } from "../components/user-card"

type Geo = {
    lat: string
    lng: string
}

type Address = {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: Geo

}
type Company = {
    name: string
    catchPhrase: string
    bs: string
}

interface User {
    id: string
    name: string
    username: string
    email: string
    address: Address
    phone: string
    website: string
    company: Company
}

const Home = () => {
    const [users, setUsers] = useState<User[]>()

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')

            if (!response.ok) {
                throw new Error('Failed to fetch users!')
            }

            const data = await response.json()

            setUsers(data)
        } catch (error) {
            console.error('Failed to fetch user!', error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <article className="space-y-3 px-16 py-5">
            <h1 className="font-bold text-sm">Список пользователей</h1>

            {users && (
                <div className="space-y-2.5">
                    <div className="space-y-3">

                        {users.map((user) => (
                            <UserCard
                                key={user.id}
                                id={user.id}
                                fullName={user.name}
                                city={user.address.city}
                                company={user.company.name}
                            />
                        ))}

                    </div>
                    <h2 className="text-xs text-end">Найдено {users?.length} пользователей</h2>
                </div>
            )}

        </article>
    )
}

export default Home
