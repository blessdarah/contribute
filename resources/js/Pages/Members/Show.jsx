import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { MemberForm } from './Partials/MemberForm';

export default function MemberShow({ auth, member }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Member detail</h2>
                <PrimaryButton onClick={() => window.history.back()}>back</PrimaryButton>
            </div>}
        >
            <Head title="Members" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <MemberForm member={member} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
