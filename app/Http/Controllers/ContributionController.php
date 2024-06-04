<?php

namespace App\Http\Controllers;

use App\Models\Contribution;
use App\Models\Member;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContributionController extends Controller
{
    public function index()
    {
        return Inertia::render('Contributions/Index')
            ->with([
                'contributions' => Contribution::with('project', 'member')->paginate(10)
            ]);
    }

    public function create()
    {
        return Inertia::render('Contributions/Create')->with([
            'projects' => Project::orderBy('description')->get(),
            'members' => Member::orderBy('first_name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'amount' => 'required|numeric|min:0',
            'date' => 'nullable',
            'project_id' => 'nullable',
            'description' => 'nullable',
            'member_id' => 'required'
        ]);
        // dd($data);
        Contribution::create($data);
        return to_route('contributions.index');
    }

    public function edit(Contribution $contribution)
    {
        // $categories = Category::all();
        return Inertia::render('Contributions/Edit', compact('contribution'));
    }

    public function update(Request $request, Contribution $contribution)
    {
        $data = $request->validated();
        $contribution->update($data);
        return to_route('contributions.index');
    }

    public function destroy(Contribution $contribution)
    {
        $contribution->delete();
        return to_route('contributions.index');
    }
}
