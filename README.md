<h1 align="center"> WINSTON LOGGING </h1>
<h4 align="center"> Local and cloud based demonstration </h4>

This is a project that demonstrate the using of HTTP and behavior logger for a NodeJS REST API using ExpressJS, Morgan and Winston.
In order to use this, you should consider:

-   Create an account in [Logtail](https://betterstack.com/logs) and configure it in order to obtain the Logtail Token. Then, configure project's environment variables and constants.
-   The API only saves in production 3 days accumulated logs and HTTP requests, and all errors.
-   All generated logs are automatically uploaded to the Logtail Cloud-based system.
