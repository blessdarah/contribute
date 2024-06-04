import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from '@inertiajs/react'
import { useRef } from "react";
import toast from "react-hot-toast"

export function ContributionForm({ contribution, members, projects }) {
    const projectRef = useRef()
    const amountRef = useRef(0)

    const { put, data, setData, post, processing, errors, reset } = useForm(contribution || {
        amount: '',
        project_id: '',
        member_id: '',
        description: '',
        date: new Date()
    });

    function handleProjectSelect(e) {
        e.preventDefault();
        const pid = Number(e.target.value)
        setData('project_id', e.target.value)
        const selectedProject = projects.find(p => p.id === pid);
        if (selectedProject) {
            amountRef.current.textContent = `Target amount: ${selectedProject.target_amount}`
            setData('description', selectedProject.description)
            setData('project_id', e.target.value)
        }
    }

    function onFinish(e) {
        e.preventDefault();
        if (contribution) {
            put(route('contributions.update', contribution.id), {
                onSuccess: toast.success('Contribution has been updated')
            })
        } else {
            post(route('contributions.store'), {
                onFinish: reset(),
                onSuccess: toast.success('New contribution created!'),
            });
        }
    }

    return (
        <>
            <p className="mb-2" ref={amountRef}></p>
            <form onSubmit={onFinish}>
                <div className="mb-4">
                    <InputLabel htmlFor="member" value="Member" classmember="mb-2" />
                    <select name="member_id" id="member" value={data.member}
                        onChange={e => setData('member_id', e.target.value)} className="w-full border border-gray-300 rounded-md mt-2">
                        {members.map(member => (
                            <option value={member.id} key={member.id}>{member.first_name} {member.last_name}</option>
                        ))}
                    </select>
                    {errors.member_id && <span className="text-xs text-red-400">{errors.member_id}</span>}
                </div>
                <div className="mb-4">
                    <InputLabel htmlFor="project" value="Project (optional especially when recieving funds from new source)" className="mb-2" />
                    <select ref={projectRef} name="project_id" id="project" value={data.project_id}
                        onChange={handleProjectSelect} className="w-full border border-gray-300 rounded-md">
                        <>
                            <option value={""} key={"empty-project"}>{""}</option>
                            {projects.map(project => (
                                <option value={project.id} key={project.id}>{project.description}</option>
                            ))}
                        </>
                    </select>
                    {errors.project && <span classproject="text-xs text-red-400">{errors.project}</span>}
                </div>
                <div>
                    <InputLabel htmlFor="amount" value="Amount" className="mb-2" />
                    <TextInput type="number" name="amount" id="amount" value={data.amount}
                        onChange={e => setData('amount', e.target.value)} className="w-full" />
                    {errors.amount && <span className="text-xs text-red-400">{errors.amount}</span>}
                </div>
                <div>
                    <InputLabel htmlFor="description" value="Description (required when getting income from non-members)" className="mb-2" />
                    <TextInput name="description" id="description" value={data.description}
                        onChange={e => setData('description', e.target.value)} className="w-full" />
                    {errors.description && <span className="text-xs text-red-400">{errors.description}</span>}
                </div>
                <div>
                    <InputLabel htmlFor="date" value="Date" className="mb-2" />
                    <TextInput type="date" name="date" id="date" value={data.date}
                        onChange={e => setData('date', e.target.value)} className="w-full" />
                    {errors.date && <span className="text-xs text-red-400">{errors.date}</span>}
                </div>
                {contribution ?
                    <div className="flex items-center justify-between mt-4">
                        <PrimaryButton type="submit">{processing ? 'Updating...' : 'Update'}</PrimaryButton>
                        <Link className="text-red-500 hover:underline"
                            href={route('contributions.destroy', contribution.id)} method="delete" as="button"
                        >
                            Delete contribution
                        </Link>
                    </div>
                    : <PrimaryButton type="submit">{processing ? 'Creating...' : 'Create'}</PrimaryButton>}
            </form>
        </>
    )
}
