import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { ProjectTable } from './Partials/ProjectTable';

export default function ProjectIndex({ auth, projects }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projects</h2>
                    <Link href={route('projects.create')} className="text-indigo-600 dark:text-white bg-white border border-gray-200 text-sm dark:border-0 px-4 py-2 rounded dark:bg-indigo-600">Create project</Link>
                </div>
            }
        >
            <Head title="Projects" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {projects.data && projects.data.length > 0 ?
                        <ProjectTable projects={projects} /> :
                        <div className="py-20 bg-white rounded-lg">
                            <div className="space-y-2 text-center">
                                <p className="text-gray-500">No data available</p>
                                <img className="w-28 h-auto mx-auto" src="https://static.vecteezy.com/system/resources/previews/012/181/008/original/document-data-file-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg" alt="No data" />
                                <Link className="bg-orange-500 text-white px-4 py-2 rounded" href={route('projects.create')}>Create Project</Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
