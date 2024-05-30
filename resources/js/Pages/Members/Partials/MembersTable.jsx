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
        <div class="p-2">
            <TextInput type="search" onChange={handleSearch} className="py-1 mb-3" placeholder="Search by name..." />
            <table className="table-auto w-full border rounded border-collapse">
                <thead>
                    <tr>
                        <th className="dark:text-white dark:border-gray-700 border"> Name</th>
                        <th className="dark:text-white dark:border-gray-700 border"> Address</th>
                        <th className="dark:text-white dark:border-gray-700 border"> Contact</th>
                        <th className="dark:text-white dark:border-gray-700 border"> Music Part</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((member, index) => (
                        <tr onClick={() => router.get(`members/${member.id}`)} key={index}
                            className="cursor-pointer hover:even:bg-gray-300 hover:odd:bg-gray-200 dark:even:bg-gray-700 even:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 text-gray-700">
                            <td className="dark:border-gray-700 border p-2">{member.first_name} {member.last_name}</td>
                            <td className="dark:border-gray-700 border p-2">{member?.address ?? 'unknown'}</td>
                            <td className="dark:border-gray-700 border p-2">{member?.contact}</td>
                            <td className="dark:border-gray-700 border p-2">{member?.music_part}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
