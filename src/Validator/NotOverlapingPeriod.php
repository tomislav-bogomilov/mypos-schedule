<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

/**
* @Annotation
*/
class NotOverlapingPeriod extends Constraint
{
    public $message = 'Rorrii rori riro';
    public $mode = 'strict';
}