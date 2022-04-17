<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApiTest extends WebTestCase
{
    public function testApiAddition(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/api/');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(['message' => "Hello world"], $responseData);
    }

    public function getProducts(): void
    {
        $client = static::createClient()
        // Request a specific page
        $client->jsonRequest('GET', '/api/products');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertNotEmpty($responseData);
        return $responseData[0];
    }

    public function testProducts() : void {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/api/products');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertNotEmpty($responseData);
    }

    public function testAddProduct(): void {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('POST', '/api/products', [
            'name' => 'Jimmy',
            'image' => 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            'price' => '25',
            'quantity' =>  2,
        ]);
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent());
        $this->assertEquals("Jimmy", $responseData->name);
    }
    
    public function testProduct(): void {
        $client = static::createClient();
        $id = $this->getProducts($client)['id'];
        // Request a specific page
        $client->jsonRequest('GET', '/api/products/'.$id);
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals($id, $responseData['id']);
    }

    public function testAddProductToCart(): void {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('POST', '/api/cart/11', [
            'quantity' => 2
        ]);
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent());
        print_r($responseData);
        $this->assertEquals(11, $responseData->products[0]->id);
    }

    public function testCart(): void {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/api/cart');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent());
        $this->assertEquals(1, count($responseData->products));
    }

    public function testDeleteProductToCart(): void {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('DELETE', '/api/cart/21');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent());
        $this->assertEquals(0, count($responseData->products));
    }
    
    public function testDelete(): void {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('DELETE', '/api/products/11');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(['delete' => 'ok'], $responseData);
    }
}
