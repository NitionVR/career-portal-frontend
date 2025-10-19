# S3 Bucket CORS Configuration for Image Uploads

## Problem Diagnosis

When the frontend attempts to upload a profile picture directly to the pre-signed URL provided by the backend, the browser blocks the request. The developer console shows the following error:

`Access to XMLHttpRequest at 'https://etalente-uploads.s3.amazonaws.com/...' from origin 'http://localhost:4200' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.`

### Analysis

This is a standard Cross-Origin Resource Sharing (CORS) security issue. The frontend code is behaving correctly, but the Amazon S3 bucket (`etalente-uploads`) is not configured to accept direct `PUT` requests originating from our web application's domain (`http://localhost:4200`).

The browser sends a preflight `OPTIONS` request to the S3 URL to ask for permission before sending the actual image data. Because the S3 bucket's CORS policy does not explicitly allow our frontend's origin, S3 does not return the required `Access-Control-Allow-Origin` header. The browser then correctly and safely blocks the request, resulting in a `net::ERR_FAILED` error.

## Backend/DevOps Requirement

This issue cannot be resolved on the frontend. The **CORS configuration of the `etalente-uploads` S3 bucket must be updated.**

Please apply the following XML configuration to the bucket's CORS settings. This will instruct S3 to trust `PUT` requests coming from our development environment.

### S3 Bucket CORS Configuration

```xml
<CORSConfiguration>
 <CORSRule>
   <AllowedOrigin>http://localhost:4200</AllowedOrigin>
   <AllowedMethod>PUT</AllowedMethod>
   <AllowedHeader>*</AllowedHeader>
   <MaxAgeSeconds>3000</MaxAgeSeconds>
   <ExposeHeader>ETag</Ex-poseHeader>
 </CORSRule>
 
 <!-- 
   IMPORTANT: A similar rule will be needed for the production frontend domain 
   once it is deployed.
 -->
 <!--
 <CORSRule>
   <AllowedOrigin>https://your-production-domain.com</AllowedOrigin>
   <AllowedMethod>PUT</AllowedMethod>
   <AllowedHeader>*</AllowedHeader>
   <MaxAgeSeconds>3000</MaxAgeSeconds>
   <ExposeHeader>ETag</ExposeHeader>
 </CORSRule>
 -->
</CORSConfiguration>
```

### Key Configuration Points:

*   **`<AllowedOrigin>`:** This is the most critical part. It explicitly whitelists our frontend's origin.
*   **`<AllowedMethod>`:** This permits the `PUT` HTTP method, which is used to upload the file content.
*   **`<AllowedHeader>*</AllowedHeader>`:** This is necessary because the pre-signed URL request includes several custom Amazon S3 headers.

Once this configuration is saved on the S3 bucket, the frontend upload feature should work immediately without any further code changes.
