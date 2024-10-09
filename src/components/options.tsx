import { Button } from "./button"

export const Option = () => {
    return (
        <aside className="space-y-3 h-full px-6 py-5 bg-neutral-500">
            <h1 className="text-xs">Сортировка</h1>
            <div className="flex flex-col gap-y-3">
                <Button>
                    По городу
                </Button>
                <Button>
                    По компании
                </Button>
            </div>
        </aside>
    )
}