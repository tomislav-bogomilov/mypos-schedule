<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Faker\Factory;

class UserFixtures extends Fixture
{
    private $encoder;

    private $generator;

    /**
     * UserFixtures constructor.
     * @param UserPasswordEncoderInterface $encoder
     */
    public function __construct(UserPasswordEncoderInterface  $encoder)
    {
        $this->encoder = $encoder;
        $this->generator = Factory::create("bg_BG");
    }

    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager): void
    {
        // create administrator user
        $adminUser = $this->createRandomUser('admin@mypos.bg', 'admin#369');
        $manager->persist($adminUser);

        // add random users
        for ($userCounter = 0; $userCounter < 20; $userCounter++) {
            // @TODO add reference for Appointments
            $newRandomeUser = $this->createRandomUser();
            $manager->persist($newRandomeUser);
        }

        $manager->flush();
    }

    /**
     * Create dummy random user for testing and dev purposes
     * @param null|string $email
     * @param null|string $password
     * @return User
     */
    private function createRandomUser($email = null, $password = null):User
    {
         $newRandomUser = new User();
         $newRandomUser->setFirstName($this->generator->firstName());
         $newRandomUser->setLastName($this->generator->lastName());
         $email = empty($email) ? $this->generator->email() : $email;
         $newRandomUser->setEmail($email);
         $newRandomUser->setPersonalID($this->generator->ean13);
         $password = empty($password) ? 'demo123' : $password;
         $newRandomUser->setPassword($this->encoder->encodePassword(
             $newRandomUser,
             $password
         ));

         return $newRandomUser;
    }
}
