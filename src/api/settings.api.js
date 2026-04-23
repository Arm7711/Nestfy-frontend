import Api from './Api';
import { TAB_ENDPOINTS, SPECIAL_ENDPOINTS } from '../pages/AccountSettings/AccountSettingsSection/constants';

class SettingsApi {
    static async getSettings(tabName) {
        const endpoint = TAB_ENDPOINTS[tabName];
        if (!endpoint) throw new Error('Invalid tab');

        const { data } = await Api.instance.get(endpoint);
        return data?.data ?? data;
    }

    static async updateSetting(metaKey, tabName, payload) {
        const special = SPECIAL_ENDPOINTS[metaKey];
        const endpoint = special?.url ?? TAB_ENDPOINTS[tabName];
        const method = special?.method ?? 'put';

        if (!endpoint) throw new Error('Invalid endpoint');

        const { data } = await Api.instance[method](endpoint, payload);
        return data;
    }
}

export default SettingsApi;