const API_BASE = 'settings';

export const TAB_ENDPOINTS = {
    personalInfo: `${API_BASE}/profile`,
    loginAndSecurity: `${API_BASE}/security`,
    privacy: `${API_BASE}/privacy`,
    notifications: `${API_BASE}/notifications`,
    payments: `${API_BASE}/payment`,
};

export const SPECIAL_ENDPOINTS = {
    twoFactorEnabled: { method: 'post', url: `${API_BASE}/security/2fa` },
};