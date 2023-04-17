<?php

namespace App\Http\Controllers;

use App\Helpers\Filter;
use App\Repositories\ReleaseRepository;
use Illuminate\Http\Request;
use App\Repositories\ProjectRepository;
use Illuminate\Support\Facades\Auth;

class FrontController extends Controller
{
    protected $projectRepository;

    public function __construct(ProjectRepository $projectRepository, ReleaseRepository $releaseRepository)
    {
        $this->projectRepository = $projectRepository;
        $this->releaseRepository = $releaseRepository;
    }

    public function login(Request $request){
        return view('login');
    }

    public function check(Request $request){
        $user = auth()->guard('api')->user();

        return response()->json($user, $user ? 200: 403);
    }

    public function logout(Request $request){
        $user = auth()->guard('api')->user();
        auth()->guard('api')->user()->token()->revoke();

        return response()->json(1, $user ? 200: 403);
    }

    public function index(Request $request){
        $projects = $this->projectRepository->getProjects(new Filter(['per_page'=>0]));
        return view('front', compact('projects'));
    }

    public function detail($id, Request $request){
        $filter = new Filter([
            'id'=> $id,
            'relation_project' => true,
            'relation_env' => true
        ]);

        $object = $this->releaseRepository->getReleases($filter);
        $link = '';
        if($object->platform === 'android') {
            $bundle = json_decode($object->bundle);
            $link = url('/').$bundle->apk;
        }
        if($object->platform === 'ios') {
            $bundle = json_decode($object->bundle);
            $link = "itms-services://?action=download-manifest&url=".url('/').$bundle->plist;
        }
//        dump($link);
        return view('detail', compact('object', 'link'));
    }

    public function upload(Request $request){
        $projects = $this->projectRepository->getProjects(new Filter(['per_page'=>0]));
//        dd($projects);
        return view('create', compact('projects'));
    }

    public function changePassword (Request $request) {

        return view('change_password');
    }
}
