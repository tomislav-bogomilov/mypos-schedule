<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Appointment;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class ClientAppointmentSubscriber implements EventSubscriberInterface
{

    private $tokenStorage;

    /**
     * ClientAppointmentSubscriber constructor.
     * @param TokenStorageInterface $tokenStorage
     */
    public function __construct(TokenStorageInterface $tokenStorage)
    {

        $this->tokenStorage = $tokenStorage;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setAuthenticatedClient', EventPriorities::PRE_WRITE]
        ];
    }

    public function setAuthenticatedClient(ViewEvent $event)
    {
        $entity = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        /** @var UserInterface */
        $client = $this->tokenStorage->getToken()->getUser();

        if (!$entity instanceof Appointment || Request::METHOD_POST !== $method) {
            return;
        }

        $entity->setUser($client);
    }
}