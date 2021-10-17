<?php

namespace App\Validator;

use App\Repository\AppointmentRepository;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

/**
* @Annotation
*/
class NotOverlapingPeriodValidator  extends ConstraintValidator
{
    /**
     * @var AppointmentRepository
     */
    private $appointmentRepository;

    public function __construct(AppointmentRepository $appointmentRepository)
    {
        $this->appointmentRepository = $appointmentRepository;
    }

    public function validate($value, Constraint $constraint): void
    {
        $fromDateTime = $value->format('Y-m-d H:i:s');
        $toDateTimeObj = $value->modify('+' . $_ENV["APPOINTMENT_DURATION"] . ' minutes');
        $toDateTime = $toDateTimeObj->format('Y-m-d H:i:s');
        $appoitments = $this->appointmentRepository->getOverlapping($fromDateTime, $toDateTime);
        $hasOverlappingAppointments = count($appoitments);
        if ($hasOverlappingAppointments) {
            $this->context->buildViolation('Cannot make this appointment. The chosen time has already been taken.')
                ->addViolation();
        }
    }
}