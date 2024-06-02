import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import { useState } from "react";

export function MembersTable({ members }) {
    const [tableData, setTableData] = useState(members);
    function handleSearch(e) {
        const searchQuery = event.target.value.toLowerCase();
        if (searchQuery === '') {
            setTableData(members);
        } else {
            const result = tableData.filter(item => item.first_name.toLowerCase().includes(searchQuery)
                || item.last_name.toLowerCase().includes(searchQuery));
            setTableData(result)
        }
    }

    return (
        <div className="bg-white rounded-md">
            <TextInput type="search" onChange={handleSearch} className="m-2 py-2" placeholder="Search by name..." />
            <table className="table-auto w-full">
                <thead>
                    <tr className="text-left border-t">
                        <th className="p-2"> Name</th>
                        <th className="p-2"> Address</th>
                        <th className="p-2"> Contact</th>
                        <th className="p-2"> Music Part</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600">
                    {tableData.map((member, index) => (
                        <tr onClick={() => router.get(`members/${member.id}`)} key={index}
                            className="border-t cursor-pointer hover:bg-gray-100">
                            <td className="p-2">{member.first_name} {member.last_name}</td>
                            <td className="p-2">{member?.address ?? 'unknown'}</td>
                            <td className="p-2">{member?.contact}</td>
                            <td className="p-2">{member?.music_part}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
