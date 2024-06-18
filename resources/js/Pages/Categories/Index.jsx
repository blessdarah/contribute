import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { CategoriesTable } from "./Partials/CategoriesTable";

export default function Categories({ auth, categories }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Categories
                    </h2>
                    <Link
                        href={route("categories.create")}
                        className="text-indigo-600 dark:text-white bg-white border border-gray-200 text-sm dark:border-0 px-4 py-2 rounded dark:bg-indigo-600"
                    >
                        Create category
                    </Link>
                </div>
            }
        >
            <Head title="Categories" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <CategoriesTable categories={categories} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
