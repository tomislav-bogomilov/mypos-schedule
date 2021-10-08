<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class BaseFixtures extends Fixture
{
    /**
     * @var \Faker\Generator
     */
    protected $generator;

    /**
     * BaseFixtures constructor.
     */
    public function __construct()
    {
        $this->generator = Factory::create("bg_BG");
    }

    protected function getRandomReference(string $className)
    {
        if (!isset($this->referencesIndex[$className])) {
            $this->referencesIndex[$className] = [];
            foreach ($this->referenceRepository->getReferences() as $key => $ref) {
                if (strpos($key, $className.'_') === 0) {
                    $this->referencesIndex[$className][] = $key;
                }
            }
        }
        if (empty($this->referencesIndex[$className])) {
            throw new \Exception(sprintf('Cannot find any references for class "%s"', $className));
        }
        $randomReferenceKey = $this->generator->randomElement($this->referencesIndex[$className]);

        return $this->getReference($randomReferenceKey);
    }

    /**
     * Load data fixtures with the passed EntityManager
     */
    public function load(ObjectManager $manager)
    {
        // Fixtures are split into separate files
    }
}
