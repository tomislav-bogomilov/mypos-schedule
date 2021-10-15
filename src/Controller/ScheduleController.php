<?php

namespace App\Controller;

use App\Repository\AppointmentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ScheduleController extends AbstractController
{
    /**
     * @Route("/", name="dashboard")
     */
    public function dashboard(): Response
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
    * @Route("/appointments/history", name="appointments_history")
    */
    public function appointmentsHistory(): Response
    {
        return $this->render('dashboard/appointments_history.twig');
    }

    /**
    * @Route("/appointments/list", name="appointments_list")
    */
    public function allAppointmentsList(): Response
    {
        return $this->render('dashboard/appointments_list.twig');
    }

    /**
     * @Route("/appointments/view/{id}", name="schedule")
     */
    public function view($id): Response
    {
        return $this->render('dashboard/appointments_view.twig', [
            'appointmentId' => $id
        ]);
    }
}
