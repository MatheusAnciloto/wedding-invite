import secrets
import string
import enum
from database import db

def generate_id():
    """Generates a random 6-character string (alphanumeric)."""
    characters = string.ascii_letters + string.digits
    return ''.join(secrets.choice(characters) for _ in range(6))

class BuffetAgeGroups(enum.Enum):
    NON_PAYER = "0-4"
    HALF_PRICE = "5-8"
    FULL_PRICE = "Adulto"


class Invite(db.Model):
    __tablename__ = 'invites'

    id = db.Column(db.String(6), primary_key=True, default=generate_id)
    family_name = db.Column(db.String(80), nullable=False)
    guests = db.Column(db.SmallInteger, nullable=False, default=1)
    children = db.Column(db.Boolean, nullable=False, default=False)

    def __repr__(self):
        return f'<Invite {self.id} - {self.family_name}>'


class Guest(db.Model):
    __tablename__ = 'guests'

    id = db.Column(db.String(6), primary_key=True, default=generate_id)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    age_range = db.Column(db.Enum(BuffetAgeGroups), nullable=False, default=BuffetAgeGroups.FULL_PRICE)
