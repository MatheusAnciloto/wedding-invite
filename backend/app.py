from flask import Flask
from flask_cors import CORS
from database import db
from routes.invite import invite
from routes.guest import guest

def create_app():
    app = Flask(__name__)

    CORS(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///project.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    app.register_blueprint(invite, url_prefix='/api')
    app.register_blueprint(guest, url_prefix='/api')

    with app.app_context():
        db.create_all()

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(port=5000, debug=True)
