#!/usr/bin/env python3
"""Generate random floating-point values asynchronously."""

import asyncio
import random
from typing import AsyncGenerator


async def async_generator() -> AsyncGenerator[float, None]:
    """Yield ten random values after one-second asynchronous delays."""
    for _ in range(10):
        await asyncio.sleep(1)
        yield random.uniform(0, 10)
