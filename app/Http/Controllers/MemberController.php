<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        return Inertia::render('Members/Index')->with([
            'members' => Member::latest()->get()
        ]);

    }

    public function create()
    {
        return Inertia::render('Members/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'address' => 'nullable',
            'gender' => 'nullable',
            'contact' => 'nullable',
            'music_part' => 'nullable',
        ]);
        Member::create($data);
        return to_route('members.index');
    }

    public function destroy(Member $member)
    {
        $member->delete();
        return redirect()->back();
    }
}
