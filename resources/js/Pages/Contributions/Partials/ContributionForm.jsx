import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { formatAsCurrency } from "@/Utils/Formatter";
import { Link, useForm } from '@inertiajs/react'
import dayjs from "dayjs";
import { useState } from "react";
import toast from "react-hot-toast"

export function ContributionForm({ contribution, members, projects }) {
    const [targetAmount, setTargetAmount] = useState(0)
    const { put, data, setData, post, processing, errors, reset } = useForm(contribution || {
        amount: '',
        project_id: '',
        member_id: '',
        description: '',
        data: dayjs(new Date())
    });

    function handleProjectSelect(e) {
        const pid = Number(e.target.value)
        const amount = projects.find(p => p.id === pid)?.target_amount;
        setTargetAmount(amount)
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
            {targetAmount && <p className="mb-2">Amount for this project: {formatAsCurrency(targetAmount)}</p>}
            <form onSubmit={onFinish}>
                <div className="mb-4">
                    <InputLabel htmlFor="member" value="Member" classmember="mb-2" />
                    <select member="member" id="member" value={data.member}
                        onChange={e => setData('member', e.target.value)} className="w-full border border-gray-300 rounded-md mt-2">
                        {members.map(member => (
                            <option value={member.id} key={member.id}>{member.first_name} {member.last_name}</option>
                        ))}
                    </select>
                    {errors.member && <span classmember="text-xs text-red-400">{errors.member}</span>}
                </div>
                <div className="mb-4">
                    <InputLabel htmlFor="project" value="Project (optional especially when recieving funds from new source)" className="mb-2" />
                    <select name="project_id" id="project" value={data.project_id}
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
                    <TextInput name="amount" id="amount" value={data.amount}
                        onChange={e => setData('amount', e.target.value)} className="w-full" />
                    {errors.amount && <span className="text-xs text-red-400">{errors.amount}</span>}
                </div>
                <div>
                    <InputLabel htmlFor="description" value="Description (required when getting income from non-members)" className="mb-2" />
                    <TextInput name="description" id="description" value={data.description}
                        onChange={e => setData('description', e.target.value)} className="w-full" />
                    {errors.description && <span className="text-xs text-red-400">{errors.description}</span>}
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
