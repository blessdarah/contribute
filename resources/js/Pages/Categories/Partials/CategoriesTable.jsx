import TextInput from "@/Components/TextInput";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Pagination } from "@/Components/Pagination";

export function CategoriesTable({ categories }) {
    const [tableData, setTableData] = useState(categories.data);

    function handleSearch(e) {
        const searchQuery = e.target.value.toLowerCase();
        if (searchQuery === "") {
            setTableData(categories.data);
        } else {
            const result = tableData.filter(
                (item) =>
                    item.name.toLowerCase().includes(searchQuery) ||
                    item.description.toLowerCase().includes(searchQuery),
            );
            setTableData(result);
        }
    }

    return (
        <>
            <div className="bg-white shadow-md rounded-md">
                <TextInput
                    type="search"
                    onChange={handleSearch}
                    className="py-1 m-3"
                    placeholder="Search by name..."
                />
                <table className="table-auto w-full">
                    <thead>
                        <tr className="border-t">
                            <th className="p-3"> Name</th>
                            <th className="p-3">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((category, index) => (
                            <tr
                                key={index}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="p-3 border-r">
                                    {category.name}
                                </td>
                                <td className="p-3 border-r">
                                    {category?.description ?? ""}
                                </td>
                                <td className="p-3">
                                    <Link
                                        href={route(
                                            "categories.edit",
                                            category.id,
                                        )}
                                        className="text-sm text-blue-500"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={categories.links} />
        </>
    );
}
