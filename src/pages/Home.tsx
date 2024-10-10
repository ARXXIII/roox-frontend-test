import { useEffect } from "react"
import { fetchUsers } from "../store/users-slice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store/store"

import { UserCard } from "../components/user-card"

const HomePage = () => {
    const dispatch: AppDispatch = useDispatch()
    const users = useSelector((state: RootState) => state.users.users);

    useEffect(() => {
        if (users.length === 0) {
            dispatch(fetchUsers())
        }
    }, [dispatch, users.length])

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

export default HomePage
