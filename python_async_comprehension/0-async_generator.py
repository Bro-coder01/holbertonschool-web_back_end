#!/usr/bin/env python3
"""Module containing an asynchronous random number generator."""

import asyncio
import random
from typing import Generator


async def async_generator() -> Generator[float, None, None]:
    """Yield ten random float values after one-second delays."""
    for _ in range(10):
        await asyncio.sleep(1)
        yield random.uniform(0, 10)
