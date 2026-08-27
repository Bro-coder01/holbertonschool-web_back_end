#!/usr/bin/env python3
"""Module that creates a tuple from a string and the square of a number."""
from typing import Tuple, Union


def to_kv(k: str, v: Union[int, float]) -> tuple:
    """Return a tuple with string k and the square of v as a float."""
    return (k, float(v ** 2))