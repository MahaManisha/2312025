# Notification System Design

# Stage 1

## Overview

The Campus Notification Platform enables students to receive real-time notifications related to placements, events, examinations, results, fee reminders, and general announcements. The system exposes REST APIs for creating, retrieving, updating, deleting, and managing notifications. It also supports real-time notification delivery.

# Notification System Design

# Stage 1 – REST API Design

## Overview

The Notification System allows authenticated users to receive and manage notifications related to placements, examination results, campus events, and other important announcements. The APIs are designed using REST principles to ensure simplicity, consistency, and easy integration with the frontend application.

---

## Common Request Headers

Every API request requires the following headers:

```http
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

## API 1 – Get All Notifications

### Endpoint

```http
GET /notifications
```

### Purpose

Retrieves the complete list of notifications available for the authenticated user.

### Sample Response

```json
{
  "notifications": [
    {
      "id": 1,
      "type": "Event",
      "title": "National Level Hackathon",
      "message": "Registration is open until July 8.",
      "isRead": false
    }
  ]
}
```

---

## API 2 – Get Notification Details

### Endpoint

```http
GET /notifications/{id}
```

### Purpose

Retrieves the complete information of a specific notification using its unique identifier.

### Sample Response

```json
{
  "id": 1,
  "type": "Event",
  "title": "National Level Hackathon",
  "message": "Registration is open until July 8.",
  "isRead": false,
  "createdAt": "2026-07-02T10:00:00Z"
}
```

---

## API 3 – Mark Notification as Read

### Endpoint

```http
PUT /notifications/{id}/read
```

### Purpose

Marks the selected notification as read, allowing users to distinguish between viewed and unread notifications.

### Sample Response

```json
{
  "message": "Notification marked as read successfully."
}
```

---

## API 4 – Filter Notifications

### Endpoint

```http
GET /notifications?type=Placement
```

### Purpose

Returns notifications filtered by category. Supported categories include **Placement**, **Result**, **Event**, and other notification types.

### Sample Response

```json
{
  "notifications": [
    {
      "id": 5,
      "type": "Placement",
      "title": "Campus Recruitment Drive",
      "message": "ABC Technologies recruitment drive starts tomorrow.",
      "isRead": true
    }
  ]
}
```

---

## Real-Time Notification Mechanism

To provide users with instant updates, the notification system uses **WebSocket** communication.

Whenever a new notification is generated, the server immediately pushes it to all connected users without requiring them to refresh the application. This ensures timely delivery of important placement updates, examination results, campus events, and other announcements while reducing unnecessary API polling.

# Stage 2 - Database Schema Design

Introduction

↓

Notifications Table

↓

Column Description

↓

Reason for Choosing the Schema

# Stage 3 – SQL Query Optimization

## Overview

As the notification system grows, the number of stored notifications increases significantly. Efficient database queries are essential to ensure that users receive notifications quickly without experiencing delays. Query optimization and proper indexing help reduce execution time and improve overall database performance.

---

## Optimized SQL Query

The following query retrieves the latest **10 Placement** notifications by sorting them based on the creation date.

```sql
SELECT notification_id, title, type, created_at
FROM notifications
WHERE type = 'Placement'
ORDER BY created_at DESC
LIMIT 10;
```

---

## Indexing Strategy

To improve query performance, indexes can be created on the columns that are frequently used for filtering and sorting.

```sql
CREATE INDEX idx_type ON notifications(type);

CREATE INDEX idx_created_at ON notifications(created_at);
```

---

## Benefits of Indexing

Using indexes provides several advantages:

- Improves the speed of filtering notifications based on their type.
- Reduces the time required to retrieve recently created notifications.
- Minimizes the amount of data scanned during query execution.
- Enhances the overall performance of the notification system as the dataset grows.

---

## Query Performance Considerations

While indexes improve read performance, creating indexes on every column is not recommended because:

- Additional storage space is required for maintaining indexes.
- Insert, update, and delete operations become slower since indexes must also be updated.
- Only frequently searched or sorted columns should be indexed.

---

## Conclusion

An optimized SQL query combined with appropriate indexing ensures that notification data is retrieved efficiently, even when the database contains a large number of records. This approach improves response time, enhances user experience, and allows the notification system to scale effectively as more notifications are generated.

# Stage 4 – Performance Improvements

## Overview

As the number of notifications increases, the system should be optimized to provide faster responses and a better user experience.

---

## Performance Improvement Techniques

### 1. Pagination

Load notifications in smaller batches instead of retrieving all records at once. This reduces response time and improves performance.

### 2. Caching

Store frequently accessed notifications in cache to reduce repeated database queries and improve response speed.

### 3. Database Indexing

Create indexes on commonly used columns such as `type` and `created_at` to retrieve notifications more efficiently.

### 4. Lazy Loading

Load additional notifications only when the user scrolls or requests more data, reducing the initial page load time.

### 5. Asynchronous Processing

Handle notification delivery in the background so that users receive faster responses without waiting for the process to complete.

---

## Conclusion

Using pagination, caching, indexing, lazy loading, and asynchronous processing improves application performance, reduces server load, and ensures the notification system remains efficient as the number of users and notifications grows.

# Stage 5 – Reliable Notification Delivery

## Overview

A reliable notification system should ensure that notifications are delivered successfully while handling failures efficiently.

---

## Improvements

### 1. Message Queue

Use a message queue to process notifications asynchronously and reduce server load.

### 2. Retry Mechanism

Automatically retry sending notifications if a temporary failure occurs.

### 3. Database Transactions

Use transactions to maintain data consistency and roll back changes if an error occurs.

### 4. Logging

Record successful and failed notification events using the logging middleware for monitoring and debugging.

### 5. Error Handling

Implement proper exception handling so that a failed notification does not affect the delivery of others.

---

## Conclusion

Using message queues, retry mechanisms, transactions, logging, and proper error handling improves the reliability, scalability, and stability of the notification system.