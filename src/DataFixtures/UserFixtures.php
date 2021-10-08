<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Faker\Factory;

class UserFixtures extends BaseFixtures
{
    public const ADMIN_USER_REFERENCE = 'admin-user';
    public const REGULAR_USER_REFERENCE = 'regular-user';

    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;


    /**
     * UserFixtures constructor.
     * @param UserPasswordEncoderInterface $encoder
     */
    public function __construct(UserPasswordEncoderInterface  $encoder)
    {
        parent::__construct();
        $this->encoder = $encoder;
    }

    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager): void
    {
        // create administrator user
        $adminUser = $this->createRandomUser('admin@mypos.bg', 'admin#369');
        $manager->persist($adminUser);
        $this->addReference(self::ADMIN_USER_REFERENCE, $adminUser);

        // add random users
        for ($userCounter = 0; $userCounter < 20; $userCounter++) {
            // @TODO add reference for Appointments
            $newRandomeUser = $this->createRandomUser();
            $manager->persist($newRandomeUser);
            $this->addReference(self::REGULAR_USER_REFERENCE . '_' . $userCounter, $newRandomeUser);
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
