const parseLatLong = (pointStr) => {
    try {
        if (!pointStr || !pointStr.startsWith("POINT")) return null;
        const [lng, lat] = pointStr.match(/-?\d+\.\d+/g).map(Number);
        return { lat, lng };
    } catch (e) {
        console.warn("Failed to parse lat/long:", pointStr);
        return null;
    }
};

export default parseLatLong;