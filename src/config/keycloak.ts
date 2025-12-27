import Keycloak from 'keycloak-js';

// Keycloak configuration for starting-kit-realm
const keycloakConfig = {
    url: 'http://localhost:8081',
    realm: 'starting-kit-realm',
    clientId: 'starting-kit-frontend'
};

// Initialize Keycloak instance
const keycloak = new Keycloak(keycloakConfig);

export default keycloak;