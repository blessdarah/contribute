import TextInput from "@/Components/TextInput";
import { useState } from "react";
import { Link } from '@inertiajs/react'
import { Pagination } from "@/Components/Pagination";
import { formatAsCurrency } from "@/Utils/Formatter";

export function ContributionsTable({ contributions }) {
    const [tableData, setTableData] = useState(contributions.data);

    function handleSearch(e) {
        const searchQuery = e.target.value.toLowerCase();
        if (searchQuery === '') {
            setTableData(contributions.data);
        } else {
            const result = tableData.filter(item => item.name.toLowerCase().includes(searchQuery)
                || item.description.toLowerCase().includes(searchQuery));
            setTableData(result)
        }
    }

    return (
        <>
            <div className="bg-white shadow-md rounded-md">
                <TextInput type="search" onChange={handleSearch} className="py-1 m-3" placeholder="Search by name..." />
                <table className="table-auto w-full">
                    <thead>
                        <tr className="border-t text-left">
                            <th className="p-3"> Name</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">Project</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((contribution, index) => (
                            <tr key={index}
                                className="border-t hover:bg-gray-50">
                                <td className="p-3 border-r">{contribution.member.first_name} {contribution.member.last_name}</td>
                                <td className="p-3 border-r">{formatAsCurrency(contribution.amount)}</td>
                                <td className="p-3 border-r">{contribution?.description ?? ''}</td>
                                <td className="p-3 border-r">{contribution?.project?.description ?? ''}</td>
                                <td className="p-3">
                                    <Link href={route('contributions.edit', contribution.id)} className="text-sm text-blue-500">Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={contributions.links} />
        </>
    )
}
