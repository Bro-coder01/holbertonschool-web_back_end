#!/usr/bin/env python3
"""Measure the average execution time of concurrent random waits."""

import asyncio
import time

wait_n = __import__('1-concurrent_coroutines').wait_n


def measure_time(n: int, max_delay: int) -> float:
    """Return the average elapsed time for ``n`` concurrent waits."""
    start_time = time.time()
    asyncio.run(wait_n(n, max_delay))
    total_time = time.time() - start_time
    return total_time / n
