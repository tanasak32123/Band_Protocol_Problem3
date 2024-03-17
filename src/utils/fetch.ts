type Method = "GET" | "POST"

export const fetchJson = async <T>(url: string, method: Method, options?: RequestInit) => {
    const res = await fetchData(url, method, {
        headers: {
            "Content-Type": "application/json",
        },
        ...options
    });

    if (!res) return

    return res.json() as T
}

export const fetchData = (url: string, method: Method, options?: RequestInit) => {
    try {
        const res = fetch(url, { ...options, method })
        return res
    } catch (err: unknown) {
        console.error("Fetch Error!", err)
    }
} 