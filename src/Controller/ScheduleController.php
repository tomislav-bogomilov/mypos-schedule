<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ScheduleController extends AbstractController
{
    /**
     * @Route("/", name="dashboard")
     */
    public function welcome(): Response
    {
        return $this->render('dashboard/main.html.twig');
    }

    /**
    * @Route("/appointments/create", name="make_appointment")
    */
    public function createAppointment(): Response
    {
        return $this->render('dashboard/make_appointment.html.twig');
    }

    /**
    * @Route("/appointment/history", name="appointments_history")
    */
    public function appointmentsHistory(): Response
    {
        return $this->render('dashboard/appointments_history.twig');
    }

    /**
     * @Route("/schedule", name="schedule")
     */
    public function index(): Response
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/ScheduleController.php',
        ]);
    }
}
