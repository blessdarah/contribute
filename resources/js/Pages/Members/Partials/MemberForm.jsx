import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from '@inertiajs/react'

export function MemberForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        contact: '',
        address: '',
        music_part: '',
        gender: 'male',
        group_post: ''
    });

    function onFinish(e) {
        e.preventDefault();

        post(route('members.store'), {
            onFinish: reset()
        });
    }

    return (
        <form onSubmit={onFinish}>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <InputLabel htmlFor="first_name" value="First name" className="mb-2" />
                    <TextInput name="first_name" id="first_name" value={data.first_name}
                        onChange={e => setData('first_name', e.target.value)} className="w-full" />
                    {errors.first_name && <span className="text-xs text-red-400">{errors.first_name}</span>}
                </div>
                <div>
                    <InputLabel htmlFor="last_name" value="Last name" className="mb-2" />
                    <TextInput name="last_name" id="last_name" value={data.last_name}
                        onChange={e => setData('last_name', e.target.value)} className="w-full" />
                    {errors.last_name && <span className="text-xs text-red-400">{errors.last_name}</span>}
                </div>
                <div>
                    <InputLabel htmlFor="contact" value="Contact" className="mb-2" />
                    <TextInput name="contact" id="contact" value={data.contact} onChange={e => setData('contact', e.target.value)} className="w-full" />
                    {errors.contact && <span className="text-xs text-red-400">{errors.contact}</span>}
                </div>
                <div>
                    <InputLabel htmlFor="address" value="Address" className="mb-2" />
                    <TextInput name="address" id="address" value={data.address} onChange={e => setData('address', e.target.value)} className="w-full" />
                    {errors.address && <span className="text-xs text-red-400">{errors.address}</span>}
                </div>
                <div>
                    <InputLabel htmlFor="gender" value="Gender" className="mb-2" />
                    <select name="gender" id="gender" onChange={e => setData('gender', e.target.value)} className="w-full rounded-md bg-gray-900 border border-gray-700">
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>
                    {errors.gender && <span className="text-xs text-red-400">{errors.gender}</span>}
                </div>
                <div>
                    <InputLabel htmlFor="music_part" value="Music part" className="mb-2" />
                    <select name="music_part" id="music_part" onChange={e => setData('music_part', e.target.value)} className="w-full rounded-md bg-gray-900 border border-gray-700">
                        <option value="soprano">soprano</option>
                        <option value="alto">alto</option>
                        <option value="tenor">tenor</option>
                        <option value="bass">bass</option>
                    </select>
                </div>
            </div>
            <PrimaryButton type="submit" className="mt-4">{processing ? 'loding...' : 'Submit'}</PrimaryButton>
        </form>
    )
}
