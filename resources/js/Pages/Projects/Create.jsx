import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ProjectForm } from './Partials/ProjectForm';

export default function ProjectCreate({ auth, categories }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create member</h2>
                <PrimaryButton onClick={() => window.history.back()}>back</PrimaryButton>
            </div>}
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <ProjectForm categories={categories} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
