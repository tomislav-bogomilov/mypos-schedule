<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    private $encoder;

     public function __construct(UserPasswordEncoderInterface  $encoder)
     {
         $this->encoder = $encoder;
     }
    public function load(ObjectManager $manager): void
    {
        $user = new User();
        $user->setEmail('admin@example.com');
        $user->setPassword($this->encoder->encodePassword(
            $user,
            'admin@369'
        ));

        $manager->flush();
    }
}
