 const getinfromation = async (req, res) => {
    try {
        const response = await fetch('https://api.api-ninjas.com/v1/animals', {
            method: 'GET'
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export { getinfromation as getInformation };