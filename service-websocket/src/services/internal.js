const axios = require('axios')

const SERVICE_USERS_URL = 'http://localhost:4001'

const SERVICE_NOTIFICATION_URL = 'http://localhost:4001'

const get_user_by_id = (req, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let headers = {
                'Authorization': req.headers.authorization
            }
            const response = await axios.put(SERVICE_NOTIFICATION_URL + `/api/user/${id}`, { headers });
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
};

const update_read_state = (req, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let headers = {
                'Authorization': req.headers.authorization
            }
            const response = await axios.get(SERVICE_USERS_URL + `/api/user/${id}`, { headers });
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    SERVICE_USERS_URL,
    get_user_by_id,
    update_read_state
}