<?php

namespace App\Providers;

use App\Repositories\ProjectRepository;
use App\Repositories\ProjectRepositoryEloquent;
use App\Repositories\ReleaseRepository;
use App\Repositories\ReleaseRepositoryEloquent;
use App\Repositories\UserRepository;
use App\Repositories\UserRepositoryEloquent;
use Illuminate\Support\ServiceProvider;

class RepositoryProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        app()->bind(UserRepository::class, UserRepositoryEloquent::class);
        app()->bind(ReleaseRepository::class, ReleaseRepositoryEloquent::class);
        app()->bind(ProjectRepository::class, ProjectRepositoryEloquent::class);
    }
}
