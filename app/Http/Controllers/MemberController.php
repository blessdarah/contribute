<?php

namespace App\Http\Controllers;

use App\Http\Requests\MemberRequest;
use App\Models\Contribution;
use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        return Inertia::render('Members/Index')->with([
            'members' => Member::latest()->paginate(10)
        ]);

    }

    public function create()
    {
        return Inertia::render('Members/Create');
    }

    public function store(MemberRequest $request)
    {
        $data = $request->validated();
        Member::create($data);
        return to_route('members.index');
    }

    public function show(Member $member)
    {
        return Inertia::render('Members/Show')->with([
            'member' => $member,
            'contributions' => Contribution::with('member', 'project')
                ->where('member_id', $member->id)
                ->paginate(10)
        ]);
    }

    public function update(MemberRequest $request, Member $member)
    {
        $data = $request->validated();
        $member->update($data);
        return to_route('members.show', compact('member'));
    }

    public function destroy(Member $member)
    {
        $member->delete();
        return redirect()->back();
    }
}
