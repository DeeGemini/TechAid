from pymongo import MongoClient


client = MongoClient()
db = client["tech_aid"]
schools_collection = db["schools"]
donors_collection = db["donors"]
admins_collection = db["admins"]
users_index = db["users"]
