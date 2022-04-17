<?php

namespace App\Tests;

use App\Model\RickAndMortyModel;
use PHPUnit\Framework\TestCase;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ModelTest extends WebTestCase
{
    public function testSetName(): void
    {
        $rickAndMortyModel = new RickAndMortyModel();
        $rickAndMortyModel->setName("Rick");
        $this->assertEquals("Rick", $rickAndMortyModel->getName());
    }

    public function testSetImage(): void
    {
        $rickAndMortyModel = new RickAndMortyModel();
        $rickAndMortyModel->setImage("https://rickandmortyapi.com/api/character/avatar/1.jpeg");
        $this->assertEquals("https://rickandmortyapi.com/api/character/avatar/1.jpeg", $rickAndMortyModel->getImage());
    }
}