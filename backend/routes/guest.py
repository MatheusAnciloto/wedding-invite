from flask import Blueprint, request, jsonify
from database import db
from pydantic import ValidationError
from models import Guest
from schemas import GuestCreate

guest = Blueprint('guest', __name__)

@guest.route('/guest', methods=['POST'])
def confirm_guest():
    try:
        json_data = request.get_json()
        guest_data = GuestCreate(**json_data)
        
        new_guest = Guest(
            first_name=guest_data.first_name,
            last_name=guest_data.last_name,
            age_range=guest_data.age_range,
            invite_id=guest_data.invite_id
        )

        db.session.add(new_guest)
        db.session.commit()
        
        return jsonify({
            "message": "Guest confirmed successfully",
            "id": new_guest.id
        }), 201
    except ValidationError as e:
        return jsonify({"errors": e.errors()}), 400
    except Exception as e:
        return jsonify({"error": "Internal Server Error"}), 500
