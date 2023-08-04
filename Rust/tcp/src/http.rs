
#[derive(Debug, Serialize, Deserialize, Clone, Default, PartialEQ)]
#[repr(u16)]

pub enum HttpMethod {
    #[default]
    GET,
    POST,
    PUT,
    DELETE,
    HEAD,
    OPTIONS,
    CONNECT,
    TRACE,
    PATH,
    OTHER(String),
}

pub enum HttpStatusCode {
    #[default]
    Success = 200,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    Conflict = 409,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
}

#[derive(Debug, Clone)]
pub enum HttpError {
    BadRequest(Response, HttpStatusCode, &'static str),
    Unauthorized(Response, HttpStatusCode, &'static str),
    Forbidden(Response, HttpStatusCode, &'static str),
    NotFound(Response, HttpStatusCode, &'static str),
    MethodNotAllowed(Response, HttpStatusCode, &'static str),
    NotAcceptable(Response, HttpStatusCode, &'static str),
    Conflict(Response, HttpStatusCode, &'static str),
    InternalServerError(Response, HttpStatusCode, &'static str),
    NotImplemented(Response, HttpStatusCode, &'static str),
    BadGateway(Response, HttpStatusCode, &'static str),
    ServiceUnavailable(Response, HttpStatusCode, &'static str),
}