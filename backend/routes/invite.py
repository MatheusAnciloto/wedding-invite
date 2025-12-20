from flask import Blueprint, request, jsonify
from pydantic import ValidationError
from database import db
from models import Invite, Guest
from schemas import InviteCreate, InviteUpdate, InviteResponse, GuestResponse

invite = Blueprint('invite', __name__)

@invite.route('/invites', methods=['POST'])
def create_invite():
    try:
        json_data = request.get_json()
        invite_data = InviteCreate(**json_data)
        
        new_invite = Invite(
            family_name=invite_data.family_name,
            guests=invite_data.guests,
            children=invite_data.children
        )
        
        db.session.add(new_invite)
        db.session.commit()
        
        return jsonify({
            "message": "Invite created successfully",
            "id": new_invite.id
        }), 201

    except ValidationError as e:
        return jsonify({"errors": e.errors()}), 400
    except Exception as e:
        return jsonify({"error": "Internal Server Error"}), 500

@invite.route('/invites/<invite_id>', methods=['PUT'])
def update_invite(invite_id):
    invite = Invite.query.get(invite_id)
    if not invite:
        return jsonify({"error": "Invite not found"}), 404

    try:
        json_data = request.get_json()
        update_data = InviteUpdate(**json_data)

        data_to_update = update_data.model_dump(exclude_unset=True)
        
        for key, value in data_to_update.items():
            setattr(invite, key, value)

        db.session.commit()

        return jsonify({
            "message": "Invite updated successfully",
            "id": invite.id
        }), 200

    except ValidationError as e:
        return jsonify({"errors": e.errors()}), 400

@invite.route('/invites/<invite_id>', methods=['GET'])
def get_invite(invite_id):
    try:
        invite = Invite.query.get(invite_id)

        if not invite:
            return jsonify({"error": "Invite not found"}), 404

        response_data = InviteResponse.model_validate(invite).model_dump()

        guests = Guest.query.where(Guest.invite_id == invite_id).all()

        guests_list = [GuestResponse.model_validate(guest).model_dump(mode='json') for guest in guests]
        print(guests_list)

        return jsonify({
            **response_data,
            "confirmed_guests": guests_list 
        }), 200
    except ValidationError as e:
        return jsonify({"errors": e.errors()}), 400
    except Exception as e:
        return jsonify({"message": "Internal Server Error", "error": f"{e}"}), 500




