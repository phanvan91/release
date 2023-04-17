<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\ProjectRepository;
use App\Models\Project;
use App\Validators\ProjectValidator;

/**
 * Class ProjectRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class ProjectRepositoryEloquent extends BaseRepository implements ProjectRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Project::class;
    }



    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    public function getProjects($filter){
        $result = $this->model->with('environments');
        if($filter->per_page === 0){
            return $result->get();
        }else{
            return $result->paginate($filter->per_page);
        }
    }

}
