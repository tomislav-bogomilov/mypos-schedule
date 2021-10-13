<?php

namespace App\DataFixtures;

use App\Entity\Appointment;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class AppointmentFixtures extends BaseFixtures implements DependentFixtureInterface
{

    public function load(ObjectManager $manager): void
    {
        for ($appointmentCounter = 1; $appointmentCounter < 200; $appointmentCounter++) {
            $appointment = new Appointment();
            $appointment->setUser($this->getRandomReference('regular-user'));
            $appointmentDateTime = $this->generator->dateTimeBetween('-2 weeks', '+4 weeks', 'Europe/Sofia');
            $appointment->setStartDateTime($appointmentDateTime);
            $appointment->setEndDateTime($appointmentDateTime->modify('+30 minutes'));
            $appointment->setComment($this->generator->realText());
            $manager->persist($appointment);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            UserFixtures::class,
        ];
    }
}
