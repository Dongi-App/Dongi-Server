# Dongi-Server
Dongi Server - The backend server for the Dongi application, responsible for handling user authentication, expense management, and data synchronization. Built with Node.js, this repository contains the API endpoints and database logic to support the Dongi Android application.

# API Document

#### مجموعه "user"

##### 1. **ثبت‌نام (Signup)**
- **URL:** `{{url}}/api/user/signup`
- **Method:** POST
- **Headers:** None
- **Body:**
```json
{
    "first_name": "test",
    "last_name": "test",
    "email": "test@gmail.com",
    "password": "123456"
}
```
- **توضیحات:** این اندپوینت برای ثبت‌نام کاربران جدید استفاده می‌شود.

##### 2. **ورود (Login)**
- **URL:** `{{url}}/api/user/login`
- **Method:** POST
- **Headers:**
  - token: (optional)
- **Body:**
```json
{
    "email": "test@gmail.com",
    "password": "123456"
}
```
- **توضیحات:** این اندپوینت برای ورود کاربران به سیستم استفاده می‌شود.

##### 3. **خروج (Logout)**
- **URL:** `{{url}}/api/user/logout`
- **Method:** DELETE
- **Headers:**
  - token: "JWT Token"
- **Body:** None
- **توضیحات:** این اندپوینت برای خروج کاربران از سیستم و حذف توکن احراز هویت استفاده می‌شود.

##### 4. **به‌روزرسانی اطلاعات کاربر (Update)**
- **URL:** `{{url}}/api/user/update`
- **Method:** POST
- **Headers:**
  - token: "JWT Token"
- **Body:**
```json
{
    "first_name": "ali"
}
```
- **توضیحات:** این اندپوینت برای به‌روزرسانی اطلاعات کاربر استفاده می‌شود.

##### 5. **دریافت اطلاعات کاربر (Data)**
- **URL:** `{{url}}/api/user/data`
- **Method:** GET
- **Headers:**
  - token: "JWT Token"
- **Body:** None
- **توضیحات:** این اندپوینت برای دریافت اطلاعات کاربر استفاده می‌شود.

---

#### مجموعه "invitation"

##### 1. **ارسال دعوتنامه (Send Invitation)**
- **URL:** `{{url}}/api/invitation/send`
- **Method:** POST
- **Headers:**
  - token: "JWT Token"
- **Body:**
```json
{
    "user_email": "t@gmail.com",
    "group_id": "667ac470dd901a0c1e9a1ad5"
}
```
- **توضیحات:** این اندپوینت برای ارسال دعوتنامه به کاربران برای پیوستن به گروه استفاده می‌شود.

##### 2. **پاسخ به دعوتنامه (Respond to Invitation)**
- **URL:** `{{url}}/api/invitation/respond`
- **Method:** POST
- **Headers:**
  - token: "JWT Token"
- **Body:**
```json
{
    "invitation_id": "667ac5c17a0a2277e37a2d64",
    "admit": true
}
```
- **توضیحات:** این اندپوینت برای پاسخ به دعوتنامه (قبول یا رد) استفاده می‌شود.

##### 3. **دریافت اطلاعات دعوتنامه (Invitation Data)**
- **URL:** `{{url}}/api/invitation/data`
- **Method:** GET
- **Headers:**
  - token: "JWT Token"
- **Body:** None
- **Query Parameters:**
  - invitation_id: "667d7768e48a0358bcbc594f"
- **توضیحات:** این اندپوینت برای دریافت اطلاعات دعوتنامه استفاده می‌شود.

##### 4. **لیست دعوتنامه‌ها (Invitation List)**
- **URL:** `{{url}}/api/invitation/list`
- **Method:** GET
- **Headers:**
  - token: "JWT Token"
- **Body:** None
- **Query Parameters:**
  - incoming: false
- **توضیحات:** این اندپوینت برای دریافت لیست دعوتنامه‌ها استفاده می‌شود.

---

#### مجموعه "group"

##### 1. **افزودن گروه (Add Group)**
- **URL:** `{{url}}/api/group/add`
- **Method:** POST
- **Headers:**
  - token: "JWT Token"
- **Body:**
```json
{
    "name": "test"
}
```
- **توضیحات:** این اندپوینت برای ایجاد گروه جدید استفاده می‌شود.

##### 2. **حذف گروه (Remove Group)**
- **URL:** `{{url}}/api/group/remove`
- **Method:** POST
- **Headers:**
  - token: "JWT Token"
- **Body:**
```json
{
    "id": "667ac2ba661e76bd80cbb467"
}
```
- **توضیحات:** این اندپوینت برای حذف گروه استفاده می‌شود.

##### 3. **ترک گروه (Leave Group)**
- **URL:** `{{url}}/api/group/leave`
- **Method:** POST
- **Headers:**
  - token: "JWT Token"
- **Body:**
```json
{
    "id": "667a6ad5bb07c9dc8201425f"
}
```
- **توضیحات:** این اندپوینت برای ترک گروه توسط کاربر استفاده می‌شود.

##### 4. **به‌روزرسانی گروه (Update Group)**
- **URL:** `{{url}}/api/group/update`
- **Method:** POST
- **Headers:**
  - token: "JWT Token"
- **Body:**
```json
{
    "name": "test3",
    "id": "667a6edfee3efd6b6ee4afc8"
}
```
- **توضیحات:** این اندپوینت برای به‌روزرسانی اطلاعات گروه استفاده می‌شود.

##### 5. **دریافت اطلاعات گروه (Group Data)**
- **URL:** `{{url}}/api/group/data`
- **Method:** GET
- **Headers:**
  - token: "JWT Token"
- **Body:** None
- **Query Parameters:**
  - id: "667ac470dd901a0c1e9a1ad5"
- **توضیحات:** این اندپوینت برای دریافت اطلاعات گروه استفاده می‌شود.

##### 6. **لیست گروه‌ها (Group List)**
- **URL:** `{{url}}/api/group/list`
- **Method:** GET
- **Headers:**
  - token: "JWT Token"
- **Body:** None
- **توضیحات:** این اندپوینت برای دریافت لیست گروه‌هایی که کاربر عضو آن‌هاست استفاده می‌شود.

---

#### مجموعه "expense"

##### 1. **افزودن هزینه (Add Expense)**
- **URL:** `{{url}}/api/expense/add`
- **Method:** POST
- **Headers:**
  - token: "JWT Token"
- **Body:**
```json
{
    "group": "667ac470dd901a0c1e9a1ad5",
    "payer": "x@gmail.com",
    "description": "fdfrf",
    "amount": "11.11",
    "date": "2024-06-25",
    "shares": [
        {
            "user": "y@gmail.com",
            "share": "1"
        }
    ]
}
```
- **توضیحات:** این اندپوینت برای افزودن هزینه به گروه استفاده می‌شود.

##### 2. **حذف هزینه (Remove Expense)**
- **URL:** `{{url}}/api/expense/remove`
- **Method:** POST
- **Headers:**
  - token: "JWT Token"
- **Body:**
```json
{
    "expense_id": "667ad3f6e238de625902f821"
}
```
- **توضیحات:** این اندپوینت برای حذف هزینه از گروه استفاده می‌شود.

##### 3. **به‌روزرسانی هزینه (Update Expense)**
- **URL:** `{{url}}/api/expense/update`
- **Method:** POST
- **Headers:**
  - token: "JWT Token"
- **Body:**
```json
{
    "expense_id": "667ad38cee1c0b5997f7197b",
    "payer": "y@gmail.com",
    "description": "aaaaaa",
    "amount": "2222",
    "date": "2024-06-26",
    "shares": [
        {
            "user": "y@gmail.com",
            "share": "0"
        }
    ]
}
```
- **توضیحات:** این اندپوینت برای به‌روزرسانی اطلاعات هزینه استفاده می‌شود.

##### 4. **دریافت اطلاعات هزینه (Expense Data)**
- **URL:** `{{url}}/api/expense/data`
- **Method:** GET
- **Headers:**
  - token: "JWT Token"
- **Body:** None
- **Query Parameters:**
  - expense_id: "667acca9a420559209e3b7ca"
- **توضیحات:** این اندپوینت برای دریافت اطلاعات هزینه استفاده می‌شود.

##### 5. **لیست هزینه‌ها

 (Expense List)**
- **URL:** `{{url}}/api/expense/list`
- **Method:** GET
- **Headers:**
  - token: "JWT Token"
- **Body:** None
- **Query Parameters:**
  - group_id: "667ac470dd901a0c1e9a1ad5"
- **توضیحات:** این اندپوینت برای دریافت لیست هزینه‌های گروه استفاده می‌شود.
