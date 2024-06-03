<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Category;
use App\Models\Project;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('Projects/Index')
            ->with([
                'projects' => Project::with('category')->paginate(10)
            ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create')->with([
            ''
        ]);
    }

    public function store(ProjectRequest $request)
    {
        $data = $request->validated();
        Project::create($data);
        return to_route('projects.index');
    }

    public function edit(Project $project)
    {
        $categories = Category::all();
        return Inertia::render('Projects/Edit', compact('project', 'categories'));
    }

    public function update(ProjectRequest $request, Project $project)
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
