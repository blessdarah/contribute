import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from '@inertiajs/react'
import toast from "react-hot-toast"

export function ProjectForm({ project }) {
    const projectStatuses = ["open", "closed", "reopened"];

    const { put, data, setData, post, processing, errors, reset } = useForm(project || {
        name: '',
        description: '',
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
            {project ?
                <div className="flex items-center justify-between">
                    <PrimaryButton type="submit">{processing ? 'Updating...' : 'Update'}</PrimaryButton>
                    <Link className="text-red-500 hover:underline" href={route('projects.destroy', project.id)} method="delete">Delete project</Link>
                </div>
                : <PrimaryButton type="submit">{processing ? 'Creating...' : 'Create'}</PrimaryButton>}
        </form>
    )
}
