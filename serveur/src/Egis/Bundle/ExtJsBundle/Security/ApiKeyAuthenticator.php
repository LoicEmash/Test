<?php

namespace Egis\Bundle\ExtJsBundle\Security;

use Symfony\Component\Security\Core\Authentication\SimplePreAuthenticatorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Authentication\Token\PreAuthenticatedToken;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
class ApiKeyAuthenticator implements SimplePreAuthenticatorInterface, AuthenticationFailureHandlerInterface {

    protected $userProvider;

    public function __construct(ApiKeyUserProvider $userProvider) {

        $this->userProvider = $userProvider;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception) {

        return new Response("Authentication Failed.", 403);
    }

    public function createToken(Request $request, $providerKey) {

        
        // look for an apikey query parameter
        $apiKey = $request->query->get('apiKey');
        // or if you want to use an "apikey" header, then do something like this:
        // $apiKey = $request->headers->get('apikey');
        if (!$apiKey) {
            throw new BadCredentialsException('No API key found');
        }
        
        $session = new Session();       
        $sessionApiKey = $session->get("apiKey");
        if (!$sessionApiKey) {
            throw new BadCredentialsException('No Session API key found');
        }
        
        if ($sessionApiKey !== $apiKey) {
            throw new BadCredentialsException('Bad API key');
        }
        return new PreAuthenticatedToken('anon.', $apiKey, $providerKey);
    }

    public function authenticateToken(TokenInterface $token, UserProviderInterface $userProvider, $providerKey) {

        $apiKey = $token->getCredentials();
        $username = $this->userProvider->getUsernameForApiKey($apiKey);

        // User is the Entity which represents your user
        $user = $token->getUser();
        if ($user instanceof User) {
            return new PreAuthenticatedToken(
                    $user, $apiKey, $providerKey, $user->getRoles()
            );
        }

        if (!$username) {
            throw new AuthenticationException(
            sprintf('API Key "%s" does not exist.', $apiKey)
            );
        }
        
        $user = $this->userProvider->loadUserByUsername($username);

        return new PreAuthenticatedToken(
                $user, $apiKey, $providerKey, $user->getRoles()
        );
    }

    public function supportsToken(TokenInterface $token, $providerKey) {

        return $token instanceof PreAuthenticatedToken && $token->getProviderKey() === $providerKey;
    }

}
