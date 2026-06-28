const axios = require('axios');

const predictLoan = async (features) => {
    try {
        const response = await axios.post('http://localhost:8000/api/v1/predict', features);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to communicate with prediction service: ${error.message}`);
    }
};

module.exports = {
    predictLoan
};
