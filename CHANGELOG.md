## [1.5.1](https://github.com/DiluDevX/deliveroo-clone-api/compare/v1.5.0...v1.5.1) (2026-07-13)

### Bug Fixes

* trigger azure deployment ([bc9a2aa](https://github.com/DiluDevX/deliveroo-clone-api/commit/bc9a2aa018401f31aa5b6b492e8b642a110cf993))

## [1.5.0](https://github.com/DiluDevX/deliveroo-clone-api/compare/v1.4.0...v1.5.0) (2026-07-01)

### Features

- update auth context middleware, and improve proxy service header handling ([b6a9f57](https://github.com/DiluDevX/deliveroo-clone-api/commit/b6a9f572e9289d02253fd830b30e7934b20ac9a3))

## [1.4.0](https://github.com/DiluDevX/deliveroo-clone-api/compare/v1.3.0...v1.4.0) (2026-07-01)

### Features

- add category and dish proxy routes with authentication middleware ([083ffb3](https://github.com/DiluDevX/deliveroo-clone-api/commit/083ffb32289ba223b214381a212535d6f77e6870))

## [1.3.0](https://github.com/DiluDevX/deliveroo-clone-api/compare/v1.2.0...v1.3.0) (2026-06-25)

### Features

- add user email and name to payment intent headers ([55e8bba](https://github.com/DiluDevX/deliveroo-clone-api/commit/55e8bbaa9fbc167e1205e13a7cb24a05d7b01956))

## [1.2.0](https://github.com/DiluDevX/deliveroo-clone-api/compare/v1.1.6...v1.2.0) (2026-06-25)

### Features

- add user email and name to auth context and proxy headers ([24fa938](https://github.com/DiluDevX/deliveroo-clone-api/commit/24fa9382890ccddf06e3031141ea8371ce012cd8))

## [1.1.6](https://github.com/DiluDevX/deliveroo-clone-api/compare/v1.1.5...v1.1.6) (2026-06-25)

### Bug Fixes

- trigger bff azure deployment ([7902dd8](https://github.com/DiluDevX/deliveroo-clone-api/commit/7902dd87cb86796824f73ae74e12c2651f89b55e))

## [1.1.5](https://github.com/DiluDevX/deliveroo-clone-api/compare/v1.1.4...v1.1.5) (2026-05-28)

### Bug Fixes

- trigger azure static web app deployment ([051f2c3](https://github.com/DiluDevX/deliveroo-clone-api/commit/051f2c3365c6a003b93118153e841ab69f30726d))

## [1.1.4](https://github.com/DiluDevX/deliveroo-clone-api/compare/v1.1.3...v1.1.4) (2026-05-28)

### Bug Fixes

- update HOST_PORT to 3000 and bind to localhost in Azure deployment ([3015d61](https://github.com/DiluDevX/deliveroo-clone-api/commit/3015d61bca4e39679f757f1b3ce587db0d39aacc))

## [1.1.3](https://github.com/DiluDevX/deliveroo-clone-api/compare/v1.1.2...v1.1.3) (2026-05-27)

### Bug Fixes

- trigger bff azure deployment ([ce4422b](https://github.com/DiluDevX/deliveroo-clone-api/commit/ce4422bfd3c320abc21d7cee0ad2ff10b2214b28))

## [1.1.2](https://github.com/DiluDevX/deliveroo-clone-api/compare/v1.1.1...v1.1.2) (2026-05-27)

### Bug Fixes

- fetch tags when extracting release version ([d14a5ca](https://github.com/DiluDevX/deliveroo-clone-api/commit/d14a5cace9fc4289af14cda1e5c1ad980104e394))
- trigger bff azure deployment ([e5a185e](https://github.com/DiluDevX/deliveroo-clone-api/commit/e5a185e3720d911089be445eb72c10c31ab65d34))

## [1.1.1](https://github.com/DiluDevX/deliveroo-clone-api/compare/v1.1.0...v1.1.1) (2026-05-27)

### Bug Fixes

- trigger bff azure deployment ([5d1a520](https://github.com/DiluDevX/deliveroo-clone-api/commit/5d1a520e14dbcc27191a434209be95e58f552b77))

## [1.1.0](https://github.com/DiluDevX/deliveroo-clone-api/compare/v1.0.0...v1.1.0) (2026-05-27)

### Features

- trigger CI/CD pipeline ([cd17e6e](https://github.com/DiluDevX/deliveroo-clone-api/commit/cd17e6ed078f1baca91be780742abbeccba674fc))

## 1.0.0 (2026-05-27)

### Features

- Add API key to axios headers for authentication requests ([7547edd](https://github.com/DiluDevX/deliveroo-clone-api/commit/7547edd6fb4473ad53ecbe63d4b6eb5002ce9dcd))
- add category and dish models, update restaurant model, and configure server with dotenv ([18470d6](https://github.com/DiluDevX/deliveroo-clone-api/commit/18470d6213f7006bb7ca7387df49e01939b02b79))
- add CORS support and update package dependencies ([431acb2](https://github.com/DiluDevX/deliveroo-clone-api/commit/431acb2f0f258830ccc785e28e07e95e24581f5d))
- add delete validation schemas for categories, dishes, and restaurants ([f07eb37](https://github.com/DiluDevX/deliveroo-clone-api/commit/f07eb37679f9c5e9d4105560c68850c0af40f212))
- add email service for password reset functionality and integrate nodemailer ([20dead7](https://github.com/DiluDevX/deliveroo-clone-api/commit/20dead7090cb5e2f60d9436ae482bd61b60fb2e6))
- add environment configuration and update documentation for setup instructions ([91f46fe](https://github.com/DiluDevX/deliveroo-clone-api/commit/91f46fecddda1a01b165a9a5005faee0714baafc))
- add Google Auth library and implement OAuth token validation ([c05efff](https://github.com/DiluDevX/deliveroo-clone-api/commit/c05efff190c9bc7d0b9f49e1e51ca85a39c1b909))
- add health check for auth and mail services in the health endpoint ([76c9ebe](https://github.com/DiluDevX/deliveroo-clone-api/commit/76c9ebe9ec8c768a481a44537f67da5e637b415f))
- add minimumValue and deliveryCharge fields to restaurant model and schema ([c2e2996](https://github.com/DiluDevX/deliveroo-clone-api/commit/c2e29969b9196ed3110a57c95a7f0a87e3007114))
- add orgId field to restaurant model and update related services ([da37987](https://github.com/DiluDevX/deliveroo-clone-api/commit/da37987865d4b9309e1c6fea8ce0bd2f4947f754))
- add parameter validation for getARestaurant route ([0d9a994](https://github.com/DiluDevX/deliveroo-clone-api/commit/0d9a994e0f96fa8fa75af85abcb9b336ff8121e4))
- add query validation for dish routes and extend dish schema for restaurant field ([fc46266](https://github.com/DiluDevX/deliveroo-clone-api/commit/fc462668bab7a5e80b4d45f4d6aae37d50a2491f))
- add restaurant and dish routes with CRUD operations ([58b8fe2](https://github.com/DiluDevX/deliveroo-clone-api/commit/58b8fe2718258978e0cb7b0257b2e48a979e21f7))
- add restaurant field to category and dish models, refactor restaurant routes and controllers ([d7c916c](https://github.com/DiluDevX/deliveroo-clone-api/commit/d7c916c8eeb31a509cc0974b7ad493a9a040054f))
- Add schemas for authentication, cart, category, common, dish, restaurant, and user management ([db8a05d](https://github.com/DiluDevX/deliveroo-clone-api/commit/db8a05d7bc687ad74ce97be9946b5594ebe8f1b8))
- Add Swagger documentation for API endpoints ([257a90c](https://github.com/DiluDevX/deliveroo-clone-api/commit/257a90c58d08497d51556d8f415aa3614173ff4b))
- Add Swagger documentation for health check endpoint ([12cbae2](https://github.com/DiluDevX/deliveroo-clone-api/commit/12cbae2f58866539c556e51a7372da766c76d191))
- add validation for reset password token and update user password request/response DTOs ([593d2ce](https://github.com/DiluDevX/deliveroo-clone-api/commit/593d2ce357c28a2c7a665013bee94cf4cc6cc03e))
- add validation middleware and schema for restaurant routes ([860e67b](https://github.com/DiluDevX/deliveroo-clone-api/commit/860e67bb4c5fe0126878c4df6e3903024c9d0f12))
- add validation schemas and middleware for categories and dishes routes ([b477960](https://github.com/DiluDevX/deliveroo-clone-api/commit/b4779601603b3ba64612c43d2dadf0c80048fc5e))
- **auth:** add refresh token support and enhance validation ([8e8bb88](https://github.com/DiluDevX/deliveroo-clone-api/commit/8e8bb888a177546aa31f5e5d3f5e90e253f21702))
- **cart:** implement cart functionality with CRUD operations ([1665bf2](https://github.com/DiluDevX/deliveroo-clone-api/commit/1665bf2560010823f2d18fa41e35911c6eca6721))
- correct dish routes variable name and add category routes ([51be674](https://github.com/DiluDevX/deliveroo-clone-api/commit/51be674f9593739fad760899a76dcf0354762359))
- enhance category model with restaurant and dishes references, update service and controller for category creation ([b7b745f](https://github.com/DiluDevX/deliveroo-clone-api/commit/b7b745f4131e0d7f30177ace70cd11d22a32641d))
- enhance category retrieval to support population of dishes based on query parameter ([a249b51](https://github.com/DiluDevX/deliveroo-clone-api/commit/a249b51afcbbb1704e58d3160f960e9ee319d635))
- enhance controllers and services with improved error handling and type safety ([3101f5f](https://github.com/DiluDevX/deliveroo-clone-api/commit/3101f5fcb80f840b30255b0163d94771a89853e3))
- enhance dish and category services to support population of related dishes and restaurants ([b4d7c10](https://github.com/DiluDevX/deliveroo-clone-api/commit/b4d7c10a31830d87e77940f048deb1ce715a4efa))
- enhance dish service with conditional population and add user authorization middleware ([9f43d44](https://github.com/DiluDevX/deliveroo-clone-api/commit/9f43d445efc4089c24706c47acd4c19876c65a09))
- enhance getARestaurant route with orgID decoding and update validation schema ([4483009](https://github.com/DiluDevX/deliveroo-clone-api/commit/44830094e0500c36071b47729e4432f8b91a39fe))
- extend query parameter schemas for category and dish to accept numeric values for restaurant field ([32c8476](https://github.com/DiluDevX/deliveroo-clone-api/commit/32c847616d3b429ee2c41455072a34060a680557))
- Implement authentication service with axios for signup, login, and password management ([71bf8d4](https://github.com/DiluDevX/deliveroo-clone-api/commit/71bf8d4346aca8f1d55ada22ae1725e05d3d3ce5))
- implement category and dish services, add CRUD operations, and update restaurant model to include dishes and categories ([b70d237](https://github.com/DiluDevX/deliveroo-clone-api/commit/b70d2370aaefb6db893fd528de4b166a98545f16))
- Implement checkEmail endpoint and service integration ([404f76f](https://github.com/DiluDevX/deliveroo-clone-api/commit/404f76f18ebcf7496ea02ac7b858a1387e002b7d))
- implement create payment intent endpoint and update proxy service for restaurant service ([625b6f9](https://github.com/DiluDevX/deliveroo-clone-api/commit/625b6f9084e6813528cc32373eb8da79d8d55393))
- implement forgot password functionality and remove deprecated mail service ([ea047a1](https://github.com/DiluDevX/deliveroo-clone-api/commit/ea047a1108a0d72742826635cd5aea905660ea6b))
- implement forgot password functionality with email service integration ([f8d2137](https://github.com/DiluDevX/deliveroo-clone-api/commit/f8d21371115e9d08d660e91520e0d3478f15b5d4))
- implement password reset functionality with token validation and email service integration ([06eb75b](https://github.com/DiluDevX/deliveroo-clone-api/commit/06eb75b76b6fc3192cfdfc3da43c486db0666f03))
- implement role-based access control for user and admin routes, enhancing security and authorization ([ae5d689](https://github.com/DiluDevX/deliveroo-clone-api/commit/ae5d689f131cdaf426395dee8bf0b1f860df8076))
- implement TypeScript models and routes for restaurants, dishes, and categories ([d2d1434](https://github.com/DiluDevX/deliveroo-clone-api/commit/d2d1434249505d9f87a778a4cdb44969ad6ea917))
- implement user model, routes, and controller for user management ([3b2dc25](https://github.com/DiluDevX/deliveroo-clone-api/commit/3b2dc2594d8bf6b727bca3241e3ee201ce767010))
- implement validation middleware and schemas for request handling ([91b3242](https://github.com/DiluDevX/deliveroo-clone-api/commit/91b32427661248d0c07dbdbb23f9e9f23129584f))
- improve user authentication error handling and response messages ([3b423ba](https://github.com/DiluDevX/deliveroo-clone-api/commit/3b423ba65eb2ae892e8adbe01369575f840bc5f0))
- refactor authentication routes and implement password hashing with bcrypt ([9e60506](https://github.com/DiluDevX/deliveroo-clone-api/commit/9e605063c9a705f8efaee3350cd415866dbed9d4))
- refactor category and dish routes, update models to support multiple categories and restaurants ([9bf14d3](https://github.com/DiluDevX/deliveroo-clone-api/commit/9bf14d32805a8f96d29c10d8a31c130a2706502d))
- refactor dish creation logic for improved category validation and streamline cart item addition ([9d18278](https://github.com/DiluDevX/deliveroo-clone-api/commit/9d18278a71476277d9f8e0ad2de19144251345b6))
- refactor DTOs and controllers for improved type safety and clarity ([91d4e37](https://github.com/DiluDevX/deliveroo-clone-api/commit/91d4e3785a24cde70165ba237d4f8dd109e45fef))
- refactor password reset token model and update imports to use new naming convention ([91bb871](https://github.com/DiluDevX/deliveroo-clone-api/commit/91bb871c6e0b7d93f5c87fa22af2454046ae4a22))
- refactor restaurant service to use findOne method and update related controllers and DTOs ([954f946](https://github.com/DiluDevX/deliveroo-clone-api/commit/954f946b9459674d252e3c2f2d84f9d54c92fc25))
- refactor user authentication and creation logic to improve error handling and response structure ([1c8ce5c](https://github.com/DiluDevX/deliveroo-clone-api/commit/1c8ce5c661c949d19021f2c790dc4b14e5860a33))
- refactor user authentication logic and improve user model structure ([f3f0c7f](https://github.com/DiluDevX/deliveroo-clone-api/commit/f3f0c7fa9231c28e16b3111455edd3b57940aca6))
- refactor user model and related schemas, removing deprecated users model and updating request body schemas ([8508b70](https://github.com/DiluDevX/deliveroo-clone-api/commit/8508b705497df892fe4fc86dc6739feced7024d8))
- replace authorize-role middleware with optionalAuthorizeRole for improved flexibility in role validation ([7c2195a](https://github.com/DiluDevX/deliveroo-clone-api/commit/7c2195af990d78d8a1328b560f6345caab5a5f8b))
- restore README.md with comprehensive project documentation and setup instructions ([fb989d6](https://github.com/DiluDevX/deliveroo-clone-api/commit/fb989d620738ed3bf54ca3e09501f6bdf5f3118b))
- restructure API routes and services for microservices architecture ([4ec0dee](https://github.com/DiluDevX/deliveroo-clone-api/commit/4ec0deef8e788b49038c6e99aa53b7dfc1a7124c))
- set up initial server and routing structure with ESLint and Prettier configuration ([d892c7f](https://github.com/DiluDevX/deliveroo-clone-api/commit/d892c7fde16463a7a161ac2dd03b7068c92d5b25))
- Update API endpoints to include '/api' prefix for consistency ([b142aa2](https://github.com/DiluDevX/deliveroo-clone-api/commit/b142aa20bf0450e8bf926e863d3414d7db6f179d))
- update category and dish models, fix model names, and implement CRUD operations in routes ([572be6d](https://github.com/DiluDevX/deliveroo-clone-api/commit/572be6d67ba630d5b20b68651eb49dbcc1f7c441))
- update category and dish schemas to allow numeric values for restaurant and category fields ([04fe12e](https://github.com/DiluDevX/deliveroo-clone-api/commit/04fe12e8107645239d27c90e76d3ff3ef01f3d66))
- update category and dish services to accept string IDs instead of numbers ([04db1ab](https://github.com/DiluDevX/deliveroo-clone-api/commit/04db1ab8127e936402567e73ab6d840bf7537294))
- update category creation to associate with restaurant and refactor related services and routes ([d8f93f0](https://github.com/DiluDevX/deliveroo-clone-api/commit/d8f93f06ba1163ee5411f02142565eb3b07bc64a))
- update environment configuration and add deployment workflows for AWS and Azure ([1256ef8](https://github.com/DiluDevX/deliveroo-clone-api/commit/1256ef8d72f1b9347cd8e27b3e1f9a3b235a9730))
- update mongodb dependency to version 6.13.0 ([c9bb7db](https://github.com/DiluDevX/deliveroo-clone-api/commit/c9bb7dbf98700157fdc5770d4f56a5860ae13490))
- update orgId field in restaurant model to use UUID and ensure uniqueness ([d374639](https://github.com/DiluDevX/deliveroo-clone-api/commit/d37463922db35b330407b213aab9aa978d68991d))
- update password reset token expiration to 1 hour and enhance email template styling ([141e820](https://github.com/DiluDevX/deliveroo-clone-api/commit/141e8206e2075692318fc3ea2529548f2f3a84a2))
- Update resetPassword to include email and token; add email validation to resetPasswordRequestBodySchema; remove unused email services ([0ff72e9](https://github.com/DiluDevX/deliveroo-clone-api/commit/0ff72e9ee953678908925aeaffacdc0076510183))
- update restaurant routes and schema to use orgID for path parameters and validation ([ba9cf7f](https://github.com/DiluDevX/deliveroo-clone-api/commit/ba9cf7f0ec2ec4e97e45dd6848f1268872f82114))
- update route structure and add category routes with CRUD operations ([ec04af4](https://github.com/DiluDevX/deliveroo-clone-api/commit/ec04af496bd6cff98aa83483c0ca53d60503efdb))
- update user controller and service to return user data and generate JWT token ([20a3bd7](https://github.com/DiluDevX/deliveroo-clone-api/commit/20a3bd7ea2019c919ae6e0865f53ad7739fb3c59))

### Bug Fixes

- configure nvm for husky hooks ([c256d7f](https://github.com/DiluDevX/deliveroo-clone-api/commit/c256d7f9471cdda03f9b887cbf2bf66e07573516))
- update pre-commit script to use npm commands and add peer dependencies in package-lock.json ([5852aa7](https://github.com/DiluDevX/deliveroo-clone-api/commit/5852aa7f3cbfb000597c34619701682e882e7207))
- Update server port from 3000 to 4000 for consistency with environment settings ([d156820](https://github.com/DiluDevX/deliveroo-clone-api/commit/d15682011bcc59cd6e46d3f31eae8d10d4852ff6))
