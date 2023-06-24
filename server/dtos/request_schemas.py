from pydantic import BaseModel

class RequestBodyParams(BaseModel):
    user_query: str
    meta: dict
    image_blob: bytes
