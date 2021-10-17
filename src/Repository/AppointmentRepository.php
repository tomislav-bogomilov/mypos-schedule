<?php

namespace App\Repository;

use App\Entity\Appointment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Appointment|null find($id, $lockMode = null, $lockVersion = null)
 * @method Appointment|null findOneBy(array $criteria, array $orderBy = null)
 * @method Appointment[]    findAll()
 * @method Appointment[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AppointmentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Appointment::class);
    }

    /**
     * Retrieves overlapping appointments for given time period
     *
     * @param $startDateTime
     * @param $endDatetime
     * @return mixed
     */
    public function getOverlapping($startDateTime, $endDatetime)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.startDateTime <= :endDatetimeT')
            ->andWhere('a.endDateTime >= :startDateTimeT')
            ->setParameter('startDateTimeT', $startDateTime)
            ->setParameter('endDatetimeT', $endDatetime)
            ->getQuery()
            ->getResult()
        ;
    }


}
