<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangePasswordUserRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
class AuthController extends Controller
{

    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function userRegister(UserRegisterRequest $request) {
        DB::beginTransaction();
        try {
            $data = $request->only('name', 'password', 'email');
            $data['password'] = Hash::make($data['password']);
            $user = $this->userRepository->create($data);
            DB::commit();
            return response()->json([
                'status' => true,
                'data' => $user,
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'status' => false,
                'data' => $e->getMessage(),
            ], 500);
        }
    }

    public function loginUser(Request $request) {
        $credentials = $request->only('password', 'email');

        if(!auth()->attempt($credentials)){
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $user = auth()->user();
        $token = $user->createToken('user')->accessToken;
        if ($request->has('remember_me')) {
            $token->expires_at = now()->addHours(999999);
            $token->save();
        }

        return response()->json([
            'status' => true,
            'msg' => 'login successfully',
            'data' => $this->userRepository->find($user->id),
            'token' => $token
        ], 200);
    }

    public function changePasswordUser (ChangePasswordUserRequest $request){
        $user = auth()->user();
        $user->password = Hash::make($request->new_password);
        $user->save();
        return response()->json([
            'status' => true,
            'data' => $user,
        ]);
    }


}
