import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from '@inertiajs/react'
import toast from "react-hot-toast"

export function ProjectForm({ project, categories }) {
    const projectStatuses = ["open", "closed", "reopened"];

    const { put, data, setData, post, processing, errors, reset } = useForm(project || {
        description: '',
        category_id: '',
        target_amount: 0,
        status: projectStatuses.at(0),
    });

    function onFinish(e) {
        e.preventDefault();
        if (project) {
            put(route('projects.update', project.id), {
                onSuccess: toast.success('Project has been updated')
            })
        } else {
            post(route('projects.store'), {
                onFinish: reset(),
                onSuccess: toast.success('New project created!'),
            });
        }
    }

    return (
        <form onSubmit={onFinish} className="space-y-4">
            <div>
                <InputLabel htmlFor="description" value="Description" className="mb-2" />
                <TextInput name="description" id="description" value={data.description}
                    onChange={e => setData('description', e.target.value)} className="w-full" />
                {errors.description && <span className="text-xs text-red-400">{errors.description}</span>}
            </div>
            <div>
                <InputLabel htmlFor="target_amount" value="Target amount" className="mb-2" />
                <TextInput type="number" min={0} name="target_amount" id="target_amount" value={data.target_amount}
                    onChange={e => setData('target_amount', e.target.value)} className="w-full" />
                {errors.target_amount && <span className="text-xs text-red-400">{errors.target_amount}</span>}
            </div>
            <div>
                <InputLabel htmlFor="category" value="category" className="mb-2" />
                <select name="category_id" id="category" value={data.category}
                    onChange={e => setData('category_id', e.target.value)} className="w-full rounded-md border-gray-300">
                    {categories.map(item => (
                        <option value={item.id} key={item.id}>{item.name}</option>
                    ))}
                </select>
                {errors.category && <span className="text-xs text-red-400">{errors.category}</span>}
            </div>
            {categories && categories.length > 0 &&
                <div>
                    <InputLabel htmlFor="status" value="status" className="mb-2" />
                    <select name="status" id="status" value={data.status}
                        onChange={e => setData('status', e.target.value)} className="w-full rounded-md border-gray-300">
                        {projectStatuses.map(item => (
                            <option value={item} key={item}>{item}</option>
                        ))}
                    </select>
                    {errors.status && <span className="text-xs text-red-400">{errors.status}</span>}
                </div>
            }
            {project ?
                <div className="flex items-center justify-between">
                    <PrimaryButton type="submit">{processing ? 'Updating...' : 'Update'}</PrimaryButton>
                    <Link className="text-red-500 hover:underline" href={route('projects.destroy', project.id)} method="delete" as="button">Delete project</Link>
                </div>
                : <PrimaryButton type="submit">{processing ? 'Creating...' : 'Create'}</PrimaryButton>}
        </form>
    )
}
