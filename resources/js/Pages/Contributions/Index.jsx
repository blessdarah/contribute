import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { ContributionsTable } from './Partials/ContributionsTable';

export default function Contributions({ auth, contributions }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Contributions</h2>
                    <Link href={route('contributions.create')} className="text-indigo-600 dark:text-white bg-white border border-gray-200 text-sm dark:border-0 px-4 py-2 rounded dark:bg-indigo-600">Create contribution</Link>
                </div>
            }
        >
            <Head title="Contributions" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ContributionsTable contributions={contributions} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
