from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv

from database import db
from routes.invite import invite
from routes.guest import guest

def create_app():
    app = Flask(__name__)
    CORS(app)

    env = os.getenv('FLASK_ENV', 'development')


    if env == 'production':
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('POSTGRES_URL')
    else:
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///project.db'

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    app.register_blueprint(invite)
    app.register_blueprint(guest)

    with app.app_context():
        db.create_all()

    return app

app = create_app()

if __name__ == '__main__':
    app.run(port=5000, debug=(os.getenv('FLASK_ENV') != 'production'))
