<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\ReleaseRepository;
use App\Models\Release;
use App\Validators\ReleaseValidator;

/**
 * Class ReleaseRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class ReleaseRepositoryEloquent extends BaseRepository implements ReleaseRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Release::class;
    }



    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    public function getReleases($filter) {
        $result = $this->model->when($filter->has('project_id') && $filter->project_id,function ($query) use ($filter) {
            $query->whereHas('project',function ($q) use ($filter) {
               $q->where('id',$filter->project_id);
            });
        })->when($filter->has('env_id') && $filter->env_id,function ($query) use ($filter) {
            $query->whereHas('environment',function ($q) use ($filter) {
                $q->where('id',$filter->env_id);
            });
        })->when($filter->has('platform') && $filter->platform,function ($query) use ($filter) {
            $query->where('platform','like','%'.$filter->platform.'%');
        })->when($filter->has('title') && $filter->title,function ($query) use ($filter) {
            $query->where('title','like','%'.$filter->title.'%');
        })->when($filter->has('version') && $filter->version,function ($query) use ($filter) {
            $query->where('version','like','%'.$filter->version.'%');
        })->when($filter->has('order_by_created_at') && $filter->order_by_created_at,function ($query) use ($filter) {
            $query->orderBy('created_at',$filter->order_by_created_at);
        })->when($filter->has('relation_project') && $filter->relation_project,function ($query) use ($filter) {
            $query->with('project');
        })->when($filter->has('relation_env') && $filter->relation_env,function ($query) use ($filter) {
            $query->with('environment');
        });

        if($filter->has('id')){
            return $result->where('id', $filter->id)->first();
        }
        if($filter->per_page === 0){
            return $result->get();
        }else{
            return $result->paginate($filter->per_page);
        }
    }

}
