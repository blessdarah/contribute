<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('Projects/Index')
            ->with([
                'projects' => Project::paginate(10)
            ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    public function store(ProjectRequest $request)
    {
        $data = $request->validated();
        Project::create($data);
        return to_route('projects.index');
    }

    public function edit(Project $project)
    {
        return Inertia::render('Projects/Edit', compact('project'));
    }

    public function update(Request $request, Project $project)
    {
        $data = $request->validated();
        $project->update($data);
        return to_route('projects.index');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return to_route('projects.index');
    }

}
