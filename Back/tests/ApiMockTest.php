<?php

use App\Service\RickAndMortyGestion;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpClient\MockHttpClient;
use Symfony\Component\HttpClient\Response\MockResponse;

class ApiMockTest extends TestCase { 

    private $rickAndMortyGestion;

    public function __construct(RickAndMortyGestion $_rickAndMortyGestion) {
        $this->rickAndMortyGestion = $_rickAndMortyGestion;
    }

    public function addProduct(): void {
        $requestData = [
            'name' => 'Test product',
            'image' => 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
            'price' => '15',
            'quantity' =>  6,
        ];
        $expectedRequestData = json_encode($requestData, JSON_THROW_ON_ERROR);

        $expectedResponseData = [
            'id' => 11,
            'name' => 'Jimmy',
            'image' => 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            'price' => '25',
            'quantity' =>  2,
        ];
        $mockResponseJson = json_encode($expectedResponseData, JSON_THROW_ON_ERROR);
        $mockResponse = new MockResponse($mockResponseJson, [
            'http_code' => 201,
            'response_headers' => ['Content-Type: application/json'],
        ]);
        
        $httpClient = new MockHttpClient($mockResponse, 'https://rickandmortyapi.com/api/character');

        $requestJson = json_encode($requestData, JSON_THROW_ON_ERROR);

        $response = $httpClient->request('POST', 'api/products', [
            'headers' => [
                'Content-Type: application/json',
                'Accept: application/json',
            ],
            'body' => $requestJson,
        ]);

        if (201 !== $response->getStatusCode()) {
            throw new Exception('Response status code is different than expected.');
        }

        $responseJson = $response->getContent();
        $responseData = json_decode($responseJson, true, 512, JSON_THROW_ON_ERROR);
        
        self::assertSame('POST', $mockResponse->getRequestMethod());
        self::assertSame('http://localhost:8000/api/products', $mockResponse->getRequestUrl());
        self::assertContains('Content-Type: application/json', $mockResponse->getRequestOptions()['headers']);
        self::assertSame($expectedRequestData, $mockResponse->getRequestOptions()['body']);
        self::assertSame($responseData, $expectedResponseData);
    }
}

?>