import TextInput from "@/Components/TextInput";
import { useState } from "react";
import { Link } from '@inertiajs/react'
import { Pagination } from "@/Components/Pagination";
import dayjs from "dayjs";
import { formatAsCurrency } from "@/Utils/Formatter";

export function ProjectTable({ projects }) {
    const [tableData, setTableData] = useState(projects.data);

    function handleSearch(e) {
        const searchQuery = e.target.value.toLowerCase();
        if (searchQuery === '') {
            setTableData(projects.data);
        } else {
            const result = tableData.filter(item => item.description.toLowerCase().includes(searchQuery));
            setTableData(result)
        }
    }

    return (
        <>
            <div className="bg-white shadow-md rounded-md">
                <TextInput type="search" onChange={handleSearch} className="py-1 m-3" placeholder="Search by name..." />
                <table className="table-auto w-full">
                    <thead>
                        <tr className="text-left border-t">
                            <th className="p-3">Description</th>
                            <th className="p-3">Target amount</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Created on</th>
                            <th className="p-3">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((project, index) => (
                            <tr key={index}
                                className="border-t hover:bg-gray-50">
                                <td className="p-3">{project?.description ?? ''}</td>
                                <td className="p-3">{formatAsCurrency(project?.target_amount) ?? 'Free will'}</td>
                                <td className="p-3">{project?.category?.name ?? 'none'}</td>
                                <td className="p-3">{project?.status ?? ''}</td>
                                <td className="p-3">{dayjs(project.created_on).format('DD MMM, YYYY')}</td>
                                <td className="p-3">
                                    <Link href={route('projects.edit', project.id)} className="text-sm text-blue-500">Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={projects.links} />
        </>
    )
}
