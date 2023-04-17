<?php

namespace App\Http\Controllers\API;

use App\Helpers\Filter;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateReleaseRequest;
use App\Repositories\ReleaseRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ReleaseController extends Controller
{

    protected $releaseRepository;

    public function __construct(ReleaseRepository $releaseRepository)
    {
        $this->releaseRepository = $releaseRepository;
    }

    public function csUpload($key, $id){
        $file_path = public_path('files/release/'.$id).'/';
        $fileName = '';
        if(isset($_FILES[$key]["full_path"])){
            $fileName = $_FILES[$key]["full_path"];
        }
        if(isset($_FILES[$key]["name"])){
            $fileName = $_FILES[$key]["name"];
        }
        if (!file_exists($file_path)) {
            // Create a new file or direcotry
            mkdir($file_path, 0777, true);
        }
        if (move_uploaded_file($_FILES["$key"]["tmp_name"], $file_path.$fileName)) {
            return '/files/release/'.$id.'/'.$fileName;
        } else {
            return false;
        }
    }

    public function create(CreateReleaseRequest $request) {
        DB::beginTransaction();
        try {
            $data = $request->all();
//            dd($data);
            $release = $this->releaseRepository->create($data);
            if($request->platform == 'android'){
                $apk = $this->csUpload('apk', $release->id);
                $bundle = [
                    'apk' => $apk
                ];
            }
//            dd($release);
            if($request->platform == 'ios'){
                $ipa = $this->csUpload('ipa', $release->id);
                $plistContent = file_get_contents(public_path('files/sample-plist.xml'));
                $plistContent = str_replace('{IPA-URL}', 'https://release.dev-enjoyworks.com'.$ipa, $plistContent);
                $plistContent = str_replace('{BUNDLE-IDENTIFIER}', $request->get('bundle-identifier'), $plistContent);
                $plistContent = str_replace('{BUNDLE-VERSION}', $request->get('bundle-version'), $plistContent);
                $plistContent = str_replace('{BUNDLE-TITLE}', $request->get('bundle-title'), $plistContent);

//                dd($plistContent);
                $plistPath =  '/files/release/'.$release->id.'/manifest-ios.plist';
                file_put_contents(public_path($plistPath), $plistContent);

                $bundle = [
                    'ipa' => $ipa,
                    'bundle-identifier' => $request->get('bundle-identifier'),
                    'bundle-version' => $request->get('bundle-version'),
                    'bundle-title' => $request->get('bundle-title'),
                    'plist' => $plistPath
                ];
            }
//            dd($release, $plist, $ipa);

            $release->bundle = $bundle;
            $release->creator = auth()->guard('api')->user()->id;
            $release->save();
            DB::commit();
            return response()->json([
                'status' => true,
                'data' => $release,
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'status' => false,
                'data' => $e->getMessage(),
            ], 500);
        }
    }

    public function getReleases(Request $request) {

        $filter = new Filter([
            'project_id' => $request->project_id,
            'env_id' => $request->env_id,
            'platform' => $request->platform,
            'title' => $request->title,
            'note' => $request->note,
            'version' => $request->version,
            'page' => $request->page ?? 1,
            'per_page' => $request->per_page ?? 10,
            'order_by_created_at' => $request->order_by_created_at ?? 'desc',
            'relation_project' => $request->relation_project,
            'relation_env' => $request->relation_env
        ]);

        $release = $this->releaseRepository->getReleases($filter);

        return response()->json([
            'status' => true,
            'data' => $release,
        ]);
    }

    public function getReleaseDetail ($id) {

        $release = $this->releaseRepository->find($id);

        if($release){
            $release->load(['project','environment']);
        }

        return response()->json([
            'status' => true,
            'data' => $release,
        ]);

    }
}
