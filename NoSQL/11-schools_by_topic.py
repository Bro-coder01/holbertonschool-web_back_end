#!/usr/bin/env python3
"""
Module that provides a function to update topics of a school document.
"""

def schools_by_topic(mongo_collection, topic):
    """
    Changes all topics of a school document based on the school name.
    """
    return list(mongo_collection.find({"topic" : topic}))
