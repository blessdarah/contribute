import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { MembersTable } from './Partials/MembersTable';

export default function MembersIndex({ auth, members }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Members</h2>
                <Link href={route('members.create')} className="text-indigo-600 dark:text-white bg-white border border-gray-200 text-sm dark:border-0 px-4 py-2 rounded dark:bg-indigo-600">Create member </Link>
            </div>}
        >
            <Head title="Members" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <MembersTable members={members} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
