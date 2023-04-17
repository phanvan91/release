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
                        <h4 class="card-title">Release list</h4>
                    </div>
                    <div class="ms-auto">
                        <div class="dl">
                            <select class="form-control" id="project_id" onchange="selectProject()">
                                <option value="">Select project</option>
                                @foreach($projects as $pro)
                                    <option value="{{$pro->id}}">{{$pro->name}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="ml-3" style="margin-left: 20px">
                        <div class="dl">
                            <select class="form-select shadow-none" id="platform" onchange="changeFilter()">
                                <option value="" selected>Platform</option>
                                <option value="android">Android</option>
                                <option value="ios">iOS</option>
                            </select>
                        </div>
                    </div>

                    <div class="ml-3" style="margin-left: 20px">
                        <div class="dl">
                            <select class="form-control" id="env_id" onchange="changeFilter()">
                                <option value="">Select environment</option>
                            </select>
                        </div>
                    </div>
                </div>
                <!-- title -->
                <div class="table-responsive">
                    <table class="table mb-0 table-hover align-middle text-nowrap">
                        <thead>
                            <tr>
                                <th class="border-top-0">Updated on</th>
                                <th class="border-top-0">Platform</th>
                                <th class="border-top-0">Project</th>
                                <th class="border-top-0">Version</th>
                                <th class="border-top-0">Environment</th>
                                <th class="border-top-0" width="40%">Title</th>
                                <th class="border-top-0"></th>
                            </tr>
                        </thead>
                        <tbody id="list-content">

                        </tbody>
                    </table>
                </div>
                <nav>
                    <ul class="pagination justify-content-center" id="pagination">
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</div>
@endsection
@push('foot-scripts')
    <script src="/kt-pagination.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js" integrity="sha512-WFN04846sdKMIP5LKNphMaWzU7YpMyCU245etK3g/2ARYbPK9Ub18eG+ljU96qKRCWh+quCY7yefSmlkQw1ANQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
        let _page = 1;
        let _perpage = 20;
        const _projects = @json($projects);
        const _template = `<tr>
                                <td>{TIME}</td>
                                <td>{PLATFORM}</td>
                                <td>{PROJECT}</td>
                                <td>{VERSION}</td>
                                <td>{ENVIRONMENT}<br/><small>{BASEURL}</small></td>
                                <td>{TITLE}</td>
                                <td class="text-end">
                                    <a class="btn btn-sm btn-success text-white" href="/release/{ID}/{TITLE}">Detail</a>
                                </td>
                            </tr>`

        function selectProject(){
            let p = $('#project_id').val()
            console.log(p, _projects)
            const [projectObj] = _.filter(_projects, {id: parseInt(p)})
            let html = ['<option value="">Select Environment</option>']
            if(projectObj?.environments){
                html = [...html, ...projectObj.environments.map((item)=>{
                    return '<option value="'+item.id+'">'+item.name+' ['+item.baseurl+']'+'</option>'
                })]
            }
            console.log(92, html)
            $('#env_id').html(html.join(''))
            changeFilter()
        }
        function pagi(page){
            console.log(page)
            _page = page
            fetchData()
        }
        function changeFilter () {
            _page = 1
            fetchData()
        }
        function fetchData(){
            console.log('fetch Data')
            let formData = {
                project_id: document.getElementById('project_id').value,
                env_id: document.getElementById('env_id').value,
                platform: document.getElementById('platform').value,
                relation_project: true,
                relation_env: true,
                page: _page,
                per_page: _perpage
            }
            $.ajax({
                url: '/api/release',
                type: 'get',
                data: formData,
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('accessToken')
                },
                success: function(res){
                    console.log(res, res.data)
                    let html = []
                    $('#pagination').ktpagination({
                        data: res.data,
                        step: _perpage,
                        onClickHandler: 'pagi'
                    });
                    if(res?.data && res?.data?.data && res.data.data.length > 0) {
                        html = res.data.data.map(item => {
                            return  _template.replace(/{ID}/g, item.id)
                                .replace(/{TIME}/g, item.created_at)
                                .replace(/{PLATFORM}/g, item.platform)
                                .replace(/{TITLE}/g, item.title)
                                .replace(/{VERSION}/g, item.version)
                                .replace(/{PROJECT}/g, item.project.name)
                                .replace(/{ENVIRONMENT}/g, item.environment.name)
                                .replace(/{BASEURL}/g, item.environment.baseurl)

                        })
                    }
                    console.log(html)
                    $('#list-content').html(html.join(''))
                },
                error: function(e){
                    alert('error!');
                }
            });
        }

        $(document).ready(function(){
            checkAuth();
            fetchData()
        })
    </script>
@endpush
