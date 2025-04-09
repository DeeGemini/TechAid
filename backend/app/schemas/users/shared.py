from pydantic import BaseModel, EmailStr


class EmailLoginRequestBody(BaseModel):
    email: EmailStr
