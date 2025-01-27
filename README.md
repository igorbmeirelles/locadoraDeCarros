## Car Rental Application

### Car Registration
**Functional Requirements**
- It must be possible to register a new car.
- It must be possible to list all categories.

**Non-Functional Requirements**

**Business Rules**
- It should not be possible to register a car with an already existing license plate.
- It should not be possible to change the license plate of a car.
- The car must be available at the time of registration.
- The user responsible for the registration must be an administrator.

### Car Listing

**Functional Requirements**
- It must be possible to list all available cars.
- It must be possible to list all cars by category name, brand, or car name.

**Business Rules**
- The user does not need to be logged in to view the listing.

### Car Specification Registration

**Functional Requirements**
- It must be possible to register a specification for a car.

**Business Rules**
- It should not be possible to register a specification for a non-existent car.
- It should not be possible to register an existing specification for the same car.
- The user responsible for the registration must be an administrator.

### Car Image Registration

**Functional Requirements**
- It must be possible to register an image for a car.

**Non-Functional Requirements**
- Use Multer for file upload.

**Business Rules**
- The user can register more than one image for the same car.
- The user responsible for the registration must be an administrator.

### Car Rental

**Functional Requirements**
- It must be possible to register a car rental.

**Business Rules**
- The rental must have a minimum duration of 24 hours.
- It should not be possible to register a new rental if one is already open for the same user.
- It should not be possible to register a new rental if one is already open for the same car.
- The user must be logged into the application.
- When renting a car, its status should change to unavailable.

### Car Return

**Functional Requirements**
- It must be possible to return a car.

**Business Rules**
- If the car is returned within less than 24 hours, the full daily rate should be charged.
- When the car is returned, it should be made available for another rental.
- When the car is returned, the user should be made available for another rental.
- When the car is returned, the total rental amount should be calculated.
- If the return time exceeds the expected return time, a late fee should be charged based on the number of days overdue.
- If there is a late fee, it should be added to the total rental amount.

### Password Recovery

**Functional Requirements**
- It must be possible to recover a password by providing the email.
- The user should receive an email with the steps for password recovery.
- The user must be able to enter a new password.

**Business Rules**
- The user must enter a new password.
- The recovery link sent for the password reset should expire in 3 hours.
