<?php

namespace App\Http\Controllers\API;

use App\Helpers\Filter;
use App\Http\Controllers\Controller;
use App\Repositories\ProjectRepository;
use Illuminate\Http\Request;

class ProjectController extends Controller
{

    protected $projectRepository;

    public function __construct(ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }

    public function getProjects(Request $request){

        $filter = new Filter([

        ]);

        $projects = $this->projectRepository->getProjects($filter);

        return response()->json([
            'status' => true,
            'data' => $projects,
        ]);
    }
}
