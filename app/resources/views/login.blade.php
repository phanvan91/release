@extends('layout')
@section('page-content')
    <div class="row">
        <!-- column -->
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <!-- title -->
                    <div class="d-md-flex">
                        <div>
                            <h4 class="card-title">Login</h4>
                        </div>

                    </div>
                    <!-- title -->
                    <div class="row">
                        <div class="col-sm-3"></div>
                        <div class="col-sm-6">
                            <form id="loginForm">
                                <div class="row align-items-center mb-3">
                                    <div class="col-sm-4">Username</div>
                                    <div class="col-sm-8"><input type="text" name="email" class="form-control"/></div>
                                </div>
                                <div class="row align-items-center mb-3">
                                    <div class="col-sm-4">Password</div>
                                    <div class="col-sm-8"><input type="password" name="password" class="form-control"/></div>
                                </div>
                                <div class="row align-items-center mb-3">
                                    <div class="col-sm-4"></div>
                                    <div class="col-sm-8"><button class="btn btn-success text-white btn-block">Login</button></div>
                                </div>
                                <input type="hidden" name="referer" value="{{request()->headers->get('referer')}}">
                                @csrf
                            </form>
                        </div>
                        <div class="col-sm-3"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('foot-scripts')
<script>
    function login(){
        console.log('login')
        var data = $('#loginForm').serialize()
        $('#loginForm *').prop('disabled', true)
        $.ajax({
            url: '/api/auth/login',
            data,
            type: 'post',
            success: function(res){
                console.log(res)
                sessionStorage.setItem('accessToken', res.token)
                window.location.href = '{{request()->headers->get('referer')}}'
            },
            error: function(e){
                $('#loginForm *').prop('disabled', false)
                console.log(e)
            }
        })
    }
    $('#loginForm').submit(function(e){
        e.preventDefault()
        login()
    })
</script>
@endpush
