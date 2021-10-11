<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ScheduleController extends AbstractController
{
    /**
     * @Route("/", name="default_welcome")
     */
    public function welcome(): Response
    {
        return $this->render('dashboard/main.html.twig');
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
