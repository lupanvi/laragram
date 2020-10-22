<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Laravel\Sanctum\Sanctum;
use App\User;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected function signIn($user = null)
    {        

        $user = $user ?: factory(User::class)->create();
        Sanctum::actingAs($user, ['*']);
        return $user;
    }
}
