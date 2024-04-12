
General way:
pipes [Data_Transform_Validation]--> Guards [Authn_Authz] --> Interceptor [Logger_modify_request]--> Middleware --> Controller --> Interceptor [Modify_Response]
