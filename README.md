# Middleware 

Middleware is a function that sits **between the request and the response** in an Express application. It can **process requests, modify responses, handle errors, or perform any operation** before the request reaches the route handler or after the response is sent.

---

## 🔹 What Middleware Does

- Middleware can be used to:

- Log requests
- Parse JSON or form data
- Authenticate users
- Handle errors globally
- Modify request or response objects
- Validate request data

- Example of a simple middleware:

```js
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // pass control to the next middleware or route handler
};

app.use(logger);
```


## 🔹 Pre Middleware vs Post Middleware
- Middleware can be categorized based on when it runs in the request-response cycle:


## 1️⃣ Pre Middleware (Before Route Handler)
- Runs before the route handler.
- Common uses:
- Logging requests
- Validating request data
- Authenticating users
- 
- Example:

```js
const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next(); // move to next middleware or route
};

app.use(authMiddleware);
```

## 2️⃣ Post Middleware (After Route Handler)
-Runs after the route handler or when an error occurs.
- Often called error-handling middleware.

- Common uses:
- Global error handling
- Sending standardized error responses
- Must have 4 parameters: (err, req, res, next)
- Example of global error middleware:
  
```js
const globalErrorHandler = (err, req, res, next) => {
  console.error(err); // log the error

  if (err.name === "NotFoundError") {
    return res.status(404).json({ message: err.message });
  }
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({ message: "Internal Server Error" });
};

app.use(globalErrorHandler); // must be after all routes
```


## 🔹 How Global Error Handling Works
- Route handlers throw an error or pass it using next(error).
- Express skips other middleware and passes the error to the global error middleware.
- Global error middleware checks the error type and sends a standardized response.

Example usage in a route:
```js
app.get("/places/:id", async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      const error = new Error("Place not found");
      error.name = "NotFoundError";
      throw error;
    }
    res.json(place);
  } catch (error) {
    next(error); // send error to global error handler
  }
});
```


## 🔹 Key Points
- Middleware is like a pipeline: every request passes through it.
- Pre-middleware handles tasks before the route logic.
- Post-middleware (error-handling middleware) handles tasks after the route logic, especially errors.
- Using global error handling makes your API clean, consistent, and easier to maintain.


## ⚡ Summary Diagram
```js
Client Request
      |
      v
[ Pre Middleware ]
      |
      v
[ Route Handler ]
      |
      v
[ Post Middleware / Error Handler ]
      |
      v
Client Response
```


## 📌 Benefits of Using Middleware
- Centralized request processing
- Easy error handling
- Cleaner route handlers
- Reusable logic across routes
