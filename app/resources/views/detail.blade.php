@extends('layout')
@section('page-content')
<div class="row">
    <!-- column -->
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <!-- title -->
                <div class="row">
                    <div class="col release-header">
                        <div class="qrcode">
                            {!! QrCode::size(500)->generate($link); !!}
                        </div>
                        <div class="release-name">
                            <h4>
                                {!! $object->platform === 'android' ? '<i class="platform-android fa-brands fa-android text-success"></i> ' : '' !!}
                                {!! $object->platform === 'ios' ? '<i class="platform-android fa-brands fa-apple text-secondary"></i> ' : '' !!}
                                {{$object->title}}
                            </h4>
                        </div>
                        <div class="button">
                            <a href="{{$link}}" target="_blank" class="btn btn-success text-white">Download & install</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-sm-6">
        <ul class="list-group">

            <li class="list-group-item">Platform: <strong>
                    {!! $object->platform === 'android' ? 'Android' : '' !!}
                    {!! $object->platform === 'ios' ? 'iOS ' : '' !!}
                </strong></li>
            <li class="list-group-item">Project: <strong>{{$object->project->name}}</strong></li>
            <li class="list-group-item">Version: <strong>{{$object->version}}</strong></li>
            <li class="list-group-item">Environment: <strong>{{$object->environment->name}}</strong></li>
            <li class="list-group-item">Base URL / API URL: <strong>{{$object->environment->baseurl}}</strong></li>
            <li class="list-group-item">Update on: <strong>{{$object->updated_at}}</strong></li>
          </ul>
    </div>
    <div class="col-sm-6">
        <h5 class="mt-4">Release Notes</h5>
        <hr/>
        {!! nl2br($object->note) !!}
    </div>
</div>
@endsection

@push('foot-scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js" integrity="sha512-WFN04846sdKMIP5LKNphMaWzU7YpMyCU245etK3g/2ARYbPK9Ub18eG+ljU96qKRCWh+quCY7yefSmlkQw1ANQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
        $(document).ready(function(){
            checkAuth();
        })
    </script>
@endpush
