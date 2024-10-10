import { useDispatch } from "react-redux"
import { sortByCity, sortByCompany } from "../store/users-slice"

import { Button } from "./button"

export const Option = () => {
    const dispatch = useDispatch()

    return (
        <aside className="space-y-3 h-full px-6 py-5 bg-[#BDBDBD]">
            <h1 className="text-xs">Сортировка</h1>
            <div className="flex flex-col gap-y-3">
                <Button onClick={() => dispatch(sortByCity())}>
                    По городу
                </Button>
                <Button onClick={() => dispatch(sortByCompany())}>
                    По компании
                </Button>
            </div>
        </aside>
    )
}