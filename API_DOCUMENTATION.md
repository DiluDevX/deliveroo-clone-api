# Deliveroo Clone API - Complete Routes Documentation

## Table of Contents

1. [Authentication Routes](#authentication-routes)
2. [Users Routes](#users-routes)
3. [Restaurants Routes](#restaurants-routes)
4. [Categories Routes](#categories-routes)
5. [Dishes Routes](#dishes-routes)
6. [Cart Routes](#cart-routes)
7. [Orders Routes](#orders-routes)

---

## Authentication Routes

### 1. Check Email

- **Method**: `POST`
- **Endpoint**: `/auth/check-email`
- **Description**: Check if an email exists in the system
- **Request Body**:

```typescript
{
  email: string; // Must be valid email format
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    firstName: string;
    lastName: string;
    email: string;
  }
}
```

---

### 2. Sign Up

- **Method**: `POST`
- **Endpoint**: `/auth/signup`
- **Description**: Register a new user
- **Request Body**:

```typescript
{
  firstName: string;           // 1-50 characters
  lastName: string;            // 1-50 characters
  email: string;               // Valid email format
  phone?: string;              // Optional
  password: string;            // Min 8 chars, must contain:
                               // - 1 lowercase letter
                               // - 1 uppercase letter
                               // - 1 number
                               // - 1 special character (@$!%*?&)
  role?: "platform_admin" | "user" | "restaurant_user";  // Optional, defaults to "user"
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
      role: string;
      createdAt: string;
      updatedAt: string;
    }
  }
}
```

---

### 3. Login

- **Method**: `POST`
- **Endpoint**: `/auth/login`
- **Description**: Authenticate user and get tokens
- **Request Body**:

```typescript
{
  email: string; // User email
  password: string; // User password
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    accessToken: string; // JWT token for authenticated requests
    refreshToken: string; // Token to refresh access token
  }
}
```

---

### 4. Refresh Token

- **Method**: `POST`
- **Endpoint**: `/auth/refresh-token`
- **Description**: Get a new access token using refresh token
- **Headers**:

```typescript
{
  "x-refresh-token": string;  // The refresh token
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    accessToken: string; // New access token
    refreshToken: string; // New refresh token
  }
}
```

---

### 5. Forgot Password

- **Method**: `POST`
- **Endpoint**: `/auth/forgot-password`
- **Description**: Request password reset email
- **Request Body**:

```typescript
{
  email: string; // Email of the account
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    message: string;
  }
}
```

---

### 6. Verify Reset Password Token

- **Method**: `POST`
- **Endpoint**: `/auth/reset-password/verify`
- **Description**: Verify if reset token is valid
- **Request Body**:

```typescript
{
  token: string; // Reset token (min 10 characters)
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
}
```

---

### 7. Reset Password

- **Method**: `POST`
- **Endpoint**: `/auth/reset-password/update`
- **Description**: Update password with reset token
- **Request Body**:

```typescript
{
  token: string; // Reset token (min 10 characters)
  password: string; // New password (same requirements as signup)
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    email: string;
    user_id: string; // ObjectId
  }
}
```

---

### 8. Logout

- **Method**: `POST`
- **Endpoint**: `/auth/logout`
- **Description**: Logout user
- **Request Body**:

```typescript
{
  refreshToken: string;
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
}
```

---

## Users Routes

### 1. Get All Users

- **Method**: `GET`
- **Endpoint**: `/users`
- **Description**: Retrieve all users (Requires admin auth)
- **Query Parameters**: None
- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: [
    {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
      role: string;        // "user", "platform_admin", "restaurant_user"
      createdAt: string;
      updatedAt: string;
    }
  ]
}
```

---

### 2. Get Single User

- **Method**: `GET`
- **Endpoint**: `/users/:id`
- **Description**: Get user by ID
- **Path Parameters**:

```typescript
{
  id: string; // Valid MongoDB ObjectId
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  }
}
```

---

### 3. Create User

- **Method**: `POST`
- **Endpoint**: `/users`
- **Description**: Create a new user (Requires admin auth)
- **Request Body**:

```typescript
{
  firstName: string;                                              // 1-50 characters
  lastName: string;                                               // 1-50 characters
  email: string;                                                  // Valid email
  phone?: string;                                                 // Optional
  password: string;                                               // Min 8 chars, special requirements
  role: "user" | "platform_admin" | "restaurant_user";           // User role
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  }
}
```

---

### 4. Update User Partially

- **Method**: `PATCH`
- **Endpoint**: `/users/:id`
- **Description**: Partially update user (Requires auth)
- **Path Parameters**:

```typescript
{
  id: string; // Valid MongoDB ObjectId
}
```

- **Request Body** (all fields optional):

```typescript
{
  firstName?: string;                                    // 1-50 characters
  lastName?: string;                                     // 1-50 characters
  email?: string;                                        // Valid email
  phone?: string;                                        // Optional
  password?: string;                                     // Min 8 chars, special requirements
  role?: "user" | "platform_admin" | "restaurant_user"; // Optional
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  }
}
```

---

### 5. Delete User

- **Method**: `DELETE`
- **Endpoint**: `/users/:id`
- **Description**: Delete a user (Requires admin auth)
- **Path Parameters**:

```typescript
{
  id: string; // Valid MongoDB ObjectId
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
  } // Empty object
}
```

---

## Restaurants Routes

### 1. Get All Restaurants

- **Method**: `GET`
- **Endpoint**: `/restaurants`
- **Description**: Get all restaurants (Public)
- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: [
    {
      id: string;
      name: string;
      image: string;
      description?: string;
      tags: string[];                    // e.g., ["fast-food", "delivery"]
      minimumValue: string;              // Minimum order value
      deliveryCharge: string;            // Delivery cost
      cuisine: string;                   // Cuisine type
      rating: number;                    // Restaurant rating
      operatingHours: [
        {
          day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
          openAt: string;                // Time format "HH:MM"
          closeAt: string;               // Time format "HH:MM"
          isOpen: boolean;
        }
      ];
      status: "active" | "disabled";
      commissionPercentage?: number;     // Platform commission
    }
  ]
}
```

---

### 2. Get Single Restaurant

- **Method**: `GET`
- **Endpoint**: `/restaurants/:restaurantId`
- **Description**: Get restaurant details by slug/ID (Public)
- **Path Parameters**:

```typescript
{
  restaurantId: string; // Restaurant ID or slug (4-40 chars, alphanumeric with dashes/underscores)
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    image: string;
    description?: string;
    tags: string[];
    minimumValue: string;
    deliveryCharge: string;
    cuisine: string;
    rating: number;
    operatingHours: [
      {
        day: string;
        openAt: string;
        closeAt: string;
        isOpen: boolean;
      }
    ];
    status: "active" | "disabled";
    commissionPercentage?: number;
  }
}
```

---

### 3. Create Restaurant

- **Method**: `POST`
- **Endpoint**: `/restaurants`
- **Description**: Create new restaurant (Requires admin auth)
- **Request Body**:

```typescript
{
  name: string;                         // 1-30 characters
  description?: string;                 // 3-150 characters
  image: string;                        // Image URL
  tags: string[];                       // Array of tags (3-30 chars each)
  cuisine: string;                      // Cuisine type
  minimumValue: string;                 // Minimum order value
  deliveryCharge: string;               // Delivery charge
  commissionPercentage?: number;        // 0-100, defaults to 10
  adminId: string;                      // Restaurant admin user ID
  operatingHours: [
    {
      day: "Monday" | "Tuesday" | ... | "Sunday";
      openAt: string;                   // Time format "HH:MM"
      closeAt: string;                  // Time format "HH:MM"
      isOpen: boolean;
    }
  ]
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    image: string;
    description?: string;
    tags: string[];
    minimumValue: string;
    deliveryCharge: string;
    cuisine: string;
    rating: number;
    operatingHours: [...];
    status: "active" | "disabled";
    commissionPercentage?: number;
  }
}
```

---

### 4. Update Restaurant (Full)

- **Method**: `PUT`
- **Endpoint**: `/restaurants/:id`
- **Description**: Fully update restaurant (Requires restaurant admin auth)
- **Path Parameters**:

```typescript
{
  id: string; // Valid MongoDB ObjectId
}
```

- **Request Body**:

```typescript
{
  name: string;                    // 1-30 characters
  description?: string;            // 3-150 characters
  image: string;                   // Image URL
  tags: string[];                  // Array of tags
  cuisine: string;
  minimumValue: string;
  deliveryCharge: string;
  commissionPercentage?: number;
  operatingHours: [...]
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    image: string;
    description?: string;
    tags: string[];
    minimumValue: string;
    deliveryCharge: string;
    cuisine: string;
    rating: number;
    operatingHours: [...];
    status: "active" | "disabled";
    commissionPercentage?: number;
  }
}
```

---

### 5. Update Restaurant (Partial)

- **Method**: `PATCH`
- **Endpoint**: `/restaurants/:id`
- **Description**: Partially update restaurant (Requires restaurant admin auth)
- **Path Parameters**:

```typescript
{
  id: string; // Valid MongoDB ObjectId
}
```

- **Request Body** (all optional):

```typescript
{
  name?: string;
  description?: string;
  image?: string;
  tags?: string[];
  cuisine?: string;
  minimumValue?: string;
  deliveryCharge?: string;
  commissionPercentage?: number;
  operatingHours?: [...]
}
```

- **Response**: Same as Full Update

---

### 6. Delete Restaurant

- **Method**: `DELETE`
- **Endpoint**: `/restaurants/:id`
- **Description**: Delete restaurant (Requires restaurant admin auth)
- **Path Parameters**:

```typescript
{
  id: string; // Valid MongoDB ObjectId
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    // ... restaurant details
  }
}
```

---

## Categories Routes

### 1. Get All Categories

- **Method**: `GET`
- **Endpoint**: `/categories`
- **Description**: Get all categories (Public)
- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: [
    {
      id: string;
      name: string;
      restaurant: string;  // Restaurant ID
    }
  ]
}
```

---

### 2. Get Single Category

- **Method**: `GET`
- **Endpoint**: `/categories/:id`
- **Description**: Get category by ID (Public)
- **Path Parameters**:

```typescript
{
  id: string; // Valid MongoDB ObjectId
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    restaurant: string;
  }
}
```

---

### 3. Create Category

- **Method**: `POST`
- **Endpoint**: `/categories`
- **Description**: Create new category (Requires restaurant admin auth)
- **Request Body**:

```typescript
{
  name: string; // 1-20 characters
  restaurant: string; // Restaurant ID (1-30 characters)
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    restaurant: string;
  }
}
```

---

### 4. Update Category (Full)

- **Method**: `PUT`
- **Endpoint**: `/categories/:id`
- **Description**: Fully update category (Requires restaurant admin auth)
- **Path Parameters**:

```typescript
{
  id: string; // Valid MongoDB ObjectId
}
```

- **Request Body**:

```typescript
{
  name: string; // 1-20 characters (required)
  restaurant: string; // Restaurant ID (required)
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    restaurant: string;
  }
}
```

---

### 5. Update Category (Partial)

- **Method**: `PATCH`
- **Endpoint**: `/categories/:id`
- **Description**: Partially update category (Requires restaurant admin auth)
- **Path Parameters**:

```typescript
{
  id: string; // Valid MongoDB ObjectId
}
```

- **Request Body** (all optional):

```typescript
{
  name?: string;
  restaurant?: string;
}
```

- **Response**: Same as Full Update

---

### 6. Delete Category

- **Method**: `DELETE`
- **Endpoint**: `/categories/:id`
- **Description**: Delete category (Requires restaurant admin auth)
- **Path Parameters**:

```typescript
{
  id: string; // Valid MongoDB ObjectId
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    restaurant: string;
  }
}
```

---

## Dishes Routes

### 1. Get All Dishes

- **Method**: `GET`
- **Endpoint**: `/dishes`
- **Description**: Get all dishes with optional filters (Public)
- **Query Parameters**:

```typescript
{
  populate?: string;  // Optional field to populate
  restaurant?: string;  // Filter by restaurant ID (4-40 chars)
  category?: string;    // Filter by category ID (4-40 chars)
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: [
    {
      _id: string;               // MongoDB ObjectId
      id: string;
      restaurantId: string;      // MongoDB ObjectId
      name: string;              // 4-50 characters
      description?: string;      // 3-150 characters
      price: number;             // Min 1
      image: string;             // Image URL
      categoryId: string;        // MongoDB ObjectId
      isVegetarian: boolean;     // Defaults to false
      isSpicy: boolean;          // Defaults to false
      isAvailable: boolean;      // Defaults to true
      tags?: "bestseller" | "new" | "special";
      createdAt: string;
      updatedAt: string;
    }
  ]
}
```

---

### 2. Get Single Dish

- **Method**: `GET`
- **Endpoint**: `/dishes/:id`
- **Description**: Get dish details (Public)
- **Path Parameters**:

```typescript
{
  id: string; // Valid MongoDB ObjectId
}
```

- **Query Parameters** (optional):

```typescript
{
  populate?: string;
  restaurant?: string;
  category?: string;
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    _id: string;
    id: string;
    restaurantId: string;
    name: string;
    description?: string;
    price: number;
    image: string;
    categoryId: string;
    isVegetarian: boolean;
    isSpicy: boolean;
    isAvailable: boolean;
    tags?: "bestseller" | "new" | "special";
    createdAt: string;
    updatedAt: string;
  }
}
```

---

### 3. Create Dish

- **Method**: `POST`
- **Endpoint**: `/dishes`
- **Description**: Create new dish (Requires restaurant admin auth)
- **Request Body**:

```typescript
{
  name: string;                                    // 4-50 characters
  description?: string;                           // 3-150 characters
  price: number;                                  // Min 1
  image: string;                                  // Image URL
  categoryId: string;                             // Category ID (4-40 chars)
  restaurant: string;                             // Restaurant ID (4-40 chars)
  isVegetarian?: boolean;                         // Defaults to false
  isSpicy?: boolean;                              // Defaults to false
  isAvailable?: boolean;                          // Defaults to true
  tags?: "bestseller" | "new" | "special";
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    _id: string;
    id: string;
    restaurantId: string;
    name: string;
    description?: string;
    price: number;
    image: string;
    categoryId: string;
    isVegetarian: boolean;
    isSpicy: boolean;
    isAvailable: boolean;
    tags?: string;
    createdAt: string;
    updatedAt: string;
  }
}
```

---

### 4. Update Dish (Full)

- **Method**: `PUT`
- **Endpoint**: `/dishes/:id`
- **Description**: Fully update dish (Requires restaurant admin auth)
- **Path Parameters**:

```typescript
{
  id: string; // Valid MongoDB ObjectId
}
```

- **Request Body** (all required):

```typescript
{
  name: string;
  description?: string;
  price: number;
  image: string;
  categoryId: string;
  restaurant: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isAvailable?: boolean;
  tags?: "bestseller" | "new" | "special";
}
```

- **Response**: Same as Create Dish

---

### 5. Update Dish (Partial)

- **Method**: `PATCH`
- **Endpoint**: `/dishes/:id`
- **Description**: Partially update dish (Requires restaurant admin auth)
- **Path Parameters**:

```typescript
{
  id: string; // Valid MongoDB ObjectId
}
```

- **Request Body** (all optional):

```typescript
{
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  categoryId?: string;
  restaurant?: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isAvailable?: boolean;
  tags?: "bestseller" | "new" | "special";
}
```

- **Response**: Same as Create Dish

---

### 6. Delete Dish

- **Method**: `DELETE`
- **Endpoint**: `/dishes/:id`
- **Description**: Delete dish (Requires restaurant admin auth)
- **Path Parameters**:

```typescript
{
  id: string; // Valid MongoDB ObjectId
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    _id: string;
    id: string;
    restaurantId: string;
    name: string;
    // ... dish details
  }
}
```

---

## Cart Routes

### 1. Get Cart

- **Method**: `GET`
- **Endpoint**: `/cart/:userId`
- **Description**: Get user's cart (Requires auth)
- **Path Parameters**:

```typescript
{
  userId: string; // Valid MongoDB ObjectId
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    _id: string;               // Cart MongoDB ObjectId
    userId: string;
    restaurantId: string;
    items: [
      {
        dishId: string;
        quantity: number;
      }
    ];
    createdAt: string;
    updatedAt: string;
  }
}
```

---

### 2. Add to Cart

- **Method**: `POST`
- **Endpoint**: `/cart`
- **Description**: Add item to cart (Requires auth)
- **Request Body**:

```typescript
{
  userId: string;              // User ID
  item: {
    dishId: string;            // Dish ID
    name: string;              // Dish name
    price: number;             // Dish price (positive)
    quantity: number;          // Quantity (positive integer)
    restaurantId?: string;
    image?: string;            // Image URL
    description?: string;
  }
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    _id: string;
    userId: string;
    restaurantId: string;
    items: [
      {
        dishId: string;
        quantity: number;
      }
    ];
    createdAt: string;
    updatedAt: string;
  }
}
```

---

### 3. Update Cart Item

- **Method**: `PATCH`
- **Endpoint**: `/cart/:userId/items/:dishId`
- **Description**: Update quantity of item in cart (Requires auth)
- **Path Parameters**:

```typescript
{
  userId: string; // Valid MongoDB ObjectId
  dishId: string; // Valid MongoDB ObjectId
}
```

- **Request Body**:

```typescript
{
  quantity: number; // Positive integer
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    _id: string;
    userId: string;
    restaurantId: string;
    items: [
      {
        dishId: string;
        quantity: number;
      }
    ];
    createdAt: string;
    updatedAt: string;
  }
}
```

---

### 4. Remove from Cart

- **Method**: `DELETE`
- **Endpoint**: `/cart/:userId/items/:dishId`
- **Description**: Remove specific item from cart (Requires auth)
- **Path Parameters**:

```typescript
{
  userId: string; // Valid MongoDB ObjectId
  dishId: string; // Valid MongoDB ObjectId
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    _id: string;
    userId: string;
    restaurantId: string;
    items: [
      {
        dishId: string;
        quantity: number;
      }
    ];
    createdAt: string;
    updatedAt: string;
  }
}
```

---

### 5. Clear Cart

- **Method**: `DELETE`
- **Endpoint**: `/cart/:userId`
- **Description**: Clear all items from cart (Requires auth)
- **Path Parameters**:

```typescript
{
  userId: string; // Valid MongoDB ObjectId
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    _id: string;
    userId: string;
    restaurantId: string;
    items: []; // Empty array
    createdAt: string;
    updatedAt: string;
  }
}
```

---

## Orders Routes

### 1. Get All Orders

- **Method**: `GET`
- **Endpoint**: `/orders`
- **Description**: Get all orders (Requires auth - admin/restaurant admin)
- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: [
    {
      id: string;
      restaurantId: string;    // MongoDB ObjectId
      userId: string;
      items: [
        {
          dishId: string;
          name: string;
          price: number;
          quantity: number;
          category: string;
          image: string;
        }
      ];
      subtotal: number;
      discount?: {
        _id: string;
        type: "percentage" | "fixed";
        code?: string;
        value: number;
        amount: number;
      };
      tax: number;
      deliveryFee: number;
      totalAmount: number;
      status: "Done" | "Pending" | "Cancelled";
      createdAt: string;
      updatedAt: string;
    }
  ]
}
```

---

### 2. Create Order

- **Method**: `POST`
- **Endpoint**: `/orders`
- **Description**: Create new order (Requires auth)
- **Request Body**:

```typescript
{
  restaurantId: string;            // Restaurant ID
  userId: string;
  items: [
    {
      dishId: string;
      name: string;
      price: number;
      quantity: number;
      category: string;
      image: string;
    }
  ];
  subtotal: number;
  discount?: {
    type: "percentage" | "fixed";
    code?: string;
    value: number;
    amount: number;
  };
  tax: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: "cash-on-delivery" | "card";
}
```

- **Response**:

```typescript
{
  success: boolean;
  message: string;
  data: {
    id: string;
    restaurantId: string;
    userId: string;
    items: [
      {
        dishId: string;
        name: string;
        price: number;
        quantity: number;
        category: string;
        image: string;
      }
    ];
    subtotal: number;
    discount?: {
      _id: string;
      type: "percentage" | "fixed";
      code?: string;
      value: number;
      amount: number;
    };
    tax: number;
    deliveryFee: number;
    totalAmount: number;
    status: "Done" | "Pending" | "Cancelled";
    createdAt: string;
    updatedAt: string;
  }
}
```

---

## Common Response Structure

All API responses follow this structure:

```typescript
{
  success: boolean;              // Always present
  message: string;               // Always present
  data?: T;                       // Present on success or specific endpoints
  errors?: [
    {
      field: string;
      message: string;
    }
  ];                             // Present on validation errors
}
```

---

## Authentication

Most endpoints (except public ones) require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <accessToken>
```

### Protected Endpoints:

- **Restaurant Admin Only** (Authorization required):

  - Create/Update/Delete Restaurants, Categories, Dishes
  - Update Restaurant status
  - View orders for their restaurant

- **User Routes**:

  - Get all users (admin only)
  - Create user (admin only)
  - Update user (admin only or self)
  - Delete user (admin only)

- **Cart Routes**:

  - All operations (authenticated users)

- **Order Routes**:
  - Get all orders (admin/restaurant admin)
  - Create order (authenticated users)

### Public Endpoints:

- Get all restaurants
- Get restaurant details
- Get all categories
- Get category details
- Get all dishes
- Get dish details
- Auth endpoints (signup, login, forgot-password, etc.)

---

## Error Responses

Common HTTP Status Codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Server Error

Example Error Response:

```typescript
{
  success: false;
  message: "Validation failed";
  errors: [
    {
      field: "email";
      message: "Invalid email format";
    },
    {
      field: "password";
      message: "Password must contain at least one special character";
    }
  ]
}
```

---
