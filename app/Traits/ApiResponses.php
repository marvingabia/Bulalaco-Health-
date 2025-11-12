<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponses
{
    protected function ok($message, $data = [], $statusCode = 200): JsonResponse
    {
        return response()->json([
            'message' => $message,
            'data' => $data,
            'status' => $statusCode
        ], $statusCode);
    }

    protected function error($message, $statusCode = 400): JsonResponse
    {
        return response()->json([
            'error' => $message,
            'status' => $statusCode
        ], $statusCode);
    }
}
