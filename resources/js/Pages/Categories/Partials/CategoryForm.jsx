import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from '@inertiajs/react'
import toast from "react-hot-toast"

export function CategoryForm({ category }) {
    const { put, data, setData, post, processing, errors, reset } = useForm(category || {
        name: '',
        description: '',
    });

    function onFinish(e) {
        e.preventDefault();
        if (category) {
            put(route('categories.update', category.id), {
                onSuccess: toast.success('Category has been updated')
            })
        } else {
            post(route('categories.store'), {
                onFinish: reset(),
                onSuccess: toast.success('New category created!'),
            });
        }
    }

    return (
        <form onSubmit={onFinish}>
            <div className="mb-4">
                <InputLabel htmlFor="name" value="Name" className="mb-2" />
                <TextInput name="name" id="name" value={data.name}
                    onChange={e => setData('name', e.target.value)} className="w-full" />
                {errors.name && <span className="text-xs text-red-400">{errors.name}</span>}
            </div>
            <div>
                <InputLabel htmlFor="description" value="Description" className="mb-2" />
                <TextInput name="description" id="description" value={data.description}
                    onChange={e => setData('description', e.target.value)} className="w-full" />
                {errors.description && <span className="text-xs text-red-400">{errors.description}</span>}
            </div>
            {category ?
                <div className="flex items-center justify-between mt-4">
                    <PrimaryButton type="submit">{processing ? 'Updating...' : 'Update'}</PrimaryButton>
                    <Link className="text-red-500 hover:underline" href={route('categories.destroy', category.id)} method="delete">Delete category</Link>
                </div>
                : <PrimaryButton type="submit">{processing ? 'Creating...' : 'Create'}</PrimaryButton>}
        </form>
    )
}
