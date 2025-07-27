from flask import jsonify
from mongoengine.errors import NotUniqueError, ValidationError, DoesNotExist

def register_error_handlers(app):

    @app.errorhandler(NotUniqueError)
    def handle_duplicate_error(e):
        return jsonify({
            "success": False,
            "error": "Duplicate field value entered",
            "message": str(e)
        }), 409

    @app.errorhandler(ValidationError)
    def handle_validation_error(e):
        return jsonify({
            "success": False,
            "error": "Validation Error",
            "message": str(e)
        }), 400

    @app.errorhandler(DoesNotExist)
    def handle_not_found_error(e):
        return jsonify({
            "success": False,
            "error": "Resource not found",
            "message": str(e)
        }), 404

    @app.errorhandler(Exception)
    def handle_generic_error(e):
        return jsonify({
            "success": False,
            "error": "Server Error",
            "message": str(e)
        }), 500
