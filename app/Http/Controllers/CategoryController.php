<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Categories/Index')
            ->with([
                'categories' => Category::paginate(10),
            ]);
    }

    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'string|required',
            'description' => 'nullable',
        ]);
        Category::create($data);

        return to_route('categories.index');
    }

    public function edit(Category $category)
    {
        return Inertia::render('Categories/Edit', compact('category'));
    }

    public function update(Request $request, Category $category)
    {
        $data = $request->validate([
            'name' => 'string|required',
            'description' => 'nullable',
        ]);
        $category->update($data);

        return to_route('categories.index');
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return to_route('categories.index');
    }
}
