#!/usr/bin/env python3
"""
 function that lists all documents in a collection MongoDB.
"""
def list_all(mongo_collection):
    """
        function that lists all documents in a collection MongoDB.
    """
    if mongo_collection is None:
        return []
    return [ doc for doc in mongo_collection.find()]
