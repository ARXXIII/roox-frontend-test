import clsx from "clsx"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import { fetchUserById, updateUser } from "../store/users-slice"

import { Input } from "../components/input"
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
    id: number
    name: string
    username: string
    email: string
    address: Address
    phone: string
    website: string
    company: Company
    comment?: string
}

const UserPage = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch: AppDispatch = useDispatch()

    const user = useSelector((state: RootState) => state.users.users.find(u => u.id === Number(id)))

    const [name, setName] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [street, setStreet] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [zipcode, setZipcode] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [website, setWebsite] = useState<string>('')
    const [comment, setComment] = useState<string>('')
    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    const setStates = (source: User) => {
        setName(source.name)
        setUsername(source.username)
        setEmail(source.email)
        setStreet(source.address.street)
        setCity(source.address.city)
        setZipcode(source.address.zipcode)
        setPhone(source.phone)
        setWebsite(source.website)
        setComment(source.comment!)
    }

    const [errors, setErrors] = useState({
        name: false,
        username: false,
        email: false,
        street: false,
        city: false,
        zipcode: false,
        phone: false,
        website: false,
    })

    const handleSave = () => {
        if (validateForm() && user) {
            const updatedUser = {
                ...user,
                name,
                username,
                email,
                address: {
                    street,
                    city,
                    zipcode,
                    suite: user.address.suite,
                    geo: {
                        lat: user.address.geo.lat,
                        lng: user.address.geo.lng
                    }
                },
                phone,
                website,
                comment,
            }

            dispatch(updateUser(updatedUser))
            setIsDisabled(true)
            console.log('UPDATED USER', updatedUser)
        }
    }

    const validateForm = () => {
        const newErrors = {
            name: !name,
            username: !username,
            email: !email,
            street: !street,
            city: !city,
            zipcode: !zipcode,
            phone: !phone,
            website: !website,
        }

        setErrors(newErrors)

        return Object.values(newErrors).every(error => !error)
    }

    useEffect(() => {
        if (!user) {
            dispatch(fetchUserById(Number(id)))
        } else {
            setStates(user)
        }
    }, [dispatch, id, user])


    return (
        <article className="space-y-3 px-16 py-5">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-sm">Профиль пользователя</h1>
                <Button onClick={() => setIsDisabled(false)}>Редактировать</Button>
            </div>
            <form className="space-y-8 px-3 py-5 border rounded-lg">
                <div className="space-y-2.5">
                    <Input
                        id='name'
                        label='Name'
                        placeholder='Иван Иванов'
                        autoComplete='cc-name'
                        disabled={isDisabled}
                        error={errors.name}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        id="userName"
                        label="User Name"
                        placeholder="Ivan"
                        autoComplete="username"
                        disabled={isDisabled}
                        error={errors.username}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        type="email"
                        id="email"
                        label="E-mail"
                        placeholder="example@mail.com"
                        disabled={isDisabled}
                        error={errors.email}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        id="street"
                        label="Street"
                        autoComplete="street-address"
                        placeholder="ул. Пример"
                        disabled={isDisabled}
                        error={errors.street}
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                    <Input
                        id="city"
                        label="City"
                        placeholder="Москва"
                        disabled={isDisabled}
                        error={errors.city}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <Input
                        id="zipCode"
                        label="Zip Code"
                        autoComplete="postal-code"
                        placeholder="1234234"
                        disabled={isDisabled}
                        error={errors.zipcode}
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                    />
                    <Input
                        type="tel"
                        id="phone"
                        label="Phone"
                        placeholder="89991112233"
                        autoComplete="tel"
                        disabled={isDisabled}
                        error={errors.phone}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <Input
                        id="website"
                        label="Website"
                        placeholder="www.example.com"
                        disabled={isDisabled}
                        error={errors.website}
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                    <div className="space-y-1">
                        <label htmlFor="comment" className="block">Comment</label>
                        <textarea
                            id="comment"
                            value={comment}
                            disabled={isDisabled}
                            onChange={(e) => setComment(e.target.value)}
                            className={clsx("px-2.5 py-1 min-w-[420px] min-h-14 text-xs border rounded-md",
                                isDisabled && 'text-neutral-200'
                            )}
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button
                        variant='send'
                        disabled={isDisabled}
                        onClick={handleSave}
                    >
                        Отправить
                    </Button>
                </div>
            </form>
        </article>
    )
}

export default UserPage
