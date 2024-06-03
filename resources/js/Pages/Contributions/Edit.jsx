import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ContributionForm } from './Partials/ContributionForm';

export default function ContributionShow({ auth, contribution }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Contribution</h2>
                <PrimaryButton onClick={() => window.history.back()}>Cancel</PrimaryButton>
            </div>}
        >
            <Head title="Contributions" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <ContributionForm contribution={contribution} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
