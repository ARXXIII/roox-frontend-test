import { Input } from "../components/input"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "../components/button"

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

const User = () => {
    const { id } = useParams<{ id: string }>()

    const [isReadOnly, setIsReadOnly] = useState<boolean>(true)
    const [name, setName] = useState<string>()
    const [userName, setUserName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [street, setStreet] = useState<string>()
    const [city, setCity] = useState<string>()
    const [zipCode, setZipCode] = useState<string>()
    const [phone, setPhone] = useState<string>()
    const [website, setWebsite] = useState<string>()
    const [comment, setComment] = useState<string>()

    const fetchUser = async (id: string) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

            if (!response.ok) {
                throw new Error('Failed to fetch user!')
            }

            const data = await response.json()

            setName(data.name)
            setUserName(data.username)
            setEmail(data.email)
            setStreet(data.address.street)
            setCity(data.address.city)
            setZipCode(data.address.zipcode)
            setPhone(data.phone)
            setWebsite(data.website)
        } catch (error) {
            console.error('Failed to fetch user!', error)
        }
    }

    useEffect(() => {
        if (id) {
            fetchUser(id)
        }
    }, [id])


    return (
        <article className="space-y-3 px-16 py-5">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-sm">Профиль пользователя</h1>
                <Button onClick={() => setIsReadOnly(false)}>Редактировать</Button>
            </div>
            <div className="space-y-2.5 px-3 py-5 border rounded-lg">
                <Input
                    id='name'
                    label='Name'
                    placeholder='Иван Иванов'
                    autoComplete='cc-name'
                    readOnly={isReadOnly}
                    value={name!}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    id="userName"
                    label="User Name"
                    placeholder="Ivan"
                    autoComplete="username"
                    readOnly={isReadOnly}
                    value={userName!}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <Input
                    type="email"
                    id="email"
                    label="E-mail"
                    placeholder="example@mail.com"
                    readOnly={isReadOnly}
                    value={email!}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    id="street"
                    label="Street"
                    autoComplete="street-address"
                    placeholder="ул. Пример"
                    readOnly={isReadOnly}
                    value={street!}
                    onChange={(e) => setStreet(e.target.value)}
                />
                <Input
                    id="city"
                    label="City"
                    placeholder="Москва"
                    readOnly={isReadOnly}
                    value={city!}
                    onChange={(e) => setCity(e.target.value)}
                />
                <Input
                    id="zipCode"
                    label="Zip Code"
                    autoComplete="postal-code"
                    placeholder="1234234"
                    readOnly={isReadOnly}
                    value={zipCode!}
                    onChange={(e) => setZipCode(e.target.value)}
                />
                <Input
                    type="tel"
                    id="phone"
                    label="Phone"
                    placeholder="89991112233"
                    autoComplete="tel"
                    readOnly={isReadOnly}
                    value={phone!}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                    id="website"
                    label="Website"
                    placeholder="www.example.com"
                    readOnly={isReadOnly}
                    value={website!}
                    onChange={(e) => setWebsite(e.target.value)}
                />
                <div className="space-y-1">
                    <label htmlFor="comment" className="block">Comment</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="px-2.5 py-1 min-w-[420px] min-h-14 text-xs border rounded-md"
                    />
                </div>
            </div>
        </article>
    )
}

export default User
