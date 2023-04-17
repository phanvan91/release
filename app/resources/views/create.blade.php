@extends('layout')
@push('head-scripts')

@endpush
@section('page-content')
<div class="row">
    <!-- column -->
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                        <h4 class="card-title">Upload new release</h4>
                    <hr/>
                <form id="uploadForm">
                    <div class="row mb-3">
                        <div class="col-sm-4">
                            Project <span class="text-danger">*</span>
                        </div>
                        <div class="col-sm-8">
                            <select class="form-control" id="project_id" onchange="selectProject()">
                                <option value="">Select project</option>
                                @foreach($projects as $pro)
                                <option value="{{$pro->id}}">{{$pro->name}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-4">
                            Platform <span class="text-danger">*</span>
                        </div>
                        <div class="col-sm-8">
                            <select class="form-control" id="platform" onchange="selectPlatform()">
                                <option value="">Select platform</option>
                                <option value="android">Android</option>
                                <option value="ios">iOS</option>
                            </select>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-4">
                            Environment <span class="text-danger">*</span>
                        </div>
                        <div class="col-sm-8">
                            <select class="form-control" id="env_id">
                                <option value="">Select environment</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-4">
                            Version <span class="text-danger">*</span>
                        </div>
                        <div class="col-sm-8">
                            <input class="form-control" id="version" name="version"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-4">
                            Release title <span class="text-danger">*</span>
                        </div>
                        <div class="col-sm-8">
                            <input class="form-control" id="title" name="title"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-4">
                            Release notes
                        </div>
                        <div class="col-sm-8">
                            <textarea rows="5" class="form-control" id="note" name="note"></textarea>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-4">
                            Bundle <span class="text-danger">*</span>
                        </div>
                        <div class="col-sm-8" id="platformAndroid" style="display: none">
                            <label> <h5>Select file APK</h5>
                                <input type="file" id="apk" name="apk"/>
                            </label>
                        </div>
                        <div class="col-sm-8" id="platformiOS" style="display: none">
                            <div class="row col">
                                <label> <h5>Select file .ipa</h5>
                                    <input type="file" id="ipa" name="ipa"/>
                                </label>
                            </div>
                            <div class="row mt-3">
                                <div class="col">
                                    <h5>plist meta</h5>
                                    <label class="row">
                                        <div class="col-sm-3"> bundle-identifier:</div><div class="col-sm-9"> <input class="form-control" id="bundle-identifier" value="com.enjoyworks.playmoongu.admin"/></div>
                                    </label>
                                    <label class="row">
                                        <div class="col-sm-3"> bundle-version:</div><div class="col-sm-9"> <input class="form-control" id="bundle-version" value="1.1.1"/></div>
                                    </label>
                                    <label class="row">
                                        <div class="col-sm-3"> title:</div><div class="col-sm-9"> <input class="form-control" id="bundle-title" value="Playmoongu-Admin"/></div>
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>
                    <hr/>
                    <div class="row">
                        <div class="col text-end">
                            <button type="submit" class="btn btn-success">Upload</button>
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
    const _projects = @json($projects);

    function selectProject(){
        let p = $('#project_id').val()
        console.log(p, _projects)
        const [projectObj] = _.filter(_projects, {id: parseInt(p)})
        let html = []
        if(projectObj?.environments){
            html = projectObj.environments.map((item)=>{
                return '<option value="'+item.id+'">'+item.name+' ['+item.baseurl+']'+'</option>'
            })
        }
        console.log(html)
        $('#env_id').html(html.join(''))
    }
    function selectPlatform(){
        let p = $('#platform').val()
        if(p === 'android'){
            $('#platformAndroid').show()
            $('#platformiOS').hide()
        }
        if(p === 'ios'){
            $('#platformAndroid').hide()
            $('#platformiOS').show()
        }
    }
    function upload() {
        let error = false;
        $('#uploadForm *').prop('disabled', true)
        console.log('upload')
        formData = new FormData();
        const fields = [
            {id: 'project_id', required: true},
            {id: 'platform', required: true},
            {id: 'env_id', required: true},
            {id: 'version', required: true},
            {id: 'title', required: true},
            {id: 'note', required: false},
            {id: 'apk', required: false, file: true},
            {id: 'ipa', required: false, file: true},
            {id: 'bundle-identifier', required: true},
            {id: 'bundle-version', required: true},
            {id: 'bundle-title', required: true},
        ];
        fields.forEach((item)=>{
            console.log(item,'item')
            if(!item.file){
                let val = document.getElementById(item.id).value
                console.log(item, '#'+item.id, val)

                if(['bundle-identifier', 'bundle-version', 'bundle-title'].includes(item.id)){
                    if(document.getElementById('platform').value === 'ios'){
                        if(item.required){
                            if(!val) error = true;
                        }
                        formData.append(item.id, val)
                    }
                }else{
                    if(item.required){
                        if(!val) error = true;
                    }
                    formData.append(item.id, val)
                }

            }else{
                if(document.getElementById('platform').value === 'android'){
                    if(['apk'].includes(item.id)){
                        if(!document.getElementById(item.id).files[0]){
                            alert('Please select file')
                            error = false;
                        }else{
                            formData.append(item.id, document.getElementById(item.id).files[0])
                        }
                    }
                }
                if(document.getElementById('platform').value === 'ios'){
                    if(['ipa'].includes(item.id)){
                        if(!document.getElementById(item.id).files[0]){
                            alert('Please select file')
                            error = true;
                        }else{
                            formData.append(item.id, document.getElementById(item.id).files[0])
                        }
                    }
                }
            }

        })
        if(error) {
            alert('Please fill required field')
            $('#uploadForm *').prop('disabled', false)
        }
        else{
            $.ajax({
              url: '/api/release/create',
              type: 'post',
              data: formData,
              headers: {
                  'Authorization': 'Bearer '+sessionStorage.getItem('accessToken')
              },
              contentType: false,
              processData: false,
              success: function(res){
                 console.log(res)
                 $('#uploadForm *').prop('disabled', false)
                  window.location.href = '/'
              },
              error: function(e){
                alert('error!');
                $('#uploadForm *').prop('disabled', false)
              }
           });
        }

    }

    function logout() {
        $.ajax({
            url: '/api/auth/logout',
            type: 'get',
            data: {},
            headers: {
                'Authorization': 'Bearer '+sessionStorage.getItem('accessToken')
            },
            contentType: false,
            processData: false,
            success: function(res){
                console.log(res)
                window.location.href = '/login'

            },
            error: function(e){
            }
        });
    }

    $('#uploadForm').submit(function (e){
        e.preventDefault()
        upload()
    })

    $(document).ready(function(){
        checkAuth();
    })
</script>
@endpush
