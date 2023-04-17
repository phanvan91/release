@extends('layout')
@push('head-scripts')

@endpush
@section('page-content')
    <div class="row">
        <!-- column -->
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Change Password</h4>
                    <hr/>
                    <form id="uploadForm">

{{--                        <div class="row mb-3">--}}
{{--                            <div class="col-sm-4">--}}
{{--                                Email<span class="text-danger">*</span>--}}
{{--                            </div>--}}
{{--                            <div class="col-sm-8">--}}
{{--                                <input class="form-control" id="email" name="email" value="" disabled/>--}}
{{--                            </div>--}}
{{--                        </div>--}}

                        <div class="row mb-3">
                            <div class="col-sm-4">
                                Current Password <span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-8">
                                <input class="form-control" id="password" name="password"/>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-sm-4">
                                New Password <span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-8">
                                <input class="form-control" id="new_password" name="new_password"/>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-sm-4">
                                Confirm New Password <span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-8">
                                <input class="form-control" id="new_password_confirmation" name="new_password_confirmation"/>
                            </div>
                        </div>
                        <hr/>
                        <div class="row">
                            <div class="col text-end">
                                <button type="submit" class="btn btn-success" id="submit-change-password">Upload</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('foot-scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js" integrity="sha512-WFN04846sdKMIP5LKNphMaWzU7YpMyCU245etK3g/2ARYbPK9Ub18eG+ljU96qKRCWh+quCY7yefSmlkQw1ANQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>

        function upload(){
            let data = $('#uploadForm').serializeArray();
            $('#uploadForm *').prop('disabled', true)
            $.ajax({
                url: '/api/auth/change-password',
                type: 'post',
                data: data,
                headers: {
                    'Authorization': 'Bearer '+sessionStorage.getItem('accessToken')
                },
                success: function(res){
                    console.log(res)
                    $('#uploadForm *').prop('disabled', false)
                    window.location.href = '/'
                },
                error: function(xhr){
                    $('#uploadForm *').prop('disabled', false)
                    if(xhr.status === 422) {
                        let errors = xhr.responseJSON.errors;
                        let messError = '';
                        $.each(errors, function (key, value) {
                            if(messError === ''){
                                messError = value[0];
                            }
                        });
                        alert(messError);

                    }else{
                        alert('error!');
                    }

                }
            });
        }

        $('#uploadForm').submit(function (e){
            upload()
            e.preventDefault()
        })

        $(document).ready(function(){
            // if(!_AUTH){
            //     window.location.href = '/login'
            // }
            checkAuth();
        })
    </script>
@endpush
