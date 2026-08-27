#!/usr/bin/env python3
"""Module that contains a function that returns a multiplier function."""
from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """Return a function that multiplies a given float by multiplier."""
    def multiply(n: float) -> float:
        """Multiply a given float by the multiplier."""
        return n * multiplier

    return multiply
