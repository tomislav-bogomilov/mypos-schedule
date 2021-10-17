<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\AppointmentRepository;
use App\Validator\NotOverlapingPeriod;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;

/**
 * @ApiResource(
 *     itemOperations={"get", "delete"},
 *     collectionOperations={"get", "post"},
 *     denormalizationContext={
 *        "groups" ={"write"}
 *     },
 *     normalizationContext={
 *        "groups" ={"read"}
 *     },
 *     attributes={"pagination_items_per_page"=5}
 * )
 * @ORM\Entity(repositoryClass=AppointmentRepository::class)
 * @ApiFilter(OrderFilter::class, properties={"startDateTime"})
 * @ApiFilter(DateFilter::class, properties={"startDateTime"})
 * @ApiFilter(SearchFilter::class, properties={"user.email", "user.personalID"})
 */
class Appointment
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="appointments")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"read"})
     */
    private $user;

    /**
     * @ORM\Column(type="datetime")
     * @Assert\DateTime()
     * @Assert\NotBlank()
     * @Groups({"read", "write"})
     * @NotOverlapingPeriod
     */
    private $startDateTime;

    /**
     * @ORM\Column(type="datetime")
     * @Assert\DateTime()
     * @Groups({"read"})
     */
    private $endDateTime;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read", "write"})
     */
    private $comment;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getStartDateTime(): ?\DateTimeInterface
    {
        return $this->startDateTime;
    }

    public function setStartDateTime(\DateTimeInterface $startDateTime): self
    {
        $this->startDateTime = $startDateTime;
        // cloning datetime object so to be modified and automatically set for end of appointment
        $endDateTime = clone $startDateTime;

        //@TODO Getting env from the super global $_ENV is bad practice! Making subscriber setting endDateTime property is far better
        $this->setEndDateTime($endDateTime->modify('+' . $_ENV["APPOINTMENT_DURATION"] . ' minutes'));

        return $this;
    }

    public function getEndDateTime(): ?\DateTimeInterface
    {
        return $this->endDateTime;
    }

    public function setEndDateTime(\DateTimeInterface $endDateTime): self
    {
        $this->endDateTime = $endDateTime;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): self
    {
        $this->comment = $comment;

        return $this;
    }
}
