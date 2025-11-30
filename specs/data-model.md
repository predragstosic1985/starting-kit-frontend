# Data Model: Responsive Frontend Application

## Entities

### User
Represents an authenticated user of the application with role-based access control.

**Fields**:
- `id`: string (unique identifier, generated on frontend)
- `username`: string (required, unique)
- `password`: string (required, hashed on frontend for demo purposes)
- `role`: 'SuperAdmin' | 'Admin' | 'User' (required, determines permissions)
- `isLoggedIn`: boolean (session state)
- `theme`: 'light' | 'dark' | 'auto' (optional, user theme preference)
- `assignedTheme`: string (optional, theme assigned by SuperAdmin)

**Validation Rules**:
- Username: Required, minimum 3 characters, alphanumeric
- Password: Required, minimum 8 characters
- Role: Must be one of the defined role types
- All required fields must be non-empty

**Relationships**:
- SuperAdmin can assign themes to other users
- Admin has elevated permissions over regular Users
- Theme assignments can override user preferences

**State Transitions**:
- Initial: Not logged in
- Login successful: Transition to logged in state with role-based access
- Logout: Transition back to not logged in
- Invalid login: Remain not logged in with error
- Role change: Update permissions and UI accordingly

## Notes
- Since this is a frontend-only application, data is stored in browser storage
- User authentication is simulated on frontend for POC purposes
- In production, this would integrate with a backend authentication service