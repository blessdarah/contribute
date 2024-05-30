import { router } from "@inertiajs/react";

export function MembersTable({ members }) {
    return (
        <div class="p-2">
            <table className="table-auto w-full border rounded border-collapse">
                <thead>
                    <tr>
                        <th className="dark:text-white dark:border-gray-700 border"> Name</th>
                        <th className="dark:text-white dark:border-gray-700 border"> Address</th>
                        <th className="dark:text-white dark:border-gray-700 border"> Contact</th>
                        <th className="dark:text-white dark:border-gray-700 border"> Music Part</th>
                        <th className="dark:text-white dark:border-gray-700 border"></th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member, index) => (
                        <tr key={index} className="dark:even:bg-gray-700 even:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 text-gray-700">
                            <td className="dark:border-gray-700 border p-1">{member.first_name} {member.last_name}</td>
                            <td className="dark:border-gray-700 border p-1">{member?.address ?? 'unknown'}</td>
                            <td className="dark:border-gray-700 border p-1">{member?.contact}</td>
                            <td className="dark:border-gray-700 border p-1">{member?.music_part}</td>
                            <td className="dark:border-gray-700 border p-1 text-sm">
                                <button>Edit</button>
                                {/* <button className="text-red-400" onClick={router.visit(`/members/${member.id}`, { method: 'delete' })}>Delete</button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
